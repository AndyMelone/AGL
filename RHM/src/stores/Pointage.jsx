import { create } from "zustand";
import { getListPresence } from "../api/pointage";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


const formatTime = (timeString) => {
  const time = new Date(timeString);
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const usePresenceStore = create((set) => ({
  presenceListTotal: [],

  loaPresenceListTotal: async () => {
    try {
      const response = await getListPresence();
      if (response && response.data) {
        const presenceListTotal = response.data.map((presence) => ({
          ...presence,
          date: presence.date ? formatDate(presence.date) : "N/A",
          heureDebut: presence.checkInTime ? formatTime(presence.checkInTime) : "N/A",
          pause: presence.Breaks ? (presence.Break) : "N/A", 
          reprise: presence.EndBreak ? formatTime(presence.EndBreak) : "N/A", 
          fin: presence.checkOutTime ? formatTime(presence.checkOutTime) : "N/A",
          employee: (
            <div className="flex items-center gap-10">
              <div className=" rounded-full w-10 h-10 justify-center flex items-center bg-green-300 ">
                {presence.employee.firstName.charAt(0).toUpperCase() +
                  presence.employee.lastName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-medium">{capitalizeFirstLetter(presence.employee.firstName)} </div>
                <div className="text-xs text-gray-500">{capitalizeFirstLetter(presence.employee.lastName)}</div>
              </div>
            </div>
          ),
          Breaks: presence.Breaks[0] ? formatTime(presence?.Breaks?.at(0)?.Break) : "N/A",
          EndBreak: presence.Breaks[0] ? formatTime(presence?.Breaks?.at(0)?.EndBreak) : "N/A",
          matricule: presence.employee ? presence.employee.matricule : "N/A",

        }));
        set({ presenceListTotal });
      }
    } catch (error) {
      console.error("Failed to load presence list:", error);
    }
  },

  addPresence: (presence) => {
    set((state) => ({
      presenceListTotal: [...state.presenceListTotal, presence],
    }));
  },

  removePresence: (id) => {
    set((state) => ({
      presenceListTotal: state.presenceListTotal.filter(
        (presence) => presence.id !== id
      ),
    }));
  },
}));

export default usePresenceStore;
