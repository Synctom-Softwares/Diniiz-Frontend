import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LocationDialog from "./LocationDialog";

const LocationList = ({
  locations,
  isLoading,
  isDialogOpen,
  setIsDialogOpen,
  handleAddLocation,
  handleEditLocation,
  handleDeleteLocation,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  confirmDelete,
  formatTimezoneDisplay,
}) => (
  <div className="w-full px-2 md:px-6 py-2">
    <h1 className="pb-6 pt-3 text-center text-2xl font-bold text-black/70">
      Location
    </h1>
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-x-4">
        <div className="flex justify-between items-center w-full">
          <LocationDialog
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleAddLocation={handleAddLocation}
          />
        </div>
      </CardHeader>
      <CardTitle className="text-start px-2 md:px-6 text-2xl">
        Location List
      </CardTitle>
      <CardContent>
        {isLoading && !isDialogOpen && (
          <div className="flex justify-center items-center py-8">
            <svg
              className="animate-spin h-8 w-8 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        )}
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[700px] w-full">
            <TableHeader>
              <TableRow className="*:text-start">
                <TableHead className="min-w-[100px] md:w-[200px]">
                  Twilio Number
                </TableHead>
                <TableHead className="min-w-[160px] md:w-[200px]">
                  Location Name
                </TableHead>
                <TableHead className="min-w-[150px] md:w-[250px]">
                  Address
                </TableHead>
                <TableHead className="min-w-[120px] md:w-[150px]">
                  Time Zone
                </TableHead>
                <TableHead className="min-w-[120px] md:w-[150px]">
                  Opening Hours
                </TableHead>
                <TableHead className="min-w-[120px] md:w-[150px]">
                  Closing Hours
                </TableHead>
                <TableHead className="min-w-[80px] md:w-[100px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="*:text-start">
              {locations.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No locations found. Add your first location to get
                    started.
                  </TableCell>
                </TableRow>
              ) : (
                locations.map((location) => (
                  <TableRow key={location._id}>
                    <TableCell className="font-medium">
                      {location.twilioNumber || "N/A"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {location.locationName}
                    </TableCell>
                    <TableCell>{location.address}</TableCell>
                    <TableCell>
                      {formatTimezoneDisplay(
                        location.timeZone || location.timezone
                      )}
                    </TableCell>
                    <TableCell>
                      {location.openingTime}
                    </TableCell>
                    <TableCell>
                      {location.closingTime}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditLocation(location)}
                          className="h-8 w-8 p-0"
                          disabled={isLoading}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteLocation(location._id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          disabled={isLoading}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {/* Delete Confirmation Dialog */}
        <Dialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Location</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>
                Are you sure you want to delete this location? This action
                cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={confirmDelete}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  </div>
);

export default LocationList;
