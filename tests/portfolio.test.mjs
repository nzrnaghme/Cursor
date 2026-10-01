import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import ts from 'typescript'

const source = await readFile(new URL('../src/data/content.ts', import.meta.url), 'utf8')
const javascript = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText
const content = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`)
const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('education and manuscript status match the current reviewed content', () => {
  assert.ok(content.education[0].bullets.includes('GPA: 3.44'))
  assert.equal(content.education[0].degree, 'M.S. in Computer Engineering')
  assert.equal(content.thesisCaseStudy.status, 'Research manuscript')
  assert.doesNotMatch(source, /under review|80\.36|74\.4|4,900|approval logic/i)
  assert.match(content.thesisCaseStudy.codeAvailability, /not been publicly released/)
})

test('research uses implementation descriptors and keeps future evaluation qualified', () => {
  assert.match(content.thesisCaseStudy.model, /ResNet-inspired/)
  assert.match(content.thesisCaseStudy.data.summary, /16 kHz/)
  assert.match(content.thesisCaseStudy.data.summary, /128 × 128 log-Mel/)
  assert.match(content.thesisCaseStudy.evaluation, /pending verification/)
  assert.doesNotMatch(source, /figurePlaceholder|Add verified figure|Formal citation pending/)
})

test('project links describe their destination', () => {
  for (const project of content.projects) {
    assert.ok(project.link.startsWith('https://'))
    assert.ok(project.linkLabel.length > 15)
    assert.match(project.linkLabel, /GitHub|LinkedIn/)
  }
})

test('all local content assets exist', async () => {
  const paths = [content.getCvHref(), content.thesisCaseStudy.image,
    ...content.projects.map((project) => project.image),
    ...content.experience.map((role) => role.image)]
  for (const path of paths) await access(new URL(`../public${path}`, import.meta.url))
})

test('section navigation uses real anchors without an artificial loading state', async () => {
  const app = await read('src/App.tsx')
  const nav = await read('src/components/Navigation.tsx')
  const home = await read('src/components/Home.tsx')
  assert.doesNotMatch(app + nav, /setLoading|setIsLoading|<Loading|scrollToSection/)
  assert.match(nav, /href=\{`#\$\{item\.id\}`\}/)
  assert.match(home, /href="#research"/)
  assert.match(nav, /event\.key === 'Escape'/)
  assert.match(nav, /aria-current=/)
  assert.match(await read('src/index.css'), /scroll-margin-top: 6rem/)
})

test('short viewports and reduced motion have explicit safeguards', async () => {
  assert.match(await read('src/components/SectionShell.tsx'), /threshold: 0, triggerOnce: true/)
  assert.match(await read('src/components/Home.tsx'), /threshold: 0, triggerOnce: true/)
  assert.match(await read('src/App.tsx'), /reducedMotion="user"/)
  assert.match(await read('src/components/ParticlesBackground.tsx'), /if \(reduceMotion\) return null/)
  assert.match(await read('src/components/SkillsTechnologies.tsx'), /case 'ArrowRight'/)
})

const luminance = (hex) => {
  const channels = [0, 2, 4].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722
}
test('core small-text color pairs exceed WCAG AA contrast', () => {
  const pairs = [
    ['a9c66c', '2a2a2a'], ['ffffff', '526d1d'], ['ffffff', '556b2f'],
    ['9ca3af', '2a2a2a'], ['526d1d', 'f5f5f5'], ['7eb8c9', '2a3441'],
  ]
  for (const [foreground, background] of pairs) {
    const [dark, light] = [luminance(foreground), luminance(background)].sort((a, b) => a - b)
    assert.ok((light + 0.05) / (dark + 0.05) >= 4.5, `${foreground} on ${background}`)
  }
})
