import { readFileSync, existsSync } from 'node:fs'
import assert from 'node:assert/strict'

const root = new URL('../', import.meta.url)
const read = path => readFileSync(new URL(path, root), 'utf8')
const site = 'https://www.lecabe.com.br'

for (const file of ['public/llms.txt', 'public/llms-full.txt', 'public/.well-known/ard.json']) {
  assert.ok(existsSync(new URL(file, root)), `Missing discovery resource: ${file}`)
}

const llms = read('public/llms.txt')
assert.match(llms, /^#\s+Lecabe Tech/m, 'llms.txt must have an H1')
assert.match(llms, /https:\/\/www\.lecabe\.com\.br\//, 'llms.txt must point to the canonical domain')
assert.match(llms, /\]\(https:\/\//, 'llms.txt must contain Markdown links')

const manifest = JSON.parse(read('public/.well-known/ard.json'))
assert.ok(Array.isArray(manifest.entries), 'ARD manifest must have entries array')
for (const entry of manifest.entries) {
  assert.match(entry.identifier, /^urn:air:[a-zA-Z0-9.-]+(:[a-zA-Z0-9._-]+)+$/)
  assert.ok(entry.displayName && entry.type, 'ARD entries must have displayName and type')
  assert.notEqual(Boolean(entry.url), Boolean(entry.data), 'ARD entries require exactly one of url or data')
}

const robots = read('public/robots.txt')
assert.ok(robots.includes(`Sitemap: ${site}/sitemap.xml`), 'Sitemap directive missing')
assert.ok(robots.includes(`Agentmap: ${site}/.well-known/ard.json`), 'Agentmap directive missing')

const html = read('index.html')
assert.ok(html.includes('rel="ard"'), 'HTML ARD discovery link missing')

const vercel = JSON.parse(read('vercel.json'))
assert.ok(vercel.headers.some(rule => rule.source === '/.well-known/ard.json'), 'ARD MIME header missing')

console.log('Agent discovery static checks passed.')
