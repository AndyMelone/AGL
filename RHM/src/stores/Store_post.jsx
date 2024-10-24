import { create } from 'zustand';
import { getPosts } from '../api/api_post';

const usePositionStore = create((set) => ({
  
  positions: [],

  loadPositions: async () => {
    try {
      const response = await getPosts();
      if (response && response.data) {
        const positions = response.data.map(pos => ({
          ...pos,
          department: pos.department ? pos.department.name : "N/A", 
          employees: pos.employees ? pos.employees.length : 0,
        }));
        set({ positions });
      }
    } catch (error) {
      console.error("Failed to load positions:", error);
    }
  },

  addPosition: (position) => {
    set((state) => ({
      positions: [...state.positions, position],
    }));
  },

  removePosition: (id_position) => {
    set((state) => ({
      positions: state.positions.filter(pos => pos.id_position !== id_position),
    }));
  },

  updatePosition: (updatedPosition) => {
    set((state) => ({
      positions: state.positions.map(pos => 
        pos.id_position === updatedPosition.id_position ? updatedPosition : pos
      ),
    }));
  },
}));

export default usePositionStore;
