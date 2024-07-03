import React, { useState } from 'react';
import './Reports.css';
import Activity from './Activity.js';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('assetDetails');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterSearchBoxes, setFilterSearchBoxes] = useState({});

  // Dummy data for asset details
  const assetDetails = [
    {
      assetId: 'CLW271',
      company: 'Company A',
      model: 'Lenovo S4SHW23F',
      category: 'Laptop',
      status: 'Assigned',
      employee: 'John Doe',
      room: 'Room 101',
      location: 'New York',
      supplier: 'Supplier A',
      date: '2024-07-04',
    },
    {
      assetId: 'CLW282',
      company: 'Company B',
      model: 'Dell Inspiron 15',
      category: 'Laptop',
      status: 'Available',
      employee: '',
      room: 'Room 102',
      location: 'San Francisco',
      supplier: 'Supplier B',
      date: '2024-07-05',
    },
    // Add more asset details as needed
  ];

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
      time: '1 hour ago',
      profilePic: 'https://via.placeholder.com/40', // Example profile picture URL
    },
    {
      user: 'Kartavya Patel',
      action: 'Assigned Asset',
      assetTag: 'CLW271',
      assignee: 'Aslam Shaikh',
      time: '2 hours ago',
      profilePic: 'https://via.placeholder.com/40', // Example profile picture URL
    },
    {
      user: 'Kartavya Patel',
      action: 'Unassigned Asset',
      assetTag: 'CLW271',
      assignee: 'Devanshu Gohil',
      time: '3 hours ago',
      profilePic: 'https://via.placeholder.com/40', // Example profile picture URL
    },
    // Add more asset activity as needed
  ];

  console.log('assetActivity in Reports.js:', assetActivity);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterToggle = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
      setFilterSearchBoxes((prevState) => {
        const updatedState = { ...prevState };
        delete updatedState[filter];
        return updatedState;
      });
    } else {
      setSelectedFilters([...selectedFilters, filter]);
      setFilterSearchBoxes((prevState) => ({
        ...prevState,
        [filter]: true,
      }));
    }
  };

  const applyFilters = () => {
    // Implement filtering logic here based on selectedFilters
    // This could involve filtering your assetActivity array
    // or triggering an API call to fetch filtered data
  };

  const resetFilters = () => {
    setSelectedFilters([]);
    setFilterSearchBoxes({});
    // Additional logic to reset any other state if needed
  };

  const renderSearchBox = (filter) => {
    if (filterSearchBoxes[filter]) {
      return (
        <input
          type="text"
          placeholder={`Search ${filter}`}
          className="filter-search"
        />
      );
    }
    return null;
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
                  checked={selectedFilters.includes('Date')}
                  onChange={() => handleFilterToggle('Date')}
                />
                Date
              </label>
              {renderSearchBox('Date')}

              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Status')}
                  onChange={() => handleFilterToggle('Status')}
                />
                Status
              </label>
              {renderSearchBox('Status')}

              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Category')}
                  onChange={() => handleFilterToggle('Category')}
                />
                Category
              </label>
              {renderSearchBox('Category')}

              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Location')}
                  onChange={() => handleFilterToggle('Location')}
                />
                Location
              </label>
              {renderSearchBox('Location')}

              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Employee')}
                  onChange={() => handleFilterToggle('Employee')}
                />
                Employee
              </label>
              {renderSearchBox('Employee')}

              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Room')}
                  onChange={() => handleFilterToggle('Room')}
                />
                Room
              </label>
              {renderSearchBox('Room')}

              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Supplier')}
                  onChange={() => handleFilterToggle('Supplier')}
                />
                Supplier
              </label>
              {renderSearchBox('Supplier')}

              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Company')}
                  onChange={() => handleFilterToggle('Company')}
                />
                Company
              </label>
              {renderSearchBox('Company')}
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
          {activeTab === 'assetDetails' && (
            <div>
              <h3>Asset Details:</h3>
              <table className="asset-table">
                <thead>
                  <tr>
                    <th>Asset ID</th>
                    <th>Company</th>
                    <th>Model</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Employee</th>
                    <th>Room</th>
                    <th>Location</th>
                    <th>Supplier</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {assetDetails.map((asset, index) => (
                    <tr key={index}>
                      <td>{asset.assetId}</td>
                      <td>{asset.company}</td>
                      <td>{asset.model}</td>
                      <td>{asset.category}</td>
                      <td>{asset.status}</td>
                      <td>{asset.employee}</td>
                      <td>{asset.room}</td>
                      <td>{asset.location}</td>
                      <td>{asset.supplier}</td>
                      <td>{asset.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'assetActivity' && (
            <>
              {console.log('Passing assetActivity to Activity:', assetActivity)}
              <Activity assetActivity={assetActivity} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
