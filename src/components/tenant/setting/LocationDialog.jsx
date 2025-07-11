import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import LocationForm from "./LocationForm";

const LocationDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  handleAddLocation,
  ...formProps
}) => (
  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogTrigger asChild>
      <Button
        onClick={handleAddLocation}
        className="flex items-center gap-2 cursor-pointer"
        disabled={formProps.isLoading}
      >
        <Plus size={18} className="mr-1" />
        Add New Location
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {formProps.editingLocation ? "Edit Location" : "Add Location"}
        </DialogTitle>
      </DialogHeader>
      <LocationForm {...formProps} />
    </DialogContent>
  </Dialog>
);

export default LocationDialog;
