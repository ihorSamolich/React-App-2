export function dateConvert(dateString: Date) {
  const date = new Date(dateString.toString());

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}
