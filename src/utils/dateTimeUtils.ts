import moment from 'moment'

export const dateTimeUtils = {
  timestampToFormattedDateTime,
  timestampToFormattedDate,
  getLastAvailable,
}

function timestampToFormattedDateTime(date: number | null) {
  return date ? moment.unix(date).format('MMM. D, YYYY [at] h:mm A') : null
}

function timestampToFormattedDate(date: number | null) {
  return date ? moment.unix(date).format('MMM DD, YYYY') : null
}

function getLastAvailable(date: number | null) {
  return date ? moment.unix(date).fromNow() : null
}
