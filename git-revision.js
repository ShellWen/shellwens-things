import { execFileSync } from 'node:child_process'

const git = (args) => {
  try {
    return execFileSync('git', args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    return ''
  }
}

export const getGitRevision = (env = process.env) => {
  const hash = (env.CF_PAGES_COMMIT_SHA ?? env.GITHUB_SHA ?? env.COMMIT_SHA ?? git(['rev-parse', 'HEAD'])).trim()
  if (!hash) return ''

  const showDirty = env.SHOW_COMMIT_DIRTY !== 'false'
  const dirty =
    showDirty &&
    (env.COMMIT_DIRTY === 'true' || (env.COMMIT_DIRTY !== 'false' && Boolean(git(['status', '--porcelain']))))

  return `${hash.slice(0, 8)}${dirty ? '.dirty' : ''}`
}
