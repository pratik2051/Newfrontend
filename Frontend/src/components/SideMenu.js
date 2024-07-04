import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/user-icon.png"

function SideMenu() {
  const localStorageData = localStorage.getItem("firstName");
  const localStorageData1 = localStorage.getItem("lastName");
  
  return (
    <div className="h-full flex-col justify-between  bg-white hidden lg:flex ">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700"
          >
            <img
              alt="dashboard-icon"
              src={require("../assets/dashboard-icon.png")}
            />
            <span className="text-sm font-medium"> Dashboard </span>
          </Link>

          <Link
            to="/employeelist"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src={require("../assets/user-icon.png")}
            />
            <span className="text-sm font-medium">  Employee</span>
          </Link>
         
          <Link
            to="/asset"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src={require("../assets/asset-icon.png")}
            />
            <span className="text-sm font-medium">  Asset</span>
          </Link>
          <Link
            to="/supplier"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src={require("../assets/supplier-icon.png")}
            />
            <span className="text-sm font-medium">  Supplier</span>
          </Link>
          <Link
            to="/room"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src={require("../assets/room-icon.png")}
            />
            <span className="text-sm font-medium">  Room</span>
          </Link>
          <Link
            to="/location"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src={require("../assets/location-icon.png")}
            />
            <span className="text-sm font-medium">  Location</span>
          </Link>
          <Link
            to="/report"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src={require("../assets/reports-icon.png")}
            />
            <span className="text-sm font-medium">  Reports</span>
          </Link>
          {/* <Link
            to="/activity"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src={require("../assets/activity-icon.png")}
            />
            <span className="text-sm font-medium">  Activity</span>
          </Link> */}
          {/* <Link
            to="/permission"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src={require("../assets/permission-icon.png")}
            />
            <span className="text-sm font-medium">  Permission</span>
          </Link> */}
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <img
            alt="Profile"
            src={Image}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">
               {localStorageData}
              </strong>

              <span> {localStorageData1} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
