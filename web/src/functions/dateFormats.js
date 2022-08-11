import { format } from 'date-fns'

export const formatTime = (date) => format(new Date(date), 'HH:mm')
export const julian = (date) => format(new Date(date), 'yyDDD')
export const longFormat = (date) => format(new Date(date), 'MMMM dd, yyyy')
