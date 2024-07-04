import React, { useState, useEffect, useContext } from "react";
import AddAssetDetails from "../components/AddAssetDetails";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";

function AssetDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);
  const [type, setType] = useState(""); // Initialize type with a default value

  const authContext = useContext(AuthContext);

  const handleDelete = (id) => {
    console.log(`Attempting to delete supplier with ID: ${id}`);
    fetch(`http://localhost:8080/api/v1/assets/deletAsset/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Delete response status:', response.status);
        if (response.ok) {
          setUpdatePage(!updatePage); // Trigger page update to refresh the list
        } else {
          return response.json().then((error) => {
            console.error('Failed to delete supplier:', error);
            throw new Error('Failed to delete supplier');
          });
        }
      })
      .catch((err) => console.error('Error during delete request:', err));
  };

  // Fetching Data of All Assets
  const fetchPurchaseData = () => {
    fetch(`http://localhost:8080/api/v1/assets/getallasset`)
      .then((response) => response.json())
      .then((data) => {
        setAllPurchaseData(data);
      })
      .catch((err) => console.log('Error fetching assets:', err));
  };

  useEffect(() => {
    fetchPurchaseData();
  }, [updatePage]);

  // Modal for Adding Asset
  const addSaleModalSetting = (id, type) => {
    setPurchaseModal(!showPurchaseModal);
    console.log(id, type);
    setType(type); // Update type based on modal setting
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-full overflow-x-auto">
        {showPurchaseModal && (
          <AddAssetDetails
            addSaleModalSetting={addSaleModalSetting}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
            type
          />
        )}
        {/* Table */}
        <div className="rounded-lg border bg-white border-gray-200 p-15">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold text-lg">Asset Details</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                onClick={() => addSaleModalSetting()}
              >
                Add Asset
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      AssetID
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      AssetTag
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Category
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Status
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      EmployeeID
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      RoomID
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      ModelNo.
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      CompanyName
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      SerialNumber
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      PurchaseDate
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Quantity
                    </th>
                    
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Description
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Warranty
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {purchase.map((element) => (
                    <tr key={element.id}>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                        {element.id}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {element.asset_tag}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {element.category}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {element.status}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {element.employee_id}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                        {element.room_id}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {element.model_no}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {element.company_name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {element.serial_number}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {element.purchase_date}
                      </td><td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {element.quantity}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {element.description}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {element.warranty}
                      </td>
                      
                      <td className="whitespace-nowrap px-4 py-2 text-white">
                        {/* <Link to={`/editsupplier/${element.id}`}> */}
                        <button
                          className="bg-yellow-500 hover:bg-green-700 text-white font-bold p-2 text-xs rounded mx-4"
                          onClick={() => addSaleModalSetting(element.id, false)}
                        >
                          Update
                        </button>
                        {/* </Link> */}
                        <button
                          className="bg-yellow-500 hover:bg-red-700 text-white font-bold p-2 text-xs rounded"
                          onClick={() => handleDelete(element.id)}
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
      </div>
    </div>
  );
}

export default AssetDetails;
