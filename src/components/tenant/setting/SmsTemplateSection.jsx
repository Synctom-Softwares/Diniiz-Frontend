import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

const SmsTemplateSection = ({
  smsTemplateRef,
  formData,
  handleInputChange,
  smsVariables,
  insertSmsVariable,
  isLoading,
}) => (
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
    {/* Variable Tags */}
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
);

export default SmsTemplateSection;
