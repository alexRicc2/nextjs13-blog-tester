import { parseISO, format } from 'date-fns'

export default function Date({ dateString, style={}}: {dateString: string, style?: object}) {
  const date = parseISO(dateString)
  return <time dateTime={dateString} style={style}>{format(date, 'LLLL	d, yyyy')}</time>
}