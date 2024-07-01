import React, { useState, useEffect, useContext } from "react";
import AddRoomDetails from "../components/AddRoomDetails";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";

function RoomDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

 

  const handleDelete = (room_id) => {
    fetch(`http://localhost:8080/api/v1/auth/supplier/delsupplier/${room_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        
      },
    })
      .then((response) => {
        if (response.ok) {
          setUpdatePage(!updatePage); // Trigger page update to refresh the list
        } else {
          console.error('Failed to delete supplier');
        }
      })
      .catch((err) => console.error(err));
  };

  // Fetching Data of All Room
  const fetchPurchaseData = () => {
    fetch(`http://localhost:8080/api/v1/auth/supplier/getsuppliers`)
      .then((response) => response.json())
      .then((data) => {
        setAllPurchaseData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => { 
    fetchPurchaseData();
  }, [updatePage]);

  // Modal for Adding Room
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
          <AddRoomDetails
            addSaleModalSetting={addSaleModalSetting}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        {/* Table */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">Room Details</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                onClick={addSaleModalSetting}
              >
                Add Room
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  RoomID
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  LocationID
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Description
                </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {purchase.map((element) => (
                <tr key={element.room}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {element.room_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.location_id}
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

export default RoomDetails;
