import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export function SearchAndFilters({
  searchTerm,
  onSearchChange,
  clientTypeFilter,
  onClientTypeChange,
  lastVisitFilter,
  onLastVisitChange,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-2">
        <Select value={clientTypeFilter} onValueChange={onClientTypeChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Client Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Filter by Client Type</SelectItem>
            <SelectItem value="returning">Returning</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
          </SelectContent>
        </Select>

        <Select value={lastVisitFilter} onValueChange={onLastVisitChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Last Visit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Filter by Last Visit</SelectItem>
            <SelectItem value="recent">Recent (Last 30 days)</SelectItem>
            <SelectItem value="old">Older than 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative flex-1 max-w-2xs">
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
    </div>
  );
}
