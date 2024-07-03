import React, { useState, useEffect, useContext } from "react";
import AddAssetDetails from "../components/AddAssetDetails";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";

function AssetDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);


  // Fetching Data of All Assets
  const fetchPurchaseData = () => {
    fetch(`http://localhost:8080/api/v1/assets/getallasset`)
      .then((response) => response.json())
      .then((data) => {
        setAllPurchaseData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => { 
    fetchPurchaseData();
  }, [updatePage]);

  // Modal for Adding Asset
  const addSaleModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {showPurchaseModal && (
          <AddAssetDetails
            addSaleModalSetting={addSaleModalSetting}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        {/* Table */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">Asset Details</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                onClick={addSaleModalSetting}
              >
                Add Asset
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Asset Tag
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Category
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  CompanyName
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Model
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  SerialNumber
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  PurchaseDate
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  PurchaseDate
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  PurchaseCost
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Warrenty
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Employee
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Room
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Location
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Supplier
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Action
                </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {purchase.map((element) => (
                <tr key={element.asset_tag}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {element.company_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.model}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.warrenty}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {element.serial_number}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.purchase_date}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.purchase_cost}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.catagory_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.status_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {element.employee_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.room_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.location}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-white">
                    <Link to={ `/editsupplier/${element.supplierId}`}>
                    <button
                      className="bg-yellow-500 hover:bg-green-700 text-white font-bold p-2 text-xs rounded"
                      onClick={addSaleModalSetting}
                    >
                      Update
                    </button>
                    </Link>
                    <button
                      className="bg-red-600 p-2 rounded cursor-pointer"
                      onClick={() => handleDelete(element.supplierId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AssetDetails;
