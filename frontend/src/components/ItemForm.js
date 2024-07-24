import { useState } from "react";
import { createItem, updateItem } from "../utils/api";

export default function ItemForm({ item, onSave }) {
  const [name, setName] = useState(item ? item.name : "");
  const [description, setDescription] = useState(item ? item.description : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, description };
    if (item) {
      await updateItem(item.id, data);
    } else {
      await createItem(data);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div>
        <label className="block text-sm font-bold">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-bold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
        Save
      </button>
    </form>
  );
}
