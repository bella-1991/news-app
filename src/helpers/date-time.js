const dateFormats = {
  'DD/MM/YYYY': {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  },
  YYYY: {
    year: 'numeric',
  },
  'MMM D, YYYY': {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  'MMM YYYY': {
    year: 'numeric',
    month: 'long',
  },
};

export function formatDate(date, format, separator = '/', market = 'en-GB') {
  if (!date) return null;
  const standardisedDate = new Date(date);
  const formattedDate = Intl.DateTimeFormat(market, dateFormats[format]).format(standardisedDate);

  if (separator !== '/') {
    return formattedDate.replace(/\//g, separator);
  }
  return formattedDate;
}
