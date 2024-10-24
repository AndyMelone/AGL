import { create } from 'zustand';
import { getLeaveRequests } from '../api/api_leaveRequest';

const useLeaveStore = create((set) => ({
 
  leaves: [],
  leaveRequests: [],

 
//   loadLeaves: async () => {
//     try {
//       const response = await getLeaves();
//       if (response && response.data) {
//         set({ leaves: response.data });
//       }
//     } catch (error) {
//       console.error("Failed to load leaves:", error);
//     }
//   },

  loadLeaveRequests: async () => {
    try {
      const response = await getLeaveRequests();
      if (response && response.data) {
        const leaveRequests = response.data.map(leaveReq => ({
          ...leaveReq,
          employee: leaveReq.employee ? leaveReq.employee.firstName + " " + leaveReq.employee.lastName  : "N/A"
        }))
        set({ leaveRequests });
      }
    } catch (error) {
      console.error("Failed to load leave requests:", error);
    }
  },

  addLeave: (leave) => {
    set((state) => ({
      leaves: [...state.leaves, leave],
    }));
  },

  addLeaveRequest: (leaveRequest) => {
    set((state) => ({
      leaveRequests: [...state.leaveRequests, leaveRequest],
    }));
  },

  removeLeave: (id) => {
    set((state) => ({
      leaves: state.leaves.filter((leave) => leave.id !== id),
    }));
  },

  removeLeaveRequest: (id) => {
    set((state) => ({
      leaveRequests: state.leaveRequests.filter((request) => request.id !== id),
    }));
  },

  updateLeave: (updatedLeave) => {
    set((state) => ({
      leaves: state.leaves.map((leave) =>
        leave.id === updatedLeave.id ? updatedLeave : leave
      ),
    }));
  },

  updateLeaveRequest: (updatedRequest) => {
    set((state) => ({
      leaveRequests: state.leaveRequests.map((request) =>
        request.id === updatedRequest.id ? updatedRequest : request
      ),
    }));
  },
}));

export default useLeaveStore;
