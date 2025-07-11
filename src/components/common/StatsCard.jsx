import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({ heading, stat, percentage, isIncrease = true, className }) => {
  return (
    <Card className={cn("text-center text-black/70 border shadow-2xs rounded-3xl py-10", {
      "pb-5": !!percentage
    }, className)}>
      <CardHeader>
        <CardTitle className="">{heading}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className={cn("text-3xl sm:text-4xl font-bold truncate", stat?.length > 8 && "text-sm")}>{stat}</div>
        {percentage && <div
          className={cn(
            "w-full inline-flex items-center justify-end gap-2 text-sm font-semibold",
            {
              "text-success": isIncrease,
              "text-danger": !isIncrease,
            }
          )}
        >
          {isIncrease ? (
            <TrendingUp className="size-4" />
          ) : (
            <TrendingDown className="size-4" />
          )}{" "}
          {percentage}
        </div>}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
