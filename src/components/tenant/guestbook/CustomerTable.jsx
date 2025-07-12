import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationControls from "@/components/common/PaginationControls";
import { usePagination } from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";
import { getBadgeColor } from "@/lib";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FileText, TriangleAlert } from "lucide-react";

export function CustomerTable({
  customers,
  onCustomerSelect,
  restartPagination = false,
}) {
  const {
    currentPage,
    paginatedData: currentCustomers,
    totalPages,
    totalCount,
    startEntry,
    endEntry,
    pageNumbers,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    setPage,
  } = usePagination(customers, 8);

  useEffect(() => {
    if (restartPagination) {
      setPage(1);
    }
  }, [restartPagination, setPage]);

  

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg">
      <Table className="table-auto">
        <TableHeader>
          <TableRow className="*:text-muted-foreground">
            <TableHead>Customer Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Last Visited</TableHead>
            <TableHead>Customer Type</TableHead>
            <TableHead className="w-20"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCustomers.length == 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-20 text-lg text-muted-foreground"
              >
                No data to show
              </TableCell>
            </TableRow>
          )}
          {currentCustomers?.map((customer) => (
            <TableRow
              key={customer._id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onCustomerSelect(customer?._id)}
            >
              <TableCell className="py-4 border-muted">
                {customer.customerName}
              </TableCell>
              <TableCell className="py-4 border-muted">
                {customer.customerPhone}
              </TableCell>
              <TableCell className="py-4 border-muted">
                {customer.customerEmail}
              </TableCell>
              <TableCell>{customer.location?.locationName || "N/A"}</TableCell>
              <TableCell className="py-4 border-muted">
                {formatDate(customer.lastVisit)}
              </TableCell>
              <TableCell className="py-4 border-muted">
                <Badge
                  className={cn(
                    "capitalize",
                    getBadgeColor(customer.customerType)
                  )}
                >
                  {customer.customerType}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full p-2"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <FileText className="size-5 text-secondary-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{customer.notes || "No notes"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full p-2"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <TriangleAlert className="size-5 text-amber-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{customer.allergies || "No allergies"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
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
}
