import React, { useState } from 'react';
import './Reports.css';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('assetDetails');
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Dummy data for asset activity
  const assetActivity = [
    {
      user: 'Kartavya Patel',
      action: 'update Asset details',
      assetTag: 'CLW271',
      description:
        'Asset Description 271 CLW271 Lenovo S4SHW23F 1835LZX3FTM9 Devanshu Gohil Working Online 1835LZX3FTP9 Divyo Bhaskar - Ahmedabad',
      time: '1 min ago',
      profilePic: 'https://via.placeholder.com/40', // Example profile picture URL
    },
    {
      user: 'Virang Desai',
      action: 'changed status of Asset',
      assetTag: 'CLW282',
      time: '1 hours ago',
      profilePic: 'https://via.placeholder.com/40', // Example profile picture URL
    },
    {
      user: 'Kartavya Patel',
      action: 'Assigned Asset',
      assetTag: 'CLW271',
      assignee: 'Aslam Shaikh',
      time: '1 hours ago',
      profilePic: 'https://via.placeholder.com/40', // Example profile picture URL
    },
    {
      user: 'Kartavya Patel',
      action: 'Un Assigned Asset',
      assetTag: 'CLW271',
      assignee: 'Devanshu Gohil',
      time: '1 hours ago',
      profilePic: 'https://via.placeholder.com/40', // Example profile picture URL
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterToggle = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const applyFilters = () => {
    // Implement filtering logic here based on selectedFilters
    // This could involve filtering your assetActivity array
    // or triggering an API call to fetch filtered data
  };

  const resetFilters = () => {
    setSelectedFilters([]);
    // Additional logic to reset any other state if needed
  };

  return (
    <div className="reports-page">
      <div className="filter-section">
        <div>
          <div className="dropdown">
            <button className="filter-btn">Filter ▼</button>
            <div className="dropdown-content">
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Filter 1')}
                  onChange={() => handleFilterToggle('Filter 1')}
                />
                Filter 1
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Filter 2')}
                  onChange={() => handleFilterToggle('Filter 2')}
                />
                Filter 2
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Filter 3')}
                  onChange={() => handleFilterToggle('Filter 3')}
                />
                Filter 3
              </label>
            </div>
          </div>
          <span>Selected Filters: {selectedFilters.join(', ')}</span>
        </div>
        <div>
          <button onClick={applyFilters}>Submit</button>
          <button onClick={resetFilters}>Reset</button>
        </div>
      </div>
      <div className="export-dropdown">
        <button>Export</button>
        <div className="export-dropdown-content">
          <a href="#export_csv">CSV</a>
          <a href="#export_pdf">PDF</a>
          <a href="#export_xlsx">XLSX</a>
        </div>
      </div>
      <div className="tabs-section">
        <div className="tabs">
          <button
            className={activeTab === 'assetDetails' ? 'active' : ''}
            onClick={() => handleTabChange('assetDetails')}
          >
            Asset Details
          </button>
          <button
            className={activeTab === 'assetActivity' ? 'active' : ''}
            onClick={() => handleTabChange('assetActivity')}
          >
            Asset Activity
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'assetDetails' && <div>Asset Details Content</div>}
          {activeTab === 'assetActivity' && (
            <div className="activity-list">
              {assetActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div>
                    <img src={activity.profilePic} alt="profile" />
                    <strong>{activity.user}</strong> {activity.action}{' '}
                    {activity.assetTag}
                    {activity.description && (
                      <p>{activity.description}</p>
                    )}
                    {activity.assignee && (
                      <p>to {activity.assignee}</p>
                    )}
                  </div>
                  <div>{activity.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
