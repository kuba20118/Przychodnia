import { format } from "date-fns";

export default (date: Date) => format(date, `yyyy-MM-dd'T'HH:mm:ss`);
