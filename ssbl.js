import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import brucedown from 'brucedown'

/**
 * @typedef {Object} PostSpec
 * @property {Date} date
 * @property {boolean} [draft]
 * @property {string} [title]
 * @property {string} [author]
 * @property {string} [name]
 */

/**
 * @typedef {Object} Post
 * @property {PostSpec} spec - The parsed JSON metadata
 * @property {string} page - The rendered HTML content
 */

/**
 * Parse a single markdown file's content, extracting JSON header and rendering body
 * @param {string} content - Raw file content
 * @returns {Promise<Post>}
 */
async function processOne (content) {
  let json = ''

  // Expect the header to contain a JSON block
  const lines = content.split('\n')
  if (/^```/.test(lines[0])) {
    lines.shift() // optional && extraneous ```
  }
  if (!/^\{/.test(lines[0])) {
    throw new Error('Not a JSON header: ' + lines[0])
  }
  while (lines.length && !/^\}/.test(lines[0])) {
    json += lines.shift()
  }
  json += lines.shift()
  if (lines.length && /^```/.test(lines[0])) {
    lines.shift() // optional & extraneous ```
  }

  /** @type {PostSpec} */
  let spec
  try {
    spec = JSON.parse(json)
  } catch (e) {
    throw new Error('JSON error: ' + e)
  }

  if (!spec.date) {
    throw new Error('no "date" property in spec')
  }
  spec.date = new Date(spec.date)

  const page = await brucedown(lines.join('\n'))
  return { spec, page }
}

/**
 * Load and process all markdown files from a directory
 * @param {string} postsDir - Path to directory containing markdown files
 * @returns {Promise<Post[]>} Array of posts sorted by date descending, drafts excluded
 */
export default async function ssbl (postsDir) {
  const list = await readdir(postsDir)

  // Filter to .md files only
  const files = []
  for (const file of list) {
    const filePath = join(postsDir, file)
    const fileStat = await stat(filePath)
    if (fileStat.isFile() && /\.md$/.test(file)) {
      files.push(filePath)
    }
  }

  // Process all files in parallel
  const posts = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(file, 'utf-8')
      return processOne(content)
    })
  )

  // Filter out drafts and sort by date descending
  return posts
    .filter((post) => !post.spec.draft)
    .sort((a, b) => (a.spec.date < b.spec.date ? 1 : -1))
}
