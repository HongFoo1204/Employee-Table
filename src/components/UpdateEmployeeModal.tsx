import { Employee } from "@/interfaces/employee";
import React, { useState } from "react";

interface UpdateEmployeeModalProps {
  employee: Employee;
  onUpdate: (employee: Employee) => void;
  onClose: () => void;
}

const UpdateEmployeeModal = ({
  employee,
  onUpdate,
  onClose,
}: UpdateEmployeeModalProps) => {
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [isActive, setIsActive] = useState(employee.isActive);

  const handleUpdate = () => {
    // Perform the update action and pass the updated data to the parent component
    const updatedEmployee = {
      ...employee,
      name,
      email,
      isActive,
    };
    onUpdate(updatedEmployee);
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div
        className='modal-backdrop fixed inset-0 bg-gray-900 opacity-50'
        onClick={onClose}
      ></div>
      <div className='modal-container bg-white w-96 mx-auto rounded shadow-lg z-50'>
        <div className='p-4'>
          <h2 className='text-xl font-semibold mb-4'>Update Employee</h2>
          <form>
            <div className='mb-4'>
              <label className='block text-gray-600'>Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full border rounded p-2'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-600'>Email</label>
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border rounded p-2'
              />
            </div>
            <div className='mb-4'>
              <label className='inline-flex relative items-center mr-5 cursor-pointer'>
                <input
                  type='checkbox'
                  className='sr-only peer'
                  checked={isActive}
                  readOnly
                />
                <div
                  onClick={() => {
                    setIsActive(!isActive);
                  }}
                  className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                ></div>
                <span className='ml-2 text-sm font-medium text-gray-900'>
                  IsActive
                </span>
              </label>
            </div>
            <div className='flex justify-end'>
              <button
                type='button'
                onClick={onClose}
                className='mr-4 px-4 py-2 text-gray-600 hover:text-gray-900'
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={handleUpdate}
                className='px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded'
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployeeModal;
