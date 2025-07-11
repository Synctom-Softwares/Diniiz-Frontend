import Layout from "@/components/common/Layout";
import { useState } from "react";
import Api from "@/config/api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import PaginationControls from "@/components/common/PaginationControls";
import { usePagination } from "@/hooks/use-pagination";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getBadgeColor } from "@/lib";
import { Loader2 } from "lucide-react";

const staffTableColumns = [
  { key: "customer", label: "Customer" },
  { key: "partySize", label: "Party Size" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "tableId", label: "Table(s)" },
  { key: "status", label: "Status" },
  { key: "specialRequests", label: "Special Requests" },
  { key: "allergies", label: "Allergies" },
];

function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useSelector((state) => state.auth);

  const {
    paginatedData,
    currentPage,
    totalPages,
    totalCount,
    startEntry,
    endEntry,
    pageNumbers,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  } = usePagination(data, 10);

  useEffect(() => {
    async function fetchReservations() {
      const getStaffApi = new Api(
        `/api/locations/${userData.locationId}/staff`
      );
      try {
        setIsLoading(true);
        const response = await getStaffApi.get(
          `/${userData._id}/tableReservations`
        );
        console.log(response);
        if (response.reservations) {
          setData(response.reservations);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReservations();
  }, [userData]);

  return (
    <Layout title="Dashboard">
      <div className="gap-4 mt-8 *:rounded-3xl max-w-[91%] mx-auto">
        <div className="min-h-32 p-6 bg-white border">
          <h3 className="text-lg font-semibold mb-2 text-left">
            Assigned Reservations & Tables
          </h3>
          {isLoading ? (
            <div className="text-center py-4">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <>
              <Table className="min-w-lg">
                <TableHeader>
                  <TableRow>
                    {staffTableColumns.map((col) => (
                      <TableHead key={col.key}>{col.label}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={staffTableColumns.length}
                        className="text-center"
                      >
                        No tables or reservations have been assigned to you yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedData.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell>{row.customer.customerName}</TableCell>
                        <TableCell>{row.partySize}</TableCell>
                        <TableCell>
                          {new Date(row.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{row.time}</TableCell>
                        <TableCell>
                          {Array.isArray(row.tableId)
                            ? row.tableId.join(", ")
                            : row.tableId}
                        </TableCell>
                        <TableCell className="capitalize">
                          <Badge className={cn(getBadgeColor(row.status))}>
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{row.specialRequests || "-"}</TableCell>
                        <TableCell>{row.allergies || "-"}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {!isLoading && paginatedData.length > 0 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalCount={totalCount}
                  startEntry={startEntry}
                  endEntry={endEntry}
                  pageNumbers={pageNumbers}
                  onPageChange={goToPage}
                  onNextPage={goToNextPage}
                  onPreviousPage={goToPreviousPage}
                  showLabel={true}
                />
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
