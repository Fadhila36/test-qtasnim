import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchTransactionById } from "../../utils/api";
import TransactionForm from "../../components/TransactionForm";

export default function TransactionDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const getTransaction = async () => {
        const response = await fetchTransactionById(id);
        setTransaction(response.data);
        setLoading(false);
      };
      getTransaction();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Transaction Detail</h1>
      <TransactionForm
        transaction={transaction}
        onSave={() => router.push("/transactions")}
      />
    </div>
  );
}
