import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import GithubActivity from './GithubActivity'
import { contributionSummary, validateContributions } from '../utils/contributions'

const days = [
  { date: '2026-10-18', count: 0, level: 0 },
  { date: '2026-10-19', count: 4, level: 2 },
  { date: '2026-10-20', count: 2, level: 1 },
]
afterEach(() => vi.unstubAllGlobals())

describe('GitHub activity', () => {
  it('shows a recoverable service error, then real returned data with keyboard navigation', async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(new Error('Offline')).mockResolvedValueOnce({ ok: true, json: async () => ({ contributions: days }) })
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(<GithubActivity />)
    expect(await screen.findByText('Activity is temporarily unavailable.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /View profile/ })).toHaveAttribute('href', 'https://github.com/varmakartik')
    await user.click(screen.getByRole('button', { name: 'Try again' }))
    const calendar = await screen.findByRole('group', { name: /Daily GitHub contributions/ })
    expect(within(calendar).getAllByRole('button')).toHaveLength(3)
    expect(screen.getByText('6', { selector: 'strong' })).toBeInTheDocument()
    const lastDay = within(calendar).getByRole('button', { name: /2 contributions on Oct 20/ })
    lastDay.focus()
    await user.keyboard('{ArrowUp}')
    expect(within(calendar).getByRole('button', { name: /4 contributions on Oct 19/ })).toHaveFocus()
    expect(fetchMock.mock.calls[0][0]).toContain('/varmakartik?y=last')
  })
  it('validates data and computes totals without invented activity', () => {
    expect(contributionSummary(validateContributions({ contributions: [...days].reverse() }))).toEqual({ total: 6, activeDays: 2, bestDay: 4 })
    expect(() => validateContributions({ contributions: [{ date: '2026-10-18', count: -1, level: 1 }] })).toThrow()
    expect(() => validateContributions({ error: 'Unavailable' })).toThrow()
  })
})
