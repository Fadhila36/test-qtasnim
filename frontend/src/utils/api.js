import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Assuming this environment variable is correctly set in your environment
});

// Functions to interact with `/items` endpoints
export const fetchItems = () => api.get("/items");
export const fetchItemById = (id) => api.get(`/items/${id}`);
export const addItem = (data) => api.post("/items", data); // Renamed createItem to addItem for consistency
export const updateItem = (id, data) => api.put(`/items/${id}`, data);
export const deleteItem = (id) => api.delete(`/items/${id}`);

// Functions to interact with `/item-types` endpoints
export const fetchItemTypes = () => api.get("/item-types");
export const fetchItemTypeById = (id) => api.get(`/item-types/${id}`);
export const addItemType = (data) => api.post("/item-types", data); // Renamed createItemType to addItemType for consistency
export const updateItemType = (id, data) => api.put(`/item-types/${id}`, data);
export const deleteItemType = (id) => api.delete(`/item-types/${id}`);

// Functions to interact with `/transactions` endpoints
export const fetchTransactions = () => api.get("/transactions");
export const fetchTransactionById = (id) => api.get(`/transactions/${id}`);
export const addTransaction = (data) => api.post("/transactions", data); // Renamed createTransaction to addTransaction for consistency
export const updateTransaction = (id, data) =>
  api.put(`/transactions/${id}`, data);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

export default api;
