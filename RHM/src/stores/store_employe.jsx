import { create } from "zustand";
import { getEmployes } from "../api/api_employe";

const useEmployeStore = create((set) => ({
  employees: [],

  loadEmployees: async () => {
    try {
      const response = await getEmployes();
      if (response && response.data) {
        const employees = response.data.map((emp) => ({
          ...emp,
          department: emp.department ? emp.department.name : "N/A",
          position: emp.position ? emp.position.title : "N/A",
          name: (
            <div className="flex items-center gap-10">
              <div className=" rounded-full w-10 h-10 justify-center flex items-center bg-green-300 ">
                {emp.firstName.charAt(0).toUpperCase() +
                  emp.lastName.charAt(0).toUpperCase()}{" "}
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-medium">{emp.firstName} </div>
                <div className="text-xs text-gray-500">{emp.lastName}</div>
              </div>
            </div>
          ),
        }));
        set({ employees });
      }
    } catch (error) {
      console.error("Failed to load employees:", error);
    }
  },

  removeEmployee: (id) => {
    set((state) => ({
      employees: state.employees.filter((employee) => employee.id !== id),
    }));
  },

  addEmployee: (employee) => {
    set((state) => ({
      employees: [...state.employees, employee],
    }));
  },

  updateEmployee: (updatedEmployee) => {
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      ),
    }));
  },
}));

export default useEmployeStore;
