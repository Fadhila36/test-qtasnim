import ItemList from "../../components/ItemList";
import ItemForm from "../../components/ItemForm";
import { useState } from "react";

export default function ItemsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSave = () => {
    setShowForm(false);
    setSelectedItem(null);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Items</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Add New Item
      </button>
      {showForm && <ItemForm item={selectedItem} onSave={handleSave} />}
      <ItemList />
    </div>
  );
}
