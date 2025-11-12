import { formatDistanceToNow, parseISO } from "date-fns";

const formatDateDsitance = (date: string) => {
  return formatDistanceToNow(parseISO(date), {
    addSuffix: true,
  });
};

export default formatDateDsitance;
