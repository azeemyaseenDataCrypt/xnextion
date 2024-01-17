import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chart.js/auto";
import { useNavigate } from "react-router-dom";
import ProductsListing from "./ProductsListing";

const Dashboard = () => {
  const chartData = [10, 20, 30, 40, 50];
  const chartLabels = ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"];
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };


  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: "Data",
              data: chartData,
              backgroundColor: "#3490dc",
            },
          ],
        },
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [chartData, chartLabels]);

  return (
    <>
      <div className="w-full h-20 bg-[#1F2937] flex items-center justify-between 2xl:container mx-auto px-20 border-b border-gray-400">
        <h1 className="text-lg font-medium text-white">LOGO</h1>
        <button onClick={handleLogout}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-base font-medium"
        >
          Log out
        </button>
      </div>
      <div className="flex relative">
        <div className="w-80 min-h-full bg-[#1F2937] px-5 pt-7">
          <button className="text-white text-base w-full hover:bg-[#111827] text-start px-5 py-3 rounded-lg">
            Products
          </button>
        </div>
        <div className="h-full bg-[#111827] w-full px-5 flex items-center">
          <div className="bg-[#1F2937] rounded-xl h-[90%] w-full p-10">
            <div className="flex">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <canvas ref={chartRef} className="w-full h-64"></canvas>
              </div>
            </div>
            <ProductsListing/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
