import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import axios from "axios";

const ITEMS_PER_PAGE = 6;

const ReservationsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reservations, setReservations] = useState([]);
  const totalPages = Math.ceil(reservations.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("/api/locations/AB002L1/reservations");
        const formattedData = response.data.reservations.map((reservation) => ({
          customerName: reservation.customer.customerName,
          partySize: reservation.partySize,
          date: new Date(reservation.date).toLocaleDateString(),
          time: reservation.time,
          tableId: reservation.tableId,
          phone: reservation.customer.customerPhone,
        }));
        setReservations(formattedData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const currentData = reservations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    if (totalPages > maxVisiblePages) {
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("ellipsis");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("ellipsis");
        }
        pageNumbers.push(totalPages);
      }
    } else {
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="w-full bg-white rounded-2xl px-6 py-2">
      <h2 className="text-xl font-semibold py-3 text-black/70">Reservations</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Table</TableHead>
            <TableHead>Phone No</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            currentData.map((reservation, index) => (
              <TableRow key={index} className="border-0">
                <TableCell>{reservation.customerName}</TableCell>
                <TableCell>{reservation.partySize}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.time}</TableCell>
                <TableCell>{reservation.tableId}</TableCell>
                <TableCell>{reservation.phone}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between gap-4 py-4 pt-8 border-t">
        <Pagination className="justify-center sm:justify-end">
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                label=""
                className="bg-muted hover:bg-gray-200 cursor-pointer"
              />
            </PaginationItem>
            {getPageNumbers().map((pageNum, index) => (
              <PaginationItem key={index}>
                {pageNum === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNum)}
                    isActive={currentPage === pageNum}
                    className={cn(
                      "cursor-pointer bg-muted hover:bg-white",
                      currentPage === pageNum &&
                        "bg-violet text-white hover:bg-violet"
                    )}
                  >
                    {pageNum}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                label=""
                className="bg-muted hover:bg-gray-200 cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ReservationsTable;