import { useState, useEffect } from "react";
import axios from "axios";
import StatsCard from "@/components/common/StatsCard";
import authApi from "@/config/authApi";

const AdminMetrics = () => {
  const [metricsData, setMetricsData] = useState({
    bookings: { count: 0, comparison: { percentageChange: "0%", trend: "increase" } },
    occupancy: { occupancyRate: "0%", comparison: { change: "0%", trend: "increase" } },
    noShows: { rate: "0%", comparison: { change: "0%", trend: "increase" } }
  });

  
  const fetchMetrics = async () => {
    try {
      const response = await axios.get("/api/locations/AB002L1/dailyMetrics");
      if (response.data.success) {
        setMetricsData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };
  
  useEffect(() => {
    authApi.get("/me").then(data => console.log(data))
    fetchMetrics();
  }, []);

  const stats = [
    {
      id: 1,
      stat: metricsData.bookings.count,
      heading: "Total Bookings",
      isIncrease: metricsData.bookings.comparison.trend === "increase",
      percentage: metricsData.bookings.comparison.percentageChange
    },
    {
      id: 2,
      stat: metricsData.occupancy.occupancyRate,
      heading: "Occupancy Rate",
      isIncrease: metricsData.occupancy.comparison.trend === "increase",
      percentage: metricsData.occupancy.comparison.change
    },
    {
      id: 3,
      stat: metricsData.noShows.rate,
      heading: "No Show Rate",
      isIncrease: metricsData.noShows.comparison.trend === "increase",
      percentage: metricsData.noShows.comparison.change
    }
  ];

  return (
    <>
      {stats.map((stat) => (
        <StatsCard
          key={stat.id}
          stat={stat.stat}
          heading={stat.heading}
          isIncrease={stat.isIncrease}
          percentage={stat.percentage}
          className="col-span-4 xl:col-span-3"
        />
      ))}
    </>
  );
};

export default AdminMetrics;
