import { useEffect, useState } from "react";
import {
  fetchItems,
  fetchItemTypes,
  fetchTransactions,
  addItem as addNewItem,
  updateItem as updateExistingItem,
  deleteItem as deleteExistingItem,
} from "../utils/api";
import { format } from "date-fns";
import { motion } from "framer-motion";
import DataTable from "../components/DataTable";
import SortButton from "../components/SortButton";
import ItemTypeList from "../components/ItemTypeList";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState({ field: "name", order: "asc" });
  const [dateFilter, setDateFilter] = useState({
    startDate: null,
    endDate: null,
  });
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    stock: 0,
    type_id: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const [itemsRes, itemTypesRes, transactionsRes] = await Promise.all([
          fetchItems(),
          fetchItemTypes(),
          fetchTransactions(),
        ]);
        setItems(itemsRes.data);
        setItemTypes(itemTypesRes.data);
        setTransactions(transactionsRes.data);
        setFilteredTransactions(transactionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    filterTransactionsByDate();
  }, [dateFilter, transactions]);

  const filterTransactionsByDate = () => {
    if (dateFilter.startDate && dateFilter.endDate) {
      const filtered = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.transaction_date);
        return (
          transactionDate >= dateFilter.startDate &&
          transactionDate <= dateFilter.endDate
        );
      });
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (field) => {
    const order =
      sortBy.field === field && sortBy.order === "asc" ? "desc" : "asc";
    setSortBy({ field, order });
  };

  const compareItemTypes = (comparison) => {
    const itemTypeTransactions = {};
    transactions.forEach((transaction) => {
      const itemType = itemTypes.find(
        (itemType) => itemType.id === transaction.item_id
      );
      if (itemType) {
        if (!itemTypeTransactions[itemType.id]) {
          itemTypeTransactions[itemType.id] = {
            type: itemType.type,
            totalSold: 0,
          };
        }
        itemTypeTransactions[itemType.id].totalSold += transaction.sold_amount;
      }
    });
    const itemTypeArray = Object.values(itemTypeTransactions);
    itemTypeArray.sort((a, b) =>
      comparison === "most"
        ? b.totalSold - a.totalSold
        : a.totalSold - b.totalSold
    );
    return itemTypeArray;
  };

  const combinedData = items.map((item) => {
    const itemType = itemTypes.find((type) => type.id === item.type_id);
    const transaction = transactions.find(
      (transaction) => transaction.item_id === item.id
    );
    return {
      id: item.id,
      name: item.name,
      stock: item.stock,
      type: itemType ? itemType.type : "-",
      sold_amount: transaction ? transaction.sold_amount : 0,
      transaction_date: transaction
        ? format(new Date(transaction.transaction_date), "MM/dd/yyyy")
        : "-",
    };
  });

  const filteredData = combinedData.filter((item) => {
    const itemName = item.name.toLowerCase();
    const itemType = item.type.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    return itemName.includes(searchLower) || itemType.includes(searchLower);
  });

  const sortedData = filteredData.sort((a, b) => {
    const { field, order } = sortBy;
    const aValue = field === "name" ? a.name : a.transaction_date;
    const bValue = field === "name" ? b.name : b.transaction_date;
    return order === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Stock", accessor: "stock" },
    { Header: "Type", accessor: "type" },
    { Header: "Sold Amount", accessor: "sold_amount" },
    { Header: "Transaction Date", accessor: "transaction_date" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row.original.id)}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

 const handleSubmit = async (event) => {
   event.preventDefault();
   setLoading(true);

   try {
     let formDataWithDate = { ...formData };
     if (!editing) {
       // Jika sedang menambahkan item baru, tambahkan transaction_date dengan tanggal saat ini
       formDataWithDate.transaction_date = new Date()
         .toISOString()
         .split("T")[0];
     }

     if (editing) {
       await updateExistingItem(formData.id, formDataWithDate);
       setEditing(false); // Keluar dari mode edit
     } else {
       const response = await addNewItem(formDataWithDate);
       if (response.status === 201) {
         const updatedItems = await fetchItems();
         setItems(updatedItems.data);
         clearForm();
       } else {
         console.error("Gagal menambahkan item:", response.data);
       }
     }
   } catch (error) {
     console.error("Error:", error);
   } finally {
     setLoading(false);
   }
 };

  const handleEdit = (itemId) => {
    const itemToEdit = items.find((item) => item.id === itemId);
    setFormData({
      id: itemToEdit.id,
      name: itemToEdit.name,
      stock: itemToEdit.stock,
      type_id: itemToEdit.type_id,
    });
    setEditing(true);
  };

  const handleDelete = async (itemId) => {
    setLoading(true);
    try {
      await deleteExistingItem(itemId);
      const updatedItems = await fetchItems();
      setItems(updatedItems.data);
      setAlert("Item deleted successfully.");
    } catch (error) {
      console.error("Error:", error);
      setAlert("Failed to delete item.");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    clearForm();
    setEditing(false);
  };

  const clearForm = () => {
    setFormData({ id: null, name: "", stock: 0, type_id: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Search and Sort Controls */}
      <div className="flex items-center mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Sort buttons */}
        <SortButton
          field="name"
          label="Name"
          sortBy={sortBy}
          onClick={() => handleSort("name")}
        />
        <SortButton
          field="transaction_date"
          label="Date"
          sortBy={sortBy}
          onClick={() => handleSort("transaction_date")}
        />
      </div>

      {/* Date Filter */}
      <div className="flex items-center mb-4 space-x-4">
        <label className="mr-2">Filter by Date Range:</label>
        <input
          type="date"
          className="p-2 border border-gray-300 rounded"
          value={dateFilter.startDate}
          onChange={(e) =>
            setDateFilter({
              ...dateFilter,
              startDate: new Date(e.target.value),
            })
          }
        />
        <input
          type="date"
          className="p-2 border border-gray-300 rounded"
          value={dateFilter.endDate}
          onChange={(e) =>
            setDateFilter({ ...dateFilter, endDate: new Date(e.target.value) })
          }
        />
      </div>

      {/* DataTable */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">Combined Table</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={sortedData} />
        )}
      </motion.div>

      {/* Most and Least Sold */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Most Sold and Least Sold</h2>
        <div className="flex justify-between space-x-8">
          <ItemTypeList items={compareItemTypes("most")} title="Most Sold" />
          <ItemTypeList items={compareItemTypes("least")} title="Least Sold" />
        </div>
      </div>

      {/* Form for Create and Update */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">
          {editing ? "Edit Item" : "Add New Item"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border border-gray-300 rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            className="p-2 border border-gray-300 rounded"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: parseInt(e.target.value) })
            }
          />
          <select
            value={formData.type_id}
            onChange={(e) =>
              setFormData({ ...formData, type_id: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select Type</option>
            {itemTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type}
              </option>
            ))}
          </select>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Loading..." : editing ? "Update" : "Add"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded"
                disabled={loading}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Alert for delete */}
      {alert && (
        <div className="bg-green-200 p-3 rounded">
          <p>{alert}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
