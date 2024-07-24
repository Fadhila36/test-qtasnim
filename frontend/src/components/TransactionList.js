import { useState, useEffect } from "react";
import { fetchTransactions, deleteTransaction } from "../utils/api";
import DataTable from "./DataTable";
import Link from "next/link";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const getTransactions = async () => {
      const response = await fetchTransactions();
      setTransactions(response.data);
    };
    getTransactions();
  }, []);

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const filteredTransactions = transactions
    .filter((transaction) =>
      transaction.item_name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((transaction) => {
      if (startDate && endDate) {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate >= new Date(startDate) &&
          transactionDate <= new Date(endDate)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === "date") {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Item Name", accessor: "item_name" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Date", accessor: "date" },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div>
          <Link href={`/transactions/${row.original.id}`}>
            <a className="text-blue-500 mr-2">Edit</a>
          </Link>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          onChange={(e) => setSort(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="date">Date</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <DataTable columns={columns} data={filteredTransactions} />
    </div>
  );
}
