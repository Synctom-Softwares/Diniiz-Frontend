import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Loader2, UserCircle2Icon } from "lucide-react";
import superAdminApi from "@/config/superAdminApi";
import { Badge } from "@/components/ui/badge";
import { usePagination } from "@/hooks/use-pagination";
import PaginationControls from "@/components/common/PaginationControls";
import useSocketEvent from "@/hooks/use-socket-event";
import { toast } from "react-toastify";
import { getBadgeColor } from "@/lib";

const ITEMS_PER_PAGE = 4;

const TenantsTable = () => {
  const [tenantData, setTenantData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    currentPage,
    totalPages,
    paginatedData: currentData,
    pageNumbers,
    startEntry,
    endEntry,
    totalCount,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  } = usePagination(tenantData, ITEMS_PER_PAGE);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await superAdminApi.get("/tenants/top-performing");

      const mappedData =
        response?.tenantsData?.map((tenant) => ({
          tenantName: tenant.tenantName,
          imageUrl: tenant.imageUrl || null,
          planName: tenant.plan?.planName || "N/A",
          planColorKey: tenant.plan?.planName?.toLowerCase() || "",
          pricePerMonth: tenant.plan?.pricePerMonth || 0,
          totalBookings: tenant.totalBookings || 0,
          totalStaff: tenant.totalStaff || 0,
          totalSpent: tenant.totalSpent || 0,
        })) || [];

      setTenantData(mappedData);
    } catch (error) {
      toast.error(error?.message || "Failed to load data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useSocketEvent("plan-bought", fetchData);

  return (
    <div className="w-full px-6 py-2">
      <h2 className="text-xl font-semibold py-3 text-black/70">Top Tenants</h2>
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Tenant</TableHead>
            <TableHead className="text-left">Plan</TableHead>
            <TableHead className="text-left">Bookings</TableHead>
            <TableHead className="text-left">Staff</TableHead>
            <TableHead className="text-left">Price/Month</TableHead>
            <TableHead className="text-left">Total Spent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="py-20">
                <Loader2 className="animate-spin mx-auto" />
              </TableCell>
            </TableRow>
          ) : currentData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-lg text-muted-foreground py-20"
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            currentData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <UserCircle2Icon className="size-6" />

                    <span
                      className="font-medium truncate block"
                      title={row.tenantName}
                    >
                      {row.tenantName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize rounded-full",
                      getBadgeColor(row.planName)
                    )}
                  >
                    {row.planName}
                  </Badge>
                </TableCell>
                <TableCell>{row.totalBookings}</TableCell>
                <TableCell>{row.totalStaff}</TableCell>
                <TableCell>{`$ ${row.pricePerMonth}`}</TableCell>
                <TableCell>{`$ ${row.totalSpent}`}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

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
    </div>
  );
};

export default TenantsTable;
