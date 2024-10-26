const API_URL = "http://localhost:3000";

export const getOrders = async () => {
  const response = await fetch(`${API_URL}/orders`);
  return response.json();
};
