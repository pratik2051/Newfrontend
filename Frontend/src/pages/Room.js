import React, { useState, useEffect, useContext } from "react";
import AddRoomDetails from "../components/AddRoomDetails";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";

function RoomDetails() {
  const [showRoomModal, setRoomModal] = useState(false);
  const [rooms, setAllRoomData] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  const handleDelete = (id) => {
    console.log(`Attempting to delete supplier with ID: ${id}`);
    fetch(`http://localhost:8080/api/v1/rooms/deleteroom/${id}`, {
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
            console.error('Failed to delete room:', error);
            throw new Error('Failed to delete room');
          });
        }
      })
      .catch((err) => console.error('Error during delete request:', err));
  };

  const fetchRoomData = () => {
    fetch(`http://localhost:8080/api/v1/rooms/getallRooms`)
      .then((response) => response.json())
      .then((data) => {
        setAllRoomData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => { 
    fetchRoomData();
  }, [updatePage]);

  const addRoomModalSetting = () => {
    setRoomModal(!showRoomModal);
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {showRoomModal && (
          <AddRoomDetails
            addRoomModalSetting={addRoomModalSetting}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">Room Details</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                onClick={addRoomModalSetting}
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
                  Location
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Description
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {room.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {room.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {room.location}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {room.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-white">
                    {/* <Link to={`/editroom/${room.id}`}> */}
                      <button
                        className="bg-yellow-500 hover:bg-green-700 text-white font-bold p-2 text-xs rounded mx-4"
                        onClick={() => addRoomModalSetting(room.id, false)}
                      >
                        Update
                      </button>
                    {/* </Link> */}
                    <button
                      className="bg-yellow-500 hover:bg-red-700 text-white font-bold p-2 text-xs rounded"
                      onClick={() => handleDelete(room.id)}
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
