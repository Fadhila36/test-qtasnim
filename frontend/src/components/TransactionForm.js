import { useState } from "react";
import { saveTransaction } from "../utils/api";

export default function TransactionForm({ transaction, onSave }) {
  const [itemId, setItemId] = useState(transaction ? transaction.item_id : "");
  const [quantity, setQuantity] = useState(
    transaction ? transaction.quantity : ""
  );
  const [date, setDate] = useState(transaction ? transaction.date : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveTransaction({
      id: transaction ? transaction.id : null,
      item_id: itemId,
      quantity,
      date,
    });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-bold">Item ID</label>
        <input
          type="text"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-bold">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-bold">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
        Save
      </button>
    </form>
  );
}
