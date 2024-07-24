import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchItemById } from "../../utils/api";
import ItemForm from "../../components/ItemForm";

export default function ItemDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const getItem = async () => {
        const response = await fetchItemById(id);
        setItem(response.data);
        setLoading(false);
      };
      getItem();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Item Detail</h1>
      <ItemForm item={item} onSave={() => router.push("/items")} />
    </div>
  );
}
