import {create} from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: String;
  matricule: String;
  companyId: String;
  pseudo: String;
  firstName: String;
  lastName: String;
  admin: Boolean;
  dateOfBirth: String;
  placeOfBirth: String;
  phoneNumber: String;
  email: String;
  address: String;
  gender: String;
  departmentId: String;
  positionId: String;
  contractType: String;
  salary: String;
  socialSecurityNumber: String;
  emergencyContactName: String;
  emergencyContactlastName: String;
  emergencyContactEmail: String;
  emergencyContactPhone: String;
  emergencyContactAdress: String;
  comments: String;
  roleId: String;
  status: String;
  password: String;
}

interface AuthState {
  user: User | any | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: Partial<User>) => void;
  setToken: (token: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (user: User, token: string) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("isAuthenticated", "true");
      set({
        user,
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("isAuthenticated");
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  },

  setUser: (user: Partial<User>) => {
    set((state) => {
      const updatedUser = { ...state.user, ...user } as User;
      AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },

  setToken: (token: string) => {
    set(() => {
      AsyncStorage.setItem("token", token);
      return { token };
    });
  },
}));

export default useAuthStore;
