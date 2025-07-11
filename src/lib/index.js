
export function capitalize(str) {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

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