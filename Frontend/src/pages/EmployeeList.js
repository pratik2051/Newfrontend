import React, { useState } from 'react';
import './EmployeeList.css';
import { useNavigate } from 'react-router-dom';
import employees from './data/employees';

const EmployeeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowClick = (employee) => {
    // You can perform any action here, such as navigating to another page
    navigate(`/employee/${employee.code}`);
  };

  const renderEmployees = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedEmployees = employees.slice(startIndex, startIndex + itemsPerPage);
    return selectedEmployees.map((employee, index) => (
      <tr key={index} onClick={() => handleRowClick(employee)}>
        <td>{employee.code}</td>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
      </tr>
    ));
  };

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Employee Code</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {renderEmployees()}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>&lt;&lt;</button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            className={currentPage === page + 1 ? 'active' : ''}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>&gt;&gt;</button>
      </div>
    </div>
  );
};

export default EmployeeList;
