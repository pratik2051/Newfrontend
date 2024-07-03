import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [totalAsset, setTotalAsset] = useState([]);
  const [totalEmployee, setTotalEmployee] = useState([]);
  const [brokenAssets, setBrokenAssets] = useState([]);
  const [spareAssets, setSpareAssets] = useState([]);
  const [workingAssets, setWorkingAssets] = useState([]);
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const totalAssetResponse = await axios.get('http://localhost:8080/api/v1/assets/getallasset');
        setTotalAsset(totalAssetResponse.data);

        const totalEmployeeResponse = await axios.get('http://localhost:8080/api/v1/employees/getallemployee');
        setTotalEmployee(totalEmployeeResponse.data);

        const brokenAssetsResponse = await axios.get('http://localhost:8080/api/v1/asset-statuses/getallassetstatus');
        setBrokenAssets(brokenAssetsResponse.data);

        const spareAssetsResponse = await axios.get('http://localhost:8080/api/v1/assets/getallasset');
        setSpareAssets(spareAssetsResponse.data);

        const workingAssetsResponse = await axios.get('http://localhost:8080/api/v1/asset-statuses/getallassetstatus');
        setWorkingAssets(workingAssetsResponse.data);

        const computersResponse = await axios.get('http://localhost:8080/api/v1/assets/getallasset');
        setComputers(computersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if needed
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4 p-4">
      <DashboardCard title="Total Assets" value={totalAsset.length} />
      <DashboardCard title="Total Employees" value={totalEmployee.length} />
      <DashboardCard title="Broken Assets" value={brokenAssets.length} />
      <DashboardCard title="Spare Assets" value={spareAssets.length} />
      <DashboardCard title="Working Assets" value={workingAssets.length} />
      <DashboardCard title="Computers" value={computers.length} />
    </div>
  );
}


const DashboardCard = ({ title, value }) => (
  <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
    <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
      {/* Transaction Indicator */}
    </div>
    <div>
      <strong className="block text-sm font-medium text-gray-500">
        {title}
      </strong>
      <p>
        <span className="text-2xl font-medium text-gray-900">
          {value}
        </span>
      </p>
    </div>
  </article>
);

export default Dashboard;
