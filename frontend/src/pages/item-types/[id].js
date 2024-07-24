import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchItemTypeById } from "../../utils/api";
import ItemTypeForm from "../../components/ItemTypeForm";

export default function ItemTypeDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [itemType, setItemType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const getItemType = async () => {
        const response = await fetchItemTypeById(id);
        setItemType(response.data);
        setLoading(false);
      };
      getItemType();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Item Type Detail</h1>
      <ItemTypeForm
        itemType={itemType}
        onSave={() => router.push("/item-types")}
      />
    </div>
  );
}
