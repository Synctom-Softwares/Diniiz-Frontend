import Layout from "@/components/common/Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  Search,
  TriangleAlert,
  Eye,
  EyeOff,
  UserRoundMinus,
  UserRoundPlus,
  Trash2,
} from "lucide-react";
import { useSelector } from "react-redux";
import { usePagination } from "@/hooks/usePagination";
import PaginationControls from "@/components/common/PaginationControls";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useCreateStaffMutation,
  useDeleteStaffMutation,
  useGetLocationsQuery,
  useGetTenantStaffQuery,
  useReactivateStaffMutation,
  useSuspendStaffMutation,
} from "@/store/services/tenantApi";
import { capitalize } from "@/lib";

const PAGE_SIZE = 8;

const initialForm = {
  name: "",
  password: "",
  locationId: "",
};

function StaffManage() {
  const {
    userData: { tenantId },
  } = useSelector((state) => state.auth);

  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showReactivateDialog, setShowReactivateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);

  const {
    data: staffList = [],
    isLoading,
    isError,
    refetch,
  } = useGetTenantStaffQuery(tenantId);

  const { data: locations } = useGetLocationsQuery(tenantId, {
    refetchOnFocus: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [createStaff, { isLoading: isAdding }] = useCreateStaffMutation();
  const [suspendStaff, { isLoading: isSuspending }] = useSuspendStaffMutation();
  const [reactivateStaff, { isLoading: isReactivating }] =
    useReactivateStaffMutation();
  const [deleteStaff, { isLoading: isDeleting }] = useDeleteStaffMutation();

  const handleStaffCreation = async (e) => {
    e.preventDefault();
    try {
      const response = await createStaff({ tenantId, staff: form }).unwrap();
      if (response?.success) {
        toast.success(response?.data?.message || "Staff added successfully.");
        setForm(initialForm);
        setShowDialog(false);
        refetch();
      } else {
        toast.error(response?.data?.message || "Failed to add staff.");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add staff.");
    }
  };

  const handleStaffSuspension = async () => {
    try {
      const result = await suspendStaff({
        tenantId,
        staffId: selectedStaff,
      }).unwrap();
      console.log("selectedStaff", selectedStaff);
      if (result?.success) {
        toast.success(result?.data?.message || "Staff suspended successfully.");
        setShowSuspendDialog(false);
        setSelectedStaff(null);
        refetch();
      } else {
        toast.error("Failed to suspend staff.");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to suspend staff.");
    }
  };

  const handleStaffReactivation = async (e) => {
    e.preventDefault();
    try {
      const result = await reactivateStaff({
        tenantId,
        staffId: selectedStaff.id,
      }).unwrap();
      if (result?.success) {
        toast.success(
          result?.data?.message || "Staff reactivated successfully."
        );
        setShowReactivateDialog(false);
        setSelectedStaff(null);
        refetch();
      } else {
        toast.error("Failed to reactivate staff.");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to reactivate staff.");
    }
  };

  const handleStaffDeletion = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteStaff({
        tenantId,
        staffId: selectedStaff.id,
      }).unwrap();
      if (result?.success) {
        toast.success(result?.data?.message || "Staff deleted successfully.");
        setShowDeleteDialog(false);
        setSelectedStaff(null);
        refetch();
      } else {
        toast.error("Failed to delete staff.");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete staff.");
    }
  };

  const handleDialogClose = () => {
    setForm(initialForm);
    setShowDialog(false);
  };

  const handleSuspendDialogOpen = (staff) => {
    setSelectedStaff(staff);
    setShowSuspendDialog(true);
  };

  const handleSuspendDialogClose = () => {
    setSelectedStaff(null);
    setShowSuspendDialog(false);
  };

  const handleReactivateDialogClose = () => {
    setSelectedStaff(null);
    setShowReactivateDialog(false);
  };

  const handleDeleteDialogClose = () => {
    setSelectedStaff(null);
    setShowDeleteDialog(false);
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const filteredStaff = useMemo(() => {
    return staffList.filter((staff) => {
      const roleMatch = selectedRole === "all" || staff.role === selectedRole;
      const statusMatch =
        selectedStatus === "all" ||
        staff.status.toLowerCase() === selectedStatus.toLowerCase();
      const searchMatch =
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.id.toLowerCase().includes(searchQuery.toLowerCase());
      return roleMatch && statusMatch && searchMatch;
    });
  }, [staffList, selectedRole, selectedStatus, searchQuery]);

  const {
    currentPage,
    totalPages,
    totalCount,
    paginatedData: paginatedStaff,
    pageNumbers,
    startEntry,
    endEntry,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  } = usePagination(filteredStaff, PAGE_SIZE);

  const handleRoleChange = (value) => {
    setSelectedRole(value);
    goToPage(1);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    goToPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    goToPage(1);
  };

  return (
    <Layout title="Staff Management">
      <div className="p-6 bg-white rounded-3xl space-y-8 h-full">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowDialog(true)}>Add Staff</Button>
            <Select value={selectedRole} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="location-admin">Location Admin</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspend">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative flex-1 max-w-2xs">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <Table>
          <TableRow>
            <TableHead>Staff ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="py-28">
                  <Loader2 className="animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-28 text-destructive font-semibold text-center"
                >
                  <TriangleAlert className="inline-block align-middle mr-2" />
                  <span>Error fetching staff data.</span>
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !isError && filteredStaff.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-28 text-muted-foreground font-semibold text-center text-lg"
                >
                  <span>No staff members found.</span>
                </TableCell>
              </TableRow>
            )}
            {paginatedStaff.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.id}</TableCell>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.location?.name || "N/A"}</TableCell>
                <TableCell>
                  <Badge
                    className={cn({
                      "bg-violet": staff.role == "staff",
                    })}
                  >
                    {capitalize(staff.role.replace("-", " ")) || "N/A"}
                  </Badge>
                </TableCell>
                <TableCell>{capitalize(staff.status)}</TableCell>
                <TableCell>
                  {staff.status === "suspend" ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="icon"
                          onClick={() => {
                            setSelectedStaff(staff);
                            setShowReactivateDialog(true);
                          }}
                          className="rounded-full hover:bg-green-500/10 cursor-pointer"
                        >
                          <UserRoundPlus className="text-green-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Reactivate</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="icon"
                          onClick={() => handleSuspendDialogOpen(staff.id)}
                          className="rounded-full hover:bg-red-500/10 cursor-pointer"
                        >
                          <UserRoundMinus className="text-red-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Suspend</TooltipContent>
                    </Tooltip>
                  )}

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="icon"
                        onClick={() => {
                          setSelectedStaff(staff);
                          setShowDeleteDialog(true);
                        }}
                        className="rounded-full hover:bg-destructive/10 cursor-pointer"
                      >
                        <Trash2 className="text-destructive" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Reactivate</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={showDialog} onOpenChange={handleDialogClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center text-black/70 mb-4">
                Add Staff
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleStaffCreation} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Staff Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoFocus
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative flex items-center bg-input-background rounded-lg border">
                  <Input
                    id="password"
                    name="password"
                    value={form.password}
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    required
                    className="border-none shadow-none"
                    autoComplete="off"
                  />
                  <Button
                    variant="icon"
                    tabIndex={-1}
                    onClick={togglePassword}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    type="button"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={form.locationId}
                  onValueChange={(value) =>
                    handleSelectChange("locationId", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations?.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isAdding}>
                  {isAdding ? "Adding..." : "Add Staff"}
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDialogClose}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          open={showSuspendDialog}
          onOpenChange={handleSuspendDialogClose}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center text-black/70 mb-4">
                Suspend Staff
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleStaffSuspension}>
              <div className="py-4">
                <p className="text-center">
                  Are you sure you want to suspend this staff member?
                </p>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  variant="destructive"
                  className="cursor-pointer"
                  disabled={isSuspending}
                >
                  {isSuspending ? "Suspending..." : "Suspend"}
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSuspendDialogClose}
                    disabled={isSuspending}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          open={showReactivateDialog}
          onOpenChange={handleReactivateDialogClose}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center text-black/70 mb-4">
                Reactivate Staff
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleStaffReactivation} className="space-y-4">
              <div className="text-center text-base text-black/80 mb-2">
                Are you sure you want to reactivate ?
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  variant="secondary"
                  className="bg-success hover:bg-success/90 text-white cursor-pointer"
                  disabled={isReactivating}
                >
                  {isReactivating ? "Reactivating..." : "Reactivate"}
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReactivateDialogClose}
                    disabled={isReactivating}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={showDeleteDialog} onOpenChange={handleDeleteDialogClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center text-black/70 mb-4">
                Delete Staff
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleStaffDeletion} className="space-y-4">
              <div className="text-center text-base text-black/80 mb-2">
                {selectedStaff ? (
                  <>
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                      {selectedStaff.firstName} {selectedStaff.lastName}
                    </span>
                    ?
                  </>
                ) : (
                  "No staff selected."
                )}
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  variant="secondary"
                  className="bg-destructive hover:bg-destructive/90 text-white cursor-pointer"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReactivateDialogClose}
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          startEntry={startEntry}
          endEntry={endEntry}
          pageNumbers={pageNumbers}
          onPageChange={goToPage}
          onNextPage={goToNextPage}
          onPreviousPage={goToPreviousPage}
        />
      </div>
    </Layout>
  );
}

export default StaffManage;
