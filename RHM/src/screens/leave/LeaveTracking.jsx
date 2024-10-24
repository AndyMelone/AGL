import React, { useState, useEffect } from 'react';
import { Drawer, Button, Select } from 'antd';

const employees = [
  {
    id: 1,
    name: 'VIANNEY bro',
    leavePeriods: [{ start: new Date(2024, 8, 29), end: new Date(2024, 8, 31), status: 'Repos' }],
    detail:"jnifeisjnfesnfeijfneifjbejifbejzdfnjejisebdfjbefir",
  },
  {
    id: 2,
    name: 'bernard',
    leavePeriods: [{ start: new Date(2024, 8, 1), end: new Date(2024, 8, 5), status: 'Repos' }],
    detail:"jnifeisjnfesnfeijfneifjbejifbejzdfnjejisebdfjbefir",

  },
  {
    id: 3,
    name: 'ange',
    leavePeriods: [{ start: new Date(2024, 8, 7), end: new Date(2024, 8, 14), status: 'Repos' }],
    detail:"jnifeisjnfesnfeijfneifjbejifbejzdfnjejisebdfjbefir",

  },
  {
    id: 4,
    name: 'koffi',
    leavePeriods: [{ start: new Date(2024, 0, 1), end: new Date(2024, 0, 2), status: 'Repos' }],
    detail:"jnifeisjnfesnfeijfneifjbejifbejzdfnjejisebdfjbefir",
  },
];

export const LeaveTracking = () => {
  const [date, setDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  const [gotoDate, setGotoDate] = useState('');
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (newDate) => {
    setDate(newDate);
  };

  // const [employees, setEmployees] = useState([]);
  // const [selectedEmployee, setSelectedEmployee] = useState(null);

  // useEffect(() => {
  //   fetch('http://localhost:3001/api/employees')
  //     .then((response) => response.json())
  //     .then((data) => setEmployees(data))
  //     .catch((error) => console.error('Erreur de récupération des employés:', error));
  // }, []);

  const changeDate = (direction) => {
    const newDate = new Date(date);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + direction * 7);
    } else {
      newDate.setMonth(newDate.getMonth() + direction);
    }
    setDate(newDate);
  };

  const getEventsForDate = (employee, currentDate) => {
    return employee.leavePeriods.find((period) => currentDate >= period.start && currentDate <= period.end);
  };

  const goToSpecificDate = () => {
    if (gotoDate) {
      const newDate = new Date(gotoDate);
      setDate(newDate);
    }
  };

  const handleLeaveClick = (employee, leavePeriod) => {
    setSelectedLeave({ employee, leavePeriod });
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedLeave(null);
  };

  const handleOpenForm = () => {
    setShowForm(true);
    setIsDrawerOpen(true);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    handleCloseDrawer();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">

      <div>
        <h1 className="text-2xl font-bold mb-3 xl ">Suivi des Congés </h1>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-6">

        <div>
          <input
            type="date"
            value={gotoDate}
            onChange={(e) => setGotoDate(e.target.value)}
            className="border px-4 py-2 rounded-lg mx-3"
          />
          <Button onClick={goToSpecificDate}>Aller à</Button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <svg
            className="absolute left-3 top-2.5 text-gray-400"
            width="16"
            height="16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.44 1.103a5.5 5.5 0 1 1 7.778-7.778 5.5 5.5 0 0 1-7.778 7.778z" />
          </svg>
        </div>

        <div className="flex space-x-4 items-center">
          <Button onClick={() => setDate(new Date())}>Aujourd'hui</Button>
          <Button onClick={() => setViewMode('week')}>Semaine</Button>
          <Button onClick={() => setViewMode('month')}>Mois</Button>
        </div>

        <Button type="primary" onClick={handleOpenForm}>Créer</Button>

      </div>

      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => changeDate(-1)}>Précédent</Button>
        <span className="text-xl font-semibold">
          {date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </span>
        <Button onClick={() => changeDate(1)}>Suivant</Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th className="p-2">Employé</th>
              {[...Array(viewMode === 'week' ? 7 : 30)].map((_, i) => {
                const currentDate = new Date(date);
                currentDate.setDate(date.getDate() + i);
                return (
                  <th key={i} className="p-2">
                    {currentDate.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{employee.name}</td>
                {[...Array(viewMode === 'week' ? 7 : 30)].map((_, i) => {
                  const currentDate = new Date(date);
                  currentDate.setDate(date.getDate() + i);
                  const event = getEventsForDate(employee, currentDate);
                  return (
                    <td
                      key={i}
                      className={`p-2 ${event ? 'bg-teal-500 text-white cursor-pointer' : 'bg-gray-100'}`}
                      onClick={() => event && handleLeaveClick(employee, event)}
                    >
                      {event ? <div className="rounded-lg p-2">{event.status}</div> : <span>-</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer pour les détails ou le formulaire */}
      <Drawer
        title={selectedLeave ? 'Détails du congé' : 'Ajouter un congé'}
        placement="right"
        onClose={handleCloseDrawer}
        visible={isDrawerOpen}
        width={400}
      >
        {selectedLeave ? (

         <div className="p-4 bg-white rounded-lg shadow-md max-h-96 overflow-y-auto">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              <strong>Employé:</strong><br /> {selectedLeave.employee.name}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              <strong>Statut:</strong><br /> {selectedLeave.leavePeriod.status}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              <strong>Début du congé:</strong><br /> {selectedLeave.leavePeriod.start.toLocaleDateString()}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              <strong>Fin du congé:</strong><br /> {selectedLeave.leavePeriod.end.toLocaleDateString()}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              <strong>Motif:</strong><br />
              <span className="block  break-words whitespace-normal">
                {selectedLeave.employee.detail}
              </span>
            </p>
          </div>

        ) : (
          <form onSubmit={handleSubmitForm}>

            {/* <div className="w-full border py-2 rounded-lg">
              <Select
                className="w-full"
                placeholder="Sélectionnez un employé"
                value={selectedEmployee}
                onChange={(value) => setSelectedEmployee(value)}
                options={employees.map((employee) => ({
                  value: employee.id,
                  label: employee.firstName,
                }))}
              />
            </div> */}

            <div className="mb-4">
              <label className="block text-gray-700">Employé</label>
              <input type="text" className="border px-4 py-2 rounded-lg w-full" required />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Début du congé:</label>
              <input type="date" className="border px-4 py-2 rounded-lg w-full" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fin du congé:</label>
              <input type="date" className="border px-4 py-2 rounded-lg w-full" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Statut</label>
              <select className="border px-4 py-2 rounded-lg w-full" required>
                <option value="Repos">Repos</option>
                <option value="Congé maladie">Congé maladie</option>
                <option value="Vacances">Vacances</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Détails</label>
              <textarea className="border px-4 py-2 rounded-lg w-full" required></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">Ajouter</button>
          </form>
        )}
      </Drawer>
    </div>
  );
};
