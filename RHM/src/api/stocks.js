const API_URL = "http://localhost:3000";

export const getStocks = async () => {
  const res = await fetch(`${API_URL}/categories`);
  const data = await res.json();
  const products = data.reduce((acc, current) => {
    return [...acc, ...current.products];
  }, []);
  return products.filter((p) => p.quantity > 0);
};

export const getCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  const data = await res.json();
  return data.map((c) => {
    return {
      id: c.id,
      label: c.label,
    };
  });
};
