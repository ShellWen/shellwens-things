import { describe, expect, it } from 'vitest'

import { getGitRevision } from '../git-revision.js'

const hash = '1234567890abcdef1234567890abcdef12345678'

describe('Git revision', () => {
  it('adds the optional dirty suffix', () => {
    expect(getGitRevision({ GITHUB_SHA: hash, COMMIT_DIRTY: 'true' })).toBe('12345678.dirty')
    expect(getGitRevision({ GITHUB_SHA: hash, COMMIT_DIRTY: 'true', SHOW_COMMIT_DIRTY: 'false' })).toBe('12345678')
  })
})
