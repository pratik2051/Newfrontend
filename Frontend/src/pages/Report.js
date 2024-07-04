import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import './Reports.css';
import Activity from './Activity.js';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('assetDetails');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterSearchBoxes, setFilterSearchBoxes] = useState({});
  const [assetDetails, setAssetDetails] = useState([]);
  const [assetActivity, setAssetActivity] = useState([]);
  const [filterValues, setFilterValues] = useState({
    Date: '',
    Status: '',
    Category: '',
    Location: '',
    Employee: '',
    Room: '',
    Supplier: '',
    Company: '',
  });

  useEffect(() => {
    fetchAssetDetails();
    fetchAssetActivity();
  }, []);

  const fetchAssetDetails = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/assets/getallasset');
      if (!response.ok) {
        throw new Error('Failed to fetch asset details');
      }
      const data = await response.json();
      setAssetDetails(data);
    } catch (error) {
      console.error('Error fetching asset details:', error);
    }
  };

  const fetchAssetActivity = async () => {
    try {
      const response = await fetch('http://api.example.com/asset-activity');
      if (!response.ok) {
        throw new Error('Failed to fetch asset activity');
      }
      const data = await response.json();
      setAssetActivity(data);
    } catch (error) {
      console.error('Error fetching asset activity:', error);
    }
  };

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
      setFilterValues((prevState) => ({
        ...prevState,
        [filter]: '',
      }));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
      setFilterSearchBoxes((prevState) => ({
        ...prevState,
        [filter]: true,
      }));
    }
  };

  const handleFilterChange = (filter, value) => {
    setFilterValues((prevState) => ({
      ...prevState,
      [filter]: value,
    }));
  };

  const applyFilters = () => {
    // Trigger a re-render to apply filters (if needed)
    setAssetDetails((prevDetails) => [...prevDetails]);
  };

  const resetFilters = () => {
    setSelectedFilters([]);
    setFilterSearchBoxes({});
    setFilterValues({
      Date: '',
      Status: '',
      Category: '',
      Location: '',
      Employee: '',
      Room: '',
      Supplier: '',
      Company: '',
    });
  };

  const renderSearchBox = (filter) => {
    if (filterSearchBoxes[filter]) {
      return (
        <input
          type="text"
          placeholder={`Search ${filter}`}
          className="filter-search"
          value={filterValues[filter]}
          onChange={(e) => handleFilterChange(filter, e.target.value)}
        />
      );
    }
    return null;
  };

  const filterAssetDetails = () => {
    return assetDetails.filter((asset) => {
      return selectedFilters.every((filter) => {
        const value = filterValues[filter];
        if (!value) return true;
        switch (filter) {
          case 'Date':
            return asset.purchase_date.includes(value);
          case 'Status':
            return asset.status.toLowerCase().includes(value.toLowerCase());
          case 'Category':
            return asset.category.toLowerCase().includes(value.toLowerCase());
          case 'Location':
            return asset.location?.toLowerCase().includes(value.toLowerCase());
          case 'Employee':
            return asset.employee_id.toString().includes(value);
          case 'Room':
            return asset.room?.toLowerCase().includes(value.toLowerCase());
          case 'Supplier':
            return asset.supplier_id.toString().includes(value);
          case 'Company':
            return asset.company_name.toLowerCase().includes(value.toLowerCase());
          default:
            return true;
        }
      });
    });
  };

  const csvHeaders = [
    { label: 'Asset ID', key: 'id' },
    { label: 'Company', key: 'company_name' },
    { label: 'Model', key: 'model_no' },
    { label: 'Category', key: 'category' },
    { label: 'Status', key: 'status' },
    { label: 'Employee', key: 'employee_id' },
    { label: 'SupplierID', key: 'supplier_id' },
    { label: 'PurchaseDate', key: 'purchase_date' },
  ];

  return (
    <div className="reports-page">
      <div className="filter-section">
        <div>
          <div className="dropdown">
            <button className="filter-btn">Filter ▼</button>
            <div className="dropdown-content">
              {['Date', 'Status', 'Category', 'Location', 'Employee', 'Room', 'Supplier', 'Company'].map((filter) => (
                <div key={filter}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter)}
                      onChange={() => handleFilterToggle(filter)}
                    />
                    {filter}
                  </label>
                  {renderSearchBox(filter)}
                </div>
              ))}
            </div>
          </div>
          <span>Selected Filters: {selectedFilters.join(', ')}</span>
        </div>
      
      </div>
      <div className="export-dropdown">
        <CSVLink data={filterAssetDetails()} headers={csvHeaders} filename="filtered_assets.csv" className="btn btn-primary">
       <button>Export</button>   
        </CSVLink>
      </div>
      <div className="tabs-section">
        <div className="tabs">
          <button
            className={activeTab === 'assetDetails' ? 'active' : ''}
            onClick={() => handleTabChange('assetDetails')}
          >
            Asset Details
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
                    <th>SupplierID</th>
                    <th>PurchaseDate</th>
                  </tr>
                </thead>
                <tbody>
                  {filterAssetDetails().map((asset, index) => (
                    <tr key={index}>
                      <td>{asset.id}</td>
                      <td>{asset.company_name}</td>
                      <td>{asset.model_no}</td>
                      <td>{asset.category}</td>
                      <td>{asset.status}</td>
                      <td>{asset.employee_id}</td>
                      <td>{asset.supplier_id}</td>
                      <td>{asset.purchase_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'assetActivity' && (
            <>
              <Activity assetActivity={assetActivity} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
