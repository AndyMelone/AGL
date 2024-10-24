import { create } from 'zustand';
import { getDepartements } from "../api/api_departement";


const useDepartmentStore = create((set) => ({
    
  departments: [],

  loadDepartments: async () => {
    try {
      const response = await getDepartements();
      if (response && response.data) {
        const departments = response.data.map(dept=>({
          ...dept,
          leader: dept.manager ? dept.manager.firstName + " " + dept.manager.lastName  : "N/A"
        }))
        set({ departments});
      }
    } catch (error) {
      console.error("Failed to load departments:", error);
    }
  },

  addDepartment: (department) => {
    set((state) => ({
      departments: [...state.departments, department],
    }));
  },

  removeDepartment: (id_dep) => {
    set((state) => ({
      departments: state.departments.filter(dep => dep.id_dep !== id_dep),
    }));
  },

  updateDepartment: (updatedDepartment) => {
    set((state) => ({
      departments: state.departments.map(dep => 
        dep.id_dep === updatedDepartment.id_dep ? updatedDepartment : dep
      ),
    }));
  },
}));

export default useDepartmentStore;
