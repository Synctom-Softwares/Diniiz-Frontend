export function parseStaffId(id) {
  if (!id) return { staffId: "", name: "" };
  const lastDash = id.lastIndexOf("-");
  if (lastDash === -1) return { staffId: id, name: "" };
  const staffId = id.slice(0, lastDash);
  const afterDash = id.slice(lastDash + 1);
  if (afterDash.includes("@")) {
    return { staffId, name: afterDash.split("@")[0] };
  } else {
    return { staffId, name: afterDash };
  }
}

export const getBadgeColor = (value) => {
  if (!value) return "bg-gray-100 text-gray-800";

  const lowerValue = value.toLowerCase();

  const PLAN_COLORS = {
    pro: "text-[#2196F3] border-[#2196F3]",
    enterprise: "text-[#9C27B0] border-[#9C27B0]",
    premium: "text-[#FFC107] border-[#FFC107]",
    starter: "text-[#4CAF50] border-[#4CAF50]",
  };

  if(PLAN_COLORS[lowerValue]) return PLAN_COLORS[lowerValue]

  if (['active', 'success', 'approved', 'completed', 'reserved', 'vip'].includes(lowerValue)) {
    return "bg-green-100 text-green-800";
  } else if (['inactive', 'pending', 'waiting', 'returning'].includes(lowerValue)) {
    return "bg-yellow-100 text-yellow-800";
  } else if (['suspended', 'failed', 'error', 'rejected', 'cancelled'].includes(lowerValue)) {
    return "bg-red-100 text-red-800";
  } else if (['processing', 'progress', 'walk-in', 'new'].includes(lowerValue)) {
    return "bg-blue-100 text-blue-800";
  } else if (['well-spender'].includes(lowerValue)) {
    return "bg-orange-100 text-orange-800";
  } else {
    return "bg-gray-100 text-gray-800";
  }
};