export const formatPercentage = (percentage: number | undefined): { value: string; color: string } => {
  if (percentage === undefined || percentage === null) {
    return { value: 'N/A', color: 'default' }
  }
  const formattedValue = `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`
  const color = percentage >= 0 ? 'success' : 'error'
  return { value: formattedValue, color }
}

export const formatPercentageValue = (
  percentage: number | undefined | null,
  decimals: number = 2,
): number => {
  if (percentage === undefined || percentage === null || isNaN(percentage)) {
    return 0
  }
  return Number(percentage.toFixed(decimals))
}


export const formatPercentageString = (
  percentage: number | undefined | null,
  decimals: number = 2,
): string => {
  if (percentage === undefined || percentage === null || isNaN(percentage)) {
    return 'N/A'
  }
  return percentage.toFixed(decimals)
}
