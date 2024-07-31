import { format } from "date-fns"

export const formatDate = (date: Date) => {

  const dateFormatted = format(date, 'dd/MM/yyyy')
  return dateFormatted
}