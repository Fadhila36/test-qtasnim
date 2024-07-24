import { motion } from "framer-motion";

const SortButton = ({ field, label, sortBy, onClick }) => (
  <motion.button
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }}
    className={`px-4 py-2 rounded bg-gray-200 ${
      sortBy.field === field ? "bg-gray-400" : ""
    }`}
    onClick={onClick}
  >
    Sort by {label}{" "}
    {sortBy.field === field && (sortBy.order === "asc" ? "▲" : "▼")}
  </motion.button>
);

export default SortButton;
