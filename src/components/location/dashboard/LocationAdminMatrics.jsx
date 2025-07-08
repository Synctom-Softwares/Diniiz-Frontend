import { useState, useEffect } from "react";
import StatsCard from "@/components/common/StatsCard";
import Api from "@/config/api";

const LocationAdminMetrics = ({ locationId = "AB002" }) => {
  const [metricsData, setMetricsData] = useState({
    bookings: {
      count: 0,
      bookings: [],
      comparison: {
        percentageChange: "0.00%",
        trend: "increase",
        yesterdayCount: 0
      }
    },
    occupancy: {
      totalTables: 0,
      occupiedToday: 0,
      occupancyRate: "0.00%",
      comparison: {
        yesterdayOccupied: 0,
        yesterdayRate: "0.00%",
        change: "0.00%",
        trend: "increase"
      }
    },
    noShows: {
      noShowsToday: 0,
      totalTodayBookings: 0,
      rate: "0.00%",
      comparison: {
        yesterdayNoShows: 0,
        yesterdayRate: "0.00%",
        change: "0.00%",
        trend: "increase"
      }
    }
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const api = new Api(`/api/locations/`);
        const response = await api.get(`${locationId}/dailyMetrics`);
        if (response && response.success && response.data) {
          setMetricsData(response.data);
        }
      } catch (error) {
        console.error("Error fetching location admin metrics:", error);
      }
    };
    fetchMetrics();
  }, [locationId]);

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

export default LocationAdminMetrics;

