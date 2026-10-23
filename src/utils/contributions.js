export function validateContributions(data) {
  if (!Array.isArray(data?.contributions) || !data.contributions.length) throw new Error('Contribution data is unavailable')
  const days = data.contributions
  if (days.some(day => !/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isInteger(day.count) || day.count < 0 || !Number.isInteger(day.level) || day.level < 0 || day.level > 4)) throw new Error('Invalid contribution data')
  return [...days].sort((a, b) => a.date.localeCompare(b.date))
}

export function contributionSummary(days) {
  return {
    total: days.reduce((sum, day) => sum + day.count, 0),
    activeDays: days.filter(day => day.count > 0).length,
    bestDay: Math.max(0, ...days.map(day => day.count)),
  }
}
