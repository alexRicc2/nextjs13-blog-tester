import { format } from "date-fns";
export const ConvertDateToNumber = (date: string) => {
  if(!date) return ""
  const dateObject = new Date(date);
  return format(dateObject, "MM.dd.yy");
};
export const ConvertDate = (date: string) => {
  if(!date) return ""
  const dateObject = new Date(date);
  return format(dateObject, "PP");
};
