export const formatLargeNumber = (num: number): string => {
  const trillion = 1e12
  const billion = 1e9
  const million = 1e6
  const thousand = 1e3

  if (num >= trillion) {
    return (num / trillion).toFixed(2) + 'T'
  } else if (num >= billion) {
    return (num / billion).toFixed(2) + 'B'
  } else if (num >= million) {
    return (num / million).toFixed(2) + 'M'
  } else if (num >= thousand) {
    return (num / thousand).toFixed(2) + 'K'
  } else {
    return new Intl.NumberFormat('en-US').format(num)
  }
}
