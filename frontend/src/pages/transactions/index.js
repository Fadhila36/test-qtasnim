import TransactionList from "../../components/TransactionList";

export default function TransactionPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <TransactionList />
    </div>
  );
}
