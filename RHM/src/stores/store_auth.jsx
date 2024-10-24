import { create } from "zustand";

const getFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Failed to read from localStorage:", error);
    return null;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to write to localStorage:", error);
  }
};

const useAuthStore = create((set) => {
  const initialUser = getFromLocalStorage("user");
  const initialToken = getFromLocalStorage("token");
  const initialAuth = getFromLocalStorage("isAuthenticated");

  return {
    user: initialUser,
    token: initialToken,
    isAuthenticated: initialAuth || false,

    login: (user, token) => {
      saveToLocalStorage("user", user);
      saveToLocalStorage("token", token);
      saveToLocalStorage("isAuthenticated", true);
      set(() => ({
        user,
        token,
        isAuthenticated: true,
      }));
    },

    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      set(() => ({
        user: null,
        token: null,
        isAuthenticated: false,
      }));
    },

    setUser: (user) => {
      set((state) => {
        const updatedUser = { ...state.user, ...user };
        saveToLocalStorage("user", updatedUser);
        return { user: updatedUser };
      });
    },

    setToken: (token) => {
      saveToLocalStorage("token", token);
      set(() => ({ token }));
    },
  };
});

export default useAuthStore;
