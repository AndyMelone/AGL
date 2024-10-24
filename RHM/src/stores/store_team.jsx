import { create } from 'zustand';
import { getTeam } from "../api/api_team";


const useTeamStore = create((set) => ({
    
  team: [],

  loadTeam: async () => {
    try {
      const response = await getTeam();
      if (response && response.data) {
        const team = response.data.map(dept=>({
          ...dept,
          leader: dept.manager ? dept.manager.firstName + " " + dept.manager.lastName  : "N/A"
        }))
        set({ team});
      }
    } catch (error) {
      console.error("Failed to load departments:", error);
    }
  },

  addTeam: (team) => {
    set((state) => ({
      team: [...state.team, team],
    }));
  },

  removeTeam: (id_team) => {
    set((state) => ({
      team: state.team.filter(dep => dep.id_dep !== id_team),
    }));
  },

  updateTeam: (updatedTeam) => {
    set((state) => ({
      Team: state.team.map(dep => 
        dep.id_team === updatedTeam.id_team ? updatedTeam : dep
      ),
    }));
  },
}));

export default useTeamStore;
