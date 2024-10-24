import React, { useState } from 'react';
import dayjs from 'dayjs';


export const PayrollHistory = () => {
    const employees = [
        { name: 'Prudence Gnamién AMANI', role: 'Agent de service', contract: 'CDI', salary: '150.000 FCFA' , bulletin: '1085094.pdf'},
        { name: 'Blaise Parfait BAYONNE', role: 'Agent de propreté', contract: 'CDI', salary: '200.000 FCFA', bulletin: '1085095.pdf' },
        { name: 'Koffi Eric', role: 'Agent commercial', contract: 'CDI', salary: '100.000 FCFA', bulletin: '1085096.pdf' },
        // Add the rest of the employees here
    ];

    const [searchTerm, setSearchTerm] = useState("");

    const [files, setFiles] = useState([]);
    const [showBulletin, setShowBulletin] = useState(false);

    const handleFileUpload = (e) => {
        setFiles([...files, ...e.target.files]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFiles([...files, ...e.dataTransfer.files]);
    };

    const [error, setError] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState("");
  
    const handleValidation = () => {
      if (!selectedEmployee) {
        setError(true);
      } else {
        setError(false);
        // Logique de validation ou de soumission du bulletin
      }
    };
    const handleClick = () => {
        setShowBulletin(true); // Show bulletin section when clicked
      };

      const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };

      const filteredEmployees = employees.filter((employees) =>
        employees.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const [currentDate, setCurrentDate] = useState(dayjs()); // Date actuelle
      const currentMonth = dayjs(); // Mois courant
    
      // Naviguer vers le mois précédent
      const handlePreviousMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
      };
    
      // Ramener au mois courant
      const handleCurrentMonth = () => {
        setCurrentDate(currentMonth);
      };
    
      const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
      };

    return (

      <div className="w-full p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
        <div className="flex items-center ">
          {/* Bouton Mois Précédent */}
          <button
            className="text-gray-500 hover:text-blue-500 border border-slate-300 hover:border-indigo-300 p-1"
            onClick={handlePreviousMonth}
          >
            &lt; 
          </button>


          {/* Bouton Mois Suivant (désactivé si on est au mois courant) */}
          <button
            className="text-gray-500 hover:text-blue-500  border border-slate-300 hover:border-indigo-300 p-1"
            onClick={handleCurrentMonth}
            disabled={currentDate.isSame(currentMonth, 'month')}
          >
            Mois courant
          </button>

          <button
            className="text-gray-500 hover:text-blue-500 border border-slate-300 hover:border-indigo-300 p-1"
            onClick={handleNextMonth}
            disabled={currentDate.isSame(currentMonth, 'month')} // Désactiver si on est déjà au mois courant
          >
            &gt; 
          </button>
          {/* Affichage du mois sélectionné */}
          <span className="font-bold">{currentDate.format('MMMM YYYY')}</span>

        </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-2">
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
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Tout télécharger
                </button>
            </div>
        </div>


            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Employé</th>
                        <th className="px-4 py-2 text-left">Poste</th>
                        <th className="px-4 py-2 text-left">Type de contrat</th>
                        <th className="px-4 py-2 text-left">Rémunération brute</th>
                        <th className="px-4 py-2 text-left">Bulletin</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee, index) => (
                        <tr key={index} className="border-t">
                            <td className="px-4 py-2">{employee.name}</td>
                            <td className="px-4 py-2">{employee.role}</td>
                            <td className="px-4 py-2">{employee.contract}</td>
                            <td className="px-4 py-2">{employee.salary}</td>
                            <td className="px-4 py-2 text-blue-500">
                                <a href={`path/to/${employee.bulletin}`} download>{employee.bulletin}</a>
                            </td>
                            <td className="px-4 py-2">
                                <button className="text-blue-500">📂</button>
                                <button className="text-red-500 ml-2">🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="w-full mx-auto mt-8 p-4">
      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">
          <p>🚨 1 bulletin n'a pas pu être associé à un employé. Veuillez préciser à qui il se réfère.</p>
        </div>
      )}

      <div className="w-full p-10 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center mt-6"

           onDrop={handleDrop}
           onDragOver={(e) => e.preventDefault()}>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer" onClick={handleClick}>
          <div className="text-blue-500 text-lg">
            Déposer les bulletins ici ou importez-les
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Afin de faciliter l'association des bulletins aux collaborateurs, veuillez nommer vos fichiers ainsi : prenom-nom.pdf
          </p>
        </label>
      </div>

      {showBulletin && (
        <div className="bg-gray-100 p-4 rounded shadow mt-4">
          <p className="mb-2">Bulletin à attribuer</p>
          <div className="flex items-center justify-between">
          <div className="mt-4">
        {files.length > 0 && (
          <div className="bg-gray-100 p-4 rounded shadow">
            <p className="mb-2">Fichiers importés :</p>
            <ul className="list-disc list-inside">
              {files.map((file, index) => (
                <li key={index} className="text-gray-700">j
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
          </div>  
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">attribuer à</option>
              <option value="employee1">Prudence Cusimain A%</option>
              {/* Add more employees here */}
            </select>
            <div>
          <button
              onClick={handleValidation}
              className="bg-green-500 text-white p-2 rounded ml-2"
            >
              Valider
            </button>
            <button className="text-red-500 p-2 rounded ml-2">❌</button>
          </div>
          </div> 
        </div>
      )}
    </div>
    </div>
        
    );
};
