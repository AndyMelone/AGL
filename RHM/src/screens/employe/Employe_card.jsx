import { useState, useEffect } from "react";
import { getEmployes } from "../../api/api_employe";
import EmployerCards from "../../components/ui/EmployeeCards";
import EmployeSkeletonCard from "../../skeleton/employecard";

export default function EmployeCard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await getEmployes();
        if (response && response.data) {
          setEmployees(response.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des employés:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-4 justify-center">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <EmployeSkeletonCard key={index} />
            ))
          : employees.map((employee) => (
              <EmployerCards key={employee.id} employee={employee} />
            ))}
      </div>
    </div>
  );
}
