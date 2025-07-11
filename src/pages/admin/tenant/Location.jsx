import React, { useState, useEffect, useRef } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import moment from "moment-timezone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Api from "@/config/api";
import { CustomTimePicker } from "@/components/tenant/setting/TimePicker";

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteLocationId, setDeleteLocationId] = useState(null);
  const [editingLocation, setEditingLocation] = useState(null);
  const [timezones, setTimezones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeFormat, setTimeFormat] = useState("24h"); // '12h' or '24h'

  // Ref for SMS template textarea to handle cursor position
  const smsTemplateRef = useRef(null);

  const {
    userData: { tenantId },
  } = useSelector((state) => state.auth);

  // Initialize API instance
  const locationApi = new Api(`/api/locations/all/tenants/${tenantId}`);
  const userApi = new Api("/api/users");

  const [formData, setFormData] = useState({
    locationName: "",
    address: "",
    timeZone: "",
    openingTime: "",
    closingTime: "",
    turnOverTime: 30,
    adminEmail: "",
    twilioNumber: "",
    smsTemplate: "",
    // Meal timings
    breakfastFrom: "",
    breakfastTo: "",
    lunchFrom: "",
    lunchTo: "",
    dinnerFrom: "",
    dinnerTo: "",
  });

  // For adminEmail validation
  const [adminEmailError, setAdminEmailError] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const debounceTimeout = useRef(null);

  // For meal timing validation
  const [mealTimingErrors, setMealTimingErrors] = useState({});

  // SMS Template variables
  const smsVariables = [
    { label: "Customer Name", value: "{{customer_name}}" },
    { label: "Reservation Date", value: "{{reservation_date}}" },
    { label: "Reservation Time", value: "{{reservation_time}}" },
    { label: "Party Size", value: "{{party_size}}" },
    { label: "Location Name", value: "{{location_name}}" },
    { label: "Location Address", value: "{{location_address}}" },
  ];

  // Helper function to convert time to 24h format for comparison
  const convertTo24Hour = (timeStr) => {
    if (!timeStr) return "";

    // If already in 24h format (HH:mm), return as is
    if (/^\d{2}:\d{2}$/.test(timeStr)) {
      return timeStr;
    }

    // If in 12h format, convert to 24h
    const time = moment(timeStr, ["h:mm A", "hh:mm A"]);
    return time.isValid() ? time.format("HH:mm") : timeStr;
  };

  // Helper function to format time for display based on selected format
  const formatTimeForDisplay = (timeStr) => {
    if (!timeStr) return "";

    const time24 = convertTo24Hour(timeStr);
    if (timeFormat === "12h") {
      const time = moment(time24, "HH:mm");
      return time.isValid() ? time.format("h:mm A") : timeStr;
    }
    return time24;
  };

  // Function to insert variable into SMS template at cursor position
  const insertSmsVariable = (variable) => {
    const textarea = smsTemplateRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = formData.smsTemplate;

    const newValue =
      currentValue.substring(0, start) + variable + currentValue.substring(end);

    setFormData((prev) => ({
      ...prev,
      smsTemplate: newValue,
    }));

    // Set cursor position after the inserted variable
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + variable.length,
        start + variable.length
      );
    }, 0);
  };

  // Fetch locations from API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        const response = await locationApi.get("");
        console.log(response);
        if (response && response.locations) {
          setLocations(response.locations);
        } else {
          setLocations([]);
        }
      } catch (err) {
        console.error("Failed to fetch locations:", err);
        setLocations([]);
        toast.error("Failed to fetch locations.");
      } finally {
        setIsLoading(false);
      }
    };

    if (tenantId) {
      fetchLocations();
    }
  }, [tenantId]);

  // Get timezones using moment-timezone
  useEffect(() => {
    const tzNames = moment.tz.names();
    const remainingTimezones = tzNames.map((tz) => {
      const offset = moment.tz(tz).format("Z");
      const abbreviation = moment.tz(tz).format("z");
      return {
        value: tz,
        label: `${tz.replace(/_/g, " ")} (${abbreviation} ${offset})`,
        offset: offset,
      };
    });
    setTimezones(remainingTimezones);
  }, []);

  // Debounced check for adminEmail
  useEffect(() => {
    if (!isDialogOpen) return;

    if (!formData.adminEmail) {
      setAdminEmailError("");
      setIsCheckingEmail(false);
      return;
    }

    setIsCheckingEmail(true);
    setAdminEmailError("");

    // Clear any previous debounce
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    // Debounce the API call
    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await userApi.get("/check", {
          email: formData.adminEmail,
        });

        if (!response) {
          setAdminEmailError("Error checking email. Please try again.");
        } else if (response.success === false) {
          setAdminEmailError(
            response.message || "Error checking email. Please try again."
          );
        } else if (response.success === true) {
          setAdminEmailError("Email Found"); // Email is present and valid
        } else {
          setAdminEmailError("Error checking email. Please try again.");
        }
      } catch (err) {
        console.error("Email check error:", err);
        setAdminEmailError("Error checking email. Please try again.");
      } finally {
        setIsCheckingEmail(false);
      }
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [formData.adminEmail, isDialogOpen]);

  // Validate meal timings for overlaps
  const validateMealTimings = () => {
    const errors = {};
    const timings = [];

    // Helper to compare time strings (convert to 24h format first)
    const isBefore = (a, b) => {
      const timeA = convertTo24Hour(a);
      const timeB = convertTo24Hour(b);
      return timeA < timeB;
    };

    // Collect all meal timings that have both from and to times
    if (formData.breakfastFrom && formData.breakfastTo) {
      timings.push({
        name: "Breakfast",
        from: convertTo24Hour(formData.breakfastFrom),
        to: convertTo24Hour(formData.breakfastTo),
      });
    }
    if (formData.lunchFrom && formData.lunchTo) {
      timings.push({
        name: "Lunch",
        from: convertTo24Hour(formData.lunchFrom),
        to: convertTo24Hour(formData.lunchTo),
      });
    }
    if (formData.dinnerFrom && formData.dinnerTo) {
      timings.push({
        name: "Dinner",
        from: convertTo24Hour(formData.dinnerFrom),
        to: convertTo24Hour(formData.dinnerTo),
      });
    }

    // Check if from time is before to time for each meal
    if (formData.breakfastFrom && formData.breakfastTo) {
      if (!isBefore(formData.breakfastFrom, formData.breakfastTo)) {
        errors.breakfast = "Breakfast start time must be before end time";
      }
    }
    if (formData.lunchFrom && formData.lunchTo) {
      if (!isBefore(formData.lunchFrom, formData.lunchTo)) {
        errors.lunch = "Lunch start time must be before end time";
      }
    }
    if (formData.dinnerFrom && formData.dinnerTo) {
      if (!isBefore(formData.dinnerFrom, formData.dinnerTo)) {
        errors.dinner = "Dinner start time must be before end time";
      }
    }

    // Check for overlaps between different meals
    for (let i = 0; i < timings.length; i++) {
      for (let j = i + 1; j < timings.length; j++) {
        const meal1 = timings[i];
        const meal2 = timings[j];

        // Check if timings overlap
        if (
          (meal1.from < meal2.to && meal1.to > meal2.from) ||
          (meal2.from < meal1.to && meal2.to > meal1.from)
        ) {
          const errorMsg = `${meal1.name} and ${meal2.name} timings overlap`;
          errors[meal1.name.toLowerCase()] = errorMsg;
          errors[meal2.name.toLowerCase()] = errorMsg;
        }
      }
    }

    // Check if meal times are within opening and closing times
    const opening = convertTo24Hour(formData.openingTime);
    const closing = convertTo24Hour(formData.closingTime);
    if (opening && closing) {
      // For each meal, check from and to are within opening/closing
      if (
        formData.breakfastFrom &&
        (convertTo24Hour(formData.breakfastFrom) < opening ||
          convertTo24Hour(formData.breakfastFrom) > closing)
      ) {
        errors.breakfast =
          "Breakfast start time must be within opening and closing hours";
      }
      if (
        formData.breakfastTo &&
        (convertTo24Hour(formData.breakfastTo) < opening ||
          convertTo24Hour(formData.breakfastTo) > closing)
      ) {
        errors.breakfast =
          "Breakfast end time must be within opening and closing hours";
      }
      if (
        formData.lunchFrom &&
        (convertTo24Hour(formData.lunchFrom) < opening ||
          convertTo24Hour(formData.lunchFrom) > closing)
      ) {
        errors.lunch =
          "Lunch start time must be within opening and closing hours";
      }
      if (
        formData.lunchTo &&
        (convertTo24Hour(formData.lunchTo) < opening ||
          convertTo24Hour(formData.lunchTo) > closing)
      ) {
        errors.lunch =
          "Lunch end time must be within opening and closing hours";
      }
      if (
        formData.dinnerFrom &&
        (convertTo24Hour(formData.dinnerFrom) < opening ||
          convertTo24Hour(formData.dinnerFrom) > closing)
      ) {
        errors.dinner =
          "Dinner start time must be within opening and closing hours";
      }
      if (
        formData.dinnerTo &&
        (convertTo24Hour(formData.dinnerTo) < opening ||
          convertTo24Hour(formData.dinnerTo) > closing)
      ) {
        errors.dinner =
          "Dinner end time must be within opening and closing hours";
      }
    }

    setMealTimingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate meal timings whenever relevant form data changes
  useEffect(() => {
    if (isDialogOpen) {
      validateMealTimings();
    }
  }, [
    formData.breakfastFrom,
    formData.breakfastTo,
    formData.lunchFrom,
    formData.lunchTo,
    formData.dinnerFrom,
    formData.dinnerTo,
    formData.openingTime,
    formData.closingTime,
    isDialogOpen,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "adminEmail") {
      setAdminEmailError("");
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeChange = (name, value) => {
    // Convert time to 24h format for storage
    const time24h = value ? convertTo24Hour(value) : "";
    setFormData((prev) => ({
      ...prev,
      [name]: time24h,
    }));
  };

  const handleAddLocation = () => {
    setEditingLocation(null);
    setFormData({
      locationName: "",
      address: "",
      timeZone: "",
      openingTime: "",
      closingTime: "",
      turnOverTime: 30,
      adminEmail: "",
      smsTemplate: "",
      breakfastFrom: "",
      breakfastTo: "",
      lunchFrom: "",
      lunchTo: "",
      dinnerFrom: "",
      dinnerTo: "",
    });
    setAdminEmailError("");
    setMealTimingErrors({});
    setTimeFormat("24h"); // Reset to default format
    setIsDialogOpen(true);
  };

  const handleEditLocation = (location) => {
    setEditingLocation(location);
    setFormData({
      locationName: location.locationName || "",
      address: location.address || "",
      timeZone: location.timeZone || location.timezone || "",
      openingTime: location.openingTime || "",
      closingTime: location.closingTime || "",
      turnOverTime: location.turnOverTime || 30,
      adminEmail: location.adminEmail || "",
      smsTemplate: location.smsTemplate || "",
      breakfastFrom: location.breakfastFrom || "",
      breakfastTo: location.breakfastTo || "",
      lunchFrom: location.lunchFrom || "",
      lunchTo: location.lunchTo || "",
      dinnerFrom: location.dinnerFrom || "",
      dinnerTo: location.dinnerTo || "",
    });
    setAdminEmailError("");
    setMealTimingErrors({});
    setTimeFormat("24h"); // Reset to default format
    setIsDialogOpen(true);
  };

  const handleDeleteLocation = (id) => {
    setDeleteLocationId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteLocationId) return;

    try {
      setIsLoading(true);
      const deleteApi = new Api(`/api/tenants/${tenantId}/locations`);
      await deleteApi.delete("", deleteLocationId);
      setLocations((prev) =>
        prev.filter((location) => location._id !== deleteLocationId)
      );
      toast.success("Location deleted successfully.");
    } catch (err) {
      console.error("Delete error:", err);
      // Still remove from UI if backend fails
      setLocations((prev) =>
        prev.filter((location) => location._id !== deleteLocationId)
      );
      toast.error("Failed to delete location from backend, removed locally.");
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setDeleteLocationId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only validate adminEmail for new location
    if (!editingLocation) {
      if (
        !formData.adminEmail ||
        (adminEmailError && adminEmailError !== "Email Found")
      ) {
        setAdminEmailError(
          adminEmailError || "Admin email is required and must be valid."
        );
        toast.error("Admin email is required and must be valid.");
        return;
      }
    }

    // Validate meal timings
    if (!validateMealTimings()) {
      toast.error("Please fix meal timing errors before submitting.");
      return;
    }

    // Ensure all times are in 24h format for backend
    const payload = {
      locationName: formData.locationName,
      address: formData.address,
      openingTime: convertTo24Hour(formData.openingTime),
      closingTime: convertTo24Hour(formData.closingTime),
      timeZone: formData.timeZone,
      turnOverTime: Number(formData.turnOverTime),
      adminEmail: formData.adminEmail,
      smsTemplate: formData.smsTemplate,
      breakfastFrom: convertTo24Hour(formData.breakfastFrom),
      breakfastTo: convertTo24Hour(formData.breakfastTo),
      lunchFrom: convertTo24Hour(formData.lunchFrom),
      lunchTo: convertTo24Hour(formData.lunchTo),
      dinnerFrom: convertTo24Hour(formData.dinnerFrom),
      dinnerTo: convertTo24Hour(formData.dinnerTo),
    };

    try {
      setIsLoading(true);

      if (editingLocation) {
        const updateApi = new Api(`/api/locations/`);

        await updateApi.put(`${editingLocation._id}`, "", payload);
        setLocations((prev) =>
          prev.map((location) =>
            location._id === editingLocation._id
              ? {
                  ...location,
                  ...payload,
                  smsTemplate: formData.smsTemplate,
                }
              : location
          )
        );
        toast.success("Location updated successfully.");
      } else {
        // Create new location
        const response = await locationApi.post("", payload);
        console.log(response);
        const newLocation = response?.location || {
          ...payload,
          tenantId,
        };

        setLocations((prev) => [...prev, newLocation]);
        toast.success("Location added successfully.");
      }
    } catch (err) {
      console.error("Submit error:", err);

      if (editingLocation) {
        // Still update UI for edit
        setLocations((prev) =>
          prev.map((location) =>
            location._id === editingLocation._id
              ? {
                  ...location,
                  ...payload,
                  smsTemplate: formData.smsTemplate,
                  updatedAt: new Date().toISOString(),
                }
              : location
          )
        );
        toast.error("Failed to update location in backend, updated locally.");
      } else {
        toast.error("Failed to add location.");
      }
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
      setEditingLocation(null);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingLocation(null);
    setAdminEmailError("");
    setMealTimingErrors({});
    setTimeFormat("24h"); // Reset format on close
  };

  // Helper function to format timezone display
  const formatTimezoneDisplay = (timezone) => {
    if (!timezone) return "";
    const offset = moment.tz(timezone).format("Z");
    const abbreviation = moment.tz(timezone).format("z");
    return `${timezone.replace(/_/g, " ")} (${abbreviation} ${offset})`;
  };

  return (
    <div className="w-full px-2 md:px-6 py-2">
      <h1 className="pb-6 pt-3 text-center text-2xl font-bold text-black/70">
        Location
      </h1>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-x-4">
          <div className="flex justify-between items-center w-full">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleAddLocation}
                  className="flex items-center gap-2 cursor-pointer"
                  disabled={isLoading}
                >
                  <Plus size={18} className="mr-1" />
                  Add New Location
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingLocation ? "Edit Location" : "Add Location"}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Time Format Selection */}
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <Label className="text-base font-semibold">
                      Time Format
                    </Label>
                    <RadioGroup
                      value={timeFormat}
                      onValueChange={setTimeFormat}
                      className="flex gap-6"
                      disabled={isLoading}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="12h"
                          id="12h"
                          disabled={isLoading}
                        />
                        <Label htmlFor="12h">12 Hour (AM/PM)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="24h"
                          id="24h"
                          disabled={isLoading}
                        />
                        <Label htmlFor="24h">24 Hour</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Location Name */}
                  <div className="space-y-2">
                    <Label htmlFor="locationName">Name</Label>
                    <Input
                      id="locationName"
                      name="locationName"
                      value={formData.locationName}
                      onChange={handleInputChange}
                      placeholder="Enter location name"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter full address"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Admin Email */}
                  {!editingLocation && (
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Admin Email</Label>
                      <Input
                        id="adminEmail"
                        name="adminEmail"
                        type="email"
                        value={formData.adminEmail}
                        onChange={handleInputChange}
                        placeholder="Enter admin email"
                        required
                        autoComplete="off"
                        disabled={isLoading}
                      />
                      {isCheckingEmail && (
                        <div className="text-xs text-muted-foreground">
                          Checking email...
                        </div>
                      )}
                      {adminEmailError && (
                        <div
                          className={`text-xs ${
                            adminEmailError === "Email Found"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {adminEmailError}
                        </div>
                      )}
                    </div>
                  )}

                  {/* SMS Template with Variable Tags */}
                  <div className="space-y-3">
                    <Label htmlFor="smsTemplate">SMS Template</Label>
                    <Textarea
                      ref={smsTemplateRef}
                      id="smsTemplate"
                      name="smsTemplate"
                      value={formData.smsTemplate}
                      onChange={handleInputChange}
                      placeholder="Enter SMS template for this location."
                      rows={4}
                      required
                      disabled={isLoading}
                      className="resize-none"
                    />

                    {/* Add Fields Label */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Plus size={16} />
                      <span className="font-medium">Add Fields</span>
                    </div>

                    {/* Variable Tags - now rounded and white bg */}
                    <div className="flex flex-wrap gap-2">
                      {smsVariables.map((variable, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => insertSmsVariable(variable.value)}
                          disabled={isLoading}
                          className="h-8 px-3 py-1 text-xs font-medium rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm hover:bg-gray-100 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
                          tabIndex={0}
                        >
                          {variable.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Zone */}
                  <div className="space-y-2">
                    <Label htmlFor="timeZone">Time Zone</Label>
                    <Select
                      value={formData.timeZone}
                      onValueChange={(value) =>
                        handleSelectChange("timeZone", value)
                      }
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Time Zone" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {timezones.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Opening and Closing Hours */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomTimePicker
                      label="Opening Hours"
                      value={formatTimeForDisplay(formData.openingTime)}
                      onChange={(value) =>
                        handleTimeChange("openingTime", value)
                      }
                      format={timeFormat}
                      required
                      disabled={isLoading}
                    />

                    <CustomTimePicker
                      label="Closing Hours"
                      value={formatTimeForDisplay(formData.closingTime)}
                      onChange={(value) =>
                        handleTimeChange("closingTime", value)
                      }
                      format={timeFormat}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Meal Timings Section */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">
                      Meal Timings (Optional)
                    </Label>

                    {/* Breakfast Timing */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Breakfast</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomTimePicker
                          label="From"
                          value={formatTimeForDisplay(formData.breakfastFrom)}
                          onChange={(value) =>
                            handleTimeChange("breakfastFrom", value)
                          }
                          format={timeFormat}
                          disabled={isLoading}
                        />
                        <CustomTimePicker
                          label="To"
                          value={formatTimeForDisplay(formData.breakfastTo)}
                          onChange={(value) =>
                            handleTimeChange("breakfastTo", value)
                          }
                          format={timeFormat}
                          disabled={isLoading}
                        />
                      </div>
                      {mealTimingErrors.breakfast && (
                        <div className="text-xs text-red-500">
                          {mealTimingErrors.breakfast}
                        </div>
                      )}
                    </div>

                    {/* Lunch Timing */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Lunch</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomTimePicker
                          label="From"
                          value={formatTimeForDisplay(formData.lunchFrom)}
                          onChange={(value) =>
                            handleTimeChange("lunchFrom", value)
                          }
                          format={timeFormat}
                          disabled={isLoading}
                        />
                        <CustomTimePicker
                          label="To"
                          value={formatTimeForDisplay(formData.lunchTo)}
                          onChange={(value) =>
                            handleTimeChange("lunchTo", value)
                          }
                          format={timeFormat}
                          disabled={isLoading}
                        />
                      </div>
                      {mealTimingErrors.lunch && (
                        <div className="text-xs text-red-500">
                          {mealTimingErrors.lunch}
                        </div>
                      )}
                    </div>

                    {/* Dinner Timing */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Dinner</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomTimePicker
                          label="From"
                          value={formatTimeForDisplay(formData.dinnerFrom)}
                          onChange={(value) =>
                            handleTimeChange("dinnerFrom", value)
                          }
                          format={timeFormat}
                          disabled={isLoading}
                        />
                        <CustomTimePicker
                          label="To"
                          value={formatTimeForDisplay(formData.dinnerTo)}
                          onChange={(value) =>
                            handleTimeChange("dinnerTo", value)
                          }
                          format={timeFormat}
                          disabled={isLoading}
                        />
                      </div>
                      {mealTimingErrors.dinner && (
                        <div className="text-xs text-red-500">
                          {mealTimingErrors.dinner}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Turn Over */}
                  <div className="space-y-3">
                    <Label>Turn Over</Label>
                    <RadioGroup
                      value={String(formData.turnOverTime)}
                      onValueChange={(value) =>
                        handleSelectChange("turnOverTime", value)
                      }
                      className="flex flex-wrap gap-6"
                      disabled={isLoading}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="30"
                          id="30"
                          disabled={isLoading}
                        />
                        <Label htmlFor="30">30 minutes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="60"
                          id="60"
                          disabled={isLoading}
                        />
                        <Label htmlFor="60">60 minutes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="90"
                          id="90"
                          disabled={isLoading}
                        />
                        <Label htmlFor="90">90 minutes</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Dialog Actions */}
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCloseDialog}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        isLoading ||
                        (adminEmailError &&
                          adminEmailError !== "Email Found") ||
                        isCheckingEmail ||
                        Object.keys(mealTimingErrors).length > 0
                      }
                    >
                      {isLoading
                        ? "Processing..."
                        : editingLocation
                        ? "Update Location"
                        : "Add Location"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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
                        {location.openingTime
                          ? moment(location.openingTime, "HH:mm").format(
                              "h:mm A"
                            )
                          : location.openingTime}
                      </TableCell>
                      <TableCell>
                        {location.closingTime
                          ? moment(location.closingTime, "HH:mm").format(
                              "h:mm A"
                            )
                          : location.closingTime}
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
};

export default Location;
