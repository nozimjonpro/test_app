export function getMonthBoundaryDate(type: "start" | "end"): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const date =
    type === "start" ? new Date(year, month, 1) : new Date(year, month + 1, 0); // 0th day of next month = last day of current

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}
