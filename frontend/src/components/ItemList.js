import { useState, useEffect } from "react";
import { fetchItems, deleteItem } from "../utils/api";
import DataTable from "./DataTable";
import Link from "next/link";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");

  useEffect(() => {
    const getItems = async () => {
      const response = await fetchItems();
      setItems(response.data);
    };
    getItems();
  }, []);

  const handleDelete = async (id) => {
    await deleteItem(id);
    setItems(items.filter((item) => item.id !== id));
  };

  const filteredItems = items
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div>
          <Link href={`/items/${row.original.id}`}>
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
          <option value="name">Name</option>
        </select>
      </div>
      <DataTable columns={columns} data={filteredItems} />
    </div>
  );
}
