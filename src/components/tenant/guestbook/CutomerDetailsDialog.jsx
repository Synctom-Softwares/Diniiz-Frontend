import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, TriangleAlert } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { getBadgeColor } from "@/lib";
import tenantApi from "@/config/tenantApi";
import { toast } from "react-toastify";

export function CustomerDetailsDialog({
  customer,
  open,
  onOpenChange,
  updateCustomers,
  customers,
}) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerType: "",
    allergies: "",
    customerZipCode: "",
  });

  const {
    userData: { locationId, tenantId },
  } = useSelector((state) => state.auth);

  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ total: 0, noShow: 0, cancelled: 0 });

  useEffect(() => {
    async function fetchCustomerDetails() {
      if (!customer) return;
      try {
        const res = await tenantApi.get(`/${tenantId}/customers/${customer}`);
        if (res.success) {
          const c = res.customer;
          setFormData({
            customerName: c.customerName || "",
            customerEmail: c.customerEmail || "",
            customerPhone: c.customerPhone || "",
            customerType: c.customerType || "",
            allergies: c.allergies || "",
            customerZipCode: c.customerZipCode || "",
          });
          setHistory(res.reservationsHistory || []);
          setStats(
            res.reservationDetails || { total: 0, noShow: 0, cancelled: 0 }
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchCustomerDetails();
  }, [customer, locationId, tenantId]);

  if (!customer) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateDetails = async () => {
    try {
      const updateData = {
        customerPhone: formData.customerPhone,
        customerType: formData.customerType,
      };

      if (!formData.customerPhone || !formData.customerType) {
        toast.error("Phone number cannot be blank.");
        onOpenChange(false);
        return;
      }

      await tenantApi.put(`/${tenantId}/customers/${customer}`, "", updateData);

      // for optimistic update
      updateCustomers(
        customers.map((c) => (c._id === customer ? { ...c, ...updateData } : c))
      );
    } catch (err) {
      toast.error(err?.message || "Failed to update");
      updateCustomers(customers);
    }
    onOpenChange(false);
  };

  const downloadCSV = () => {
    const headers = ["Date", "Time", "Party Size", "Status"];
    const csvContent = [
      headers.join(","),
      ...history.map((record) =>
        [
          new Date(record.date).toLocaleDateString(),
          record.time,
          record.partySize,
          record.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `customer_history_${
      formData.customerName || "unknown"
    }.csv`;
    link.click();
    link.remove();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-8">
          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold mb-2">{stats.total}</div>
              <div className="text-sm font-medium">Total Reservations</div>
            </div>
            <div className="text-center p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold mb-2">{stats.noShow}</div>
              <div className="text-sm font-medium">Total No-Shows</div>
            </div>
            <div className="text-center p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold mb-2">{stats.cancelled}</div>
              <div className="text-sm font-medium">Total Cancellation</div>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-6 rounded-lg ">
            <div>
              <Label htmlFor="customerPhone" className="text-sm font-medium">
                Phone No.
              </Label>
              <Input
                id="customerPhone"
                value={formData.customerPhone}
                onChange={(e) =>
                  handleInputChange("customerPhone", e.target.value)
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="customerType" className="text-sm font-medium">
                Tag
              </Label>
              <Select
                value={formData.customerType}
                onValueChange={(value) =>
                  handleInputChange("customerType", value)
                }
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="returning">Returning</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="well-spent">Well Spent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button size="sm" className="w-full" onClick={handleUpdateDetails}>
              Update Details
            </Button>

            {/* History Section */}
            <h3 className="text-xl font-semibold mb-4">History</h3>
            <div className="rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Time</TableHead>
                    <TableHead className="font-semibold">Party Size</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.length == 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="py-8 text-center text-muted-foreground"
                      >
                        No previous reservations
                      </TableCell>
                    </TableRow>
                  )}
                  {history.map((record, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell>
                        {new Date(record.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{record.time}</TableCell>
                      <TableCell>{record.partySize}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "capitalize",
                            getBadgeColor(record.status)
                          )}
                        >
                          {record.status}
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
                                  <FileText className="size-5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{formData.notes || "No notes"}</p>
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
                                  <TriangleAlert className="size-5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{formData.allergies || "No allergies"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              onClick={downloadCSV}
              variant="outline"
              className="rounded-full"
              disabled
            >
              Download CSV
            </Button>
            <Button className="rounded-full" disabled>
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
