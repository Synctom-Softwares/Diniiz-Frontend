import { PieChart, Pie, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import axios from "axios";

const chartConfig = {
  customers: {
    label: "Customers",
  },
  reservations: {
    label: "Reservations",
    color: "#6640FF",
  },
  walkins: {
    label: "Walk-ins",
    color: "#fd0000",
  },
};

const ReservationChart = () => {
  const [chartData, setChartData] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/locations/AB002L1/resrAndWalkin');
        const { stats } = response.data;
        
        const data = [
          {
            type: "reservations",
            customers: stats.totalReservations,
            fill: "var(--color-reservations)",
          },
          {
            type: "walkins",
            customers: stats.totalWalkIns,
            fill: "var(--color-walkins)",
          },
        ];
        
        setChartData(data);
        setTotalCustomers(stats.totalReservations + stats.totalWalkIns);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ChartContainer
        config={chartConfig}
        className=" [&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0 h-full w-full"
      >
        <PieChart width={250} height={250}>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                hideIndicator={false}
                formatter={(value, name) => [
                  `${value} customers (${(
                    (value / totalCustomers) *
                    100
                  ).toFixed(1)}%)`,
                  chartConfig[name]?.label || name,
                ]}
              />
            }
          />
          <Pie
            data={chartData}
            dataKey="customers"
            nameKey="type"
            innerRadius="70%"
            outerRadius="90%"
            paddingAngle={1}
            label={(entry) => chartConfig[entry.type]?.label}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={2} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default ReservationChart;
