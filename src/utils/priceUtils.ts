export const getPriceRangeText = (priceRange: string): string => {
  const priceMap: { [key: string]: string } = {
    '$': 'Free',
    '$$': '$0-25',
    '$$$': '$25-50',
    '$$$$': '$50-100',
    '$$$$$': '$100+'
  }
  return priceMap[priceRange] || priceRange
}

export const getPriceRangeLabel = (priceRange: string): string => {
  const priceMap: { [key: string]: string } = {
    'Free': 'Free',
    '$': '$ ($0-25)',
    '$$': '$$ ($25-50)',
    '$$$': '$$$ ($50-100)',
    '$$$$': '$$$$ ($100+)'
  }
  return priceMap[priceRange] || priceRange
}

export const getTicketText = (requiresTicket: boolean): string => {
  return requiresTicket ? 'Tickets Required' : 'No Tickets Needed'
}

export const getTicketClass = (requiresTicket: boolean): string => {
  return requiresTicket
    ? 'bg-sky-100 text-sky-700'
    : 'bg-green-100 text-green-700'
} 