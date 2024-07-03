import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeDetails.css';
import BackIcon from '../assets/back.png'; // Adjust the path relative to EmployeeDetails.js

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState('currentAssets');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/users`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>; // Handle loading state
  }

  const renderCurrentAssets = () => (
    <table>
      <thead>
        <tr>
          <th>Asset Tag</th>
          <th>Company</th>
          <th>Model</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {employee.currentAssets.map((asset, index) => (
          <tr key={index}>
            <td>{asset.assetTag}</td>
            <td>{asset.company}</td>
            <td>{asset.model}</td>
            <td>{asset.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderEmployeeActivity = () => (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Action</th>
          <th>Asset Tag</th>
          <th>Company</th>
          <th>Model</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {employee.activity.map((activity, index) => (
          <tr key={index}>
            <td>{activity.date}</td>
            <td>{activity.action}</td>
            <td>{activity.assetTag}</td>
            <td>{activity.company}</td>
            <td>{activity.model}</td>
            <td>{activity.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="employee-details-page">
      <div className="profile-tabs-container">
        <div className="profile-box">
          <div className="profile-container">
            <img src={employee.profilePicture} alt={employee.name} className="profile-picture" />
            <div className="profile-info">
              <h2>{employee.name}</h2>
              <p>Email: {employee.email}</p>
            </div>
          </div>
        </div>
        <div className="tabs-box">
          <div className="tabs-container">
            <div className="tabs">
              <button onClick={() => setActiveTab('currentAssets')} className={activeTab === 'currentAssets' ? 'active' : ''}>Current Assets</button>
              <button onClick={() => setActiveTab('activity')} className={activeTab === 'activity' ? 'active' : ''}>Employee Activity</button>
            </div>
            <div className="tab-content">
              {activeTab === 'currentAssets' ? renderCurrentAssets() : renderEmployeeActivity()}
            </div>
          </div>
        </div>
      </div>
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/employeelist')}>
          <img src={BackIcon} alt="BACK" />Back to Employee List
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
