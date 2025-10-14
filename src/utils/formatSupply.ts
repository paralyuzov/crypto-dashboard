export const formatSupply = (supply: number | null | undefined): string => {
  if (!supply) return 'N/A'
  return new Intl.NumberFormat('en-US').format(supply)
}
