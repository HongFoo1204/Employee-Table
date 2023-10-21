import type { Employee } from "@/interfaces/employee";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import { useState } from "react";

export default function Table({ employees }: { employees: Employee[] }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee>();

  const handleUpdateClick = (selectedEmployee: Employee) => {
    setEmployee(selectedEmployee);
    setIsModalOpen(true);
  };
  const handleModalClose = () => setIsModalOpen(false);
  const handleUpdate = async (employee: Employee) => {
    try {
      //Update request to NextJS API to simulate backend API
      await fetch("/api", {
        method: "PUT",
        body: JSON.stringify(employee),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Update Successfully");
      // Force refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Error updating employee", error);
    }
  };

  return (
    <>
      {isModalOpen && employee && (
        <UpdateEmployeeModal
          employee={employee}
          onUpdate={handleUpdate}
          onClose={handleModalClose}
        />
      )}
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              ID
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Name
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Email
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Status
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Action
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {employees.map((employee) => (
            <tr key={`employee-${employee.id}`}>
              <td className='px-6 py-4 whitespace-nowrap'>{employee.id}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{employee.name}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{employee.email}</td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {employee.isActive ? (
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                    ACTIVE
                  </span>
                ) : (
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                    DEACTIVATED
                  </span>
                )}
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                {employee.isActive && (
                  <button
                    onClick={() => {
                      handleUpdateClick(employee);
                    }}
                  >
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
