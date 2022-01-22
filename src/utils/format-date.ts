import { parseISO, format } from "date-fns"

export const formatDate = (dateISOString: string) =>
  format(parseISO(dateISOString), "yyyy/MM/dd")
