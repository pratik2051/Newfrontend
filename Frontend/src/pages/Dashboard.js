import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import AuthContext from "../AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutData = {
  labels: ["furniture", "electronic equipment", "machinery equipment", "library assets", "whiteboard"],
  datasets: [
    {
      label: "# of Items",
      data: [0, 1, 5, 8, 9],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  const [transactionAmount, setTransactionAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
      },
    },
    series: [
      {
        name: "Monthly Sales Amount",
        data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
      },
    ],
  });

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchTotalTransactionAmount();
    fetchTotalPurchaseAmount();
    fetchMonthlySalesData();
  }, []);

  const fetchTotalTransactionAmount = () => {
    axios.get('http://localhost:8080/api/v1/auth/transaction/alltransactions')
      .then((response) => setTransactionAmount(response.data.totalTransactionAmount))
      .catch((error) => console.error(error));
  };

  const fetchTotalPurchaseAmount = () => {
    axios.get(`http://localhost:8080/api/purchase/get/${authContext.user}/totalpurchaseamount`)
      .then((response) => setPurchaseAmount(response.data.totalPurchaseAmount))
      .catch((error) => console.error(error));
  };

  const fetchMonthlySalesData = () => {
    axios.get('http://localhost:8080/api/v1/auth/purchase-orders/allpurchase')
      .then((response) => {
        setChartData((prevData) => ({
          ...prevData,
          series: [
            {
              name: "Monthly Sales Amount",
              data: response.data.salesAmount,
            },
          ],
        }));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4 p-4">
      <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
        <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
          {/* Transaction Indicator */}
        </div>
        <div>
          <strong className="block text-sm font-medium text-gray-500">
            Total Asssets
          </strong>
          <p>
            <span className="text-2xl font-medium text-gray-900">
              {transactionAmount}
            </span>
          </p>
        </div>
      </article>

      <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
        <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
          {/* Purchase Indicator */}
        </div>
        <div>
          <strong className="block text-sm font-medium text-gray-500">
            Total Employees
          </strong>
          <p>
            
          </p>
        </div>
      </article>
      <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
        <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-700">
          {/* Purchase Indicator */}
        </div>
        <div>
          <strong className="block text-sm font-medium text-gray-500">
            Broken Assets
          </strong>
          <p>
          </p>
        </div>
      </article>
      <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
        <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
          {/* Purchase Indicator */}
        </div>
        <div>
          <strong className="block text-sm font-medium text-gray-500">
            Spare Assets
          </strong>
          <p>
          </p>
        </div>
      </article>
      <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
        <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
          {/* Purchase Indicator */}
        </div>
        <div>
          <strong className="block text-sm font-medium text-gray-500">
            Working Assets
          </strong>
          <p>
            
          </p>
        </div>
      </article>
      <article className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6">
        <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
          {/* Purchase Indicator */}
        </div>
        <div>
          <strong className="block text-sm font-medium text-gray-500">
            Computers
          </strong>
          <p>
          </p>
        </div>
      </article>
      

      <div className="flex justify-around bg-white rounded-lg py-8 col-span-full">
        <div>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            width="500"
          />
        </div>
        <div>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
