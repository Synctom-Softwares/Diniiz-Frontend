import React from "react";
import { Label } from "@/components/ui/label";
import { CustomTimePicker } from "@/components/time-picker";

const MealTimingsSection = ({
  formData,
  formatTimeForDisplay,
  handleTimeChange,
  mealTimingErrors,
  isLoading,
}) => (
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
          onChange={(value) => handleTimeChange("breakfastFrom", value)}
          format={formData.timeFormat}
          disabled={isLoading}
        />
        <CustomTimePicker
          label="To"
          value={formatTimeForDisplay(formData.breakfastTo)}
          onChange={(value) => handleTimeChange("breakfastTo", value)}
          format={formData.timeFormat}
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
          onChange={(value) => handleTimeChange("lunchFrom", value)}
          format={formData.timeFormat}
          disabled={isLoading}
        />
        <CustomTimePicker
          label="To"
          value={formatTimeForDisplay(formData.lunchTo)}
          onChange={(value) => handleTimeChange("lunchTo", value)}
          format={formData.timeFormat}
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
          onChange={(value) => handleTimeChange("dinnerFrom", value)}
          format={formData.timeFormat}
          disabled={isLoading}
        />
        <CustomTimePicker
          label="To"
          value={formatTimeForDisplay(formData.dinnerTo)}
          onChange={(value) => handleTimeChange("dinnerTo", value)}
          format={formData.timeFormat}
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
);

export default MealTimingsSection;
