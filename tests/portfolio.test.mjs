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

test('education and thesis status match the current reviewed content', () => {
  assert.ok(content.education[0].bullets.includes('GPA: 3.44'))
  assert.equal(content.education[0].degree, 'M.S. in Computer Engineering')
  assert.equal(content.thesisCaseStudy.status, 'M.S. thesis research')
  assert.match(content.thesisCaseStudy.evaluation, /80\.36% validation accuracy/)
  assert.match(content.thesisCaseStudy.evaluation, /74\.4% held-out test accuracy/)
  assert.doesNotMatch(source, /under review|4,900|approval logic/i)
  assert.doesNotMatch(content.identity.bio, /real-time|rigorous/i)
  assert.match(content.thesisCaseStudy.codeAvailability, /not been publicly released/)
})

test('research uses implementation descriptors and reports the verified evaluation', () => {
  assert.match(content.thesisCaseStudy.model, /ResNet-inspired/)
  assert.match(content.thesisCaseStudy.data.summary, /16 kHz/)
  assert.match(content.thesisCaseStudy.data.summary, /128 × 128 log-Mel/)
  assert.match(content.thesisCaseStudy.limitations.join(' '), /not evidence of speaker-independent or cross-corpus generalization/)
  assert.doesNotMatch(source, /figurePlaceholder|Add verified figure|Formal citation pending/)
})

test('applicant profile is evidence-aware and institution-neutral', () => {
  const profile = content.aboutParagraphs.join(' ')
  assert.match(profile, /MCP-SafetyBench/)
  assert.match(profile, /candidate pre-execution risk-gating baseline/)
  assert.match(profile, /no validated defense results are claimed/)
  assert.doesNotMatch(profile, /Prof\. Rudner|Vector's/i)
  assert.match(content.identity.headline, /Agent Security & Speech ML/)
  assert.match(content.agentSecurityStudy.status, /In progress/)
  assert.match(content.agentSecurityStudy.artifactStatus, /no public results or code are claimed yet/i)
  assert.match(content.agentSecurityStudy.benchmarkUrl, /^https:\/\/proceedings\.iclr\.cc\//)
})

test('project links describe their destination', () => {
  for (const project of content.projects) {
    assert.ok(project.link.startsWith('https://'))
    assert.ok(project.linkLabel.length > 15)
    assert.match(project.linkLabel, /GitHub|LinkedIn/)
  }
})

test('faculty-outreach CV is ATS-readable and keeps evidence guardrails', async () => {
  const cvHtml = await read('public/Naghmeh_Melody_Nazar_Research_CV.html')
  const cvGenerator = await read('scripts/generate_research_cv.py')
  const headings = [
    'Research focus',
    'Research experience',
    'Research outputs &amp; presentation',
    'Education',
    'Professional experience',
    'Technical skills',
  ]
  const positions = headings.map((heading) => cvHtml.indexOf(`>${heading}</h2>`))
  assert.ok(positions.every((position) => position >= 0))
  assert.deepEqual([...positions].sort((a, b) => a - b), positions)
  assert.match(cvHtml, /large language model \(LLM\) agents/)
  assert.match(cvHtml, /untrusted tool metadata, user input, and tool outputs/)
  assert.match(cvHtml, /80\.36% validation accuracy/)
  assert.match(cvHtml, /74\.4% held-out test accuracy/)
  assert.match(cvHtml, /no validated defense results are claimed/)
  assert.match(cvHtml, /github\.com\/nzrnaghme\/RespondEmailAgent/)
  assert.match(cvHtml, /download="Naghmeh_Melody_Nazar_Research_CV\.pdf"/)
  assert.doesNotMatch(cvHtml, /GPA: 3\.44|Persian COVID-19/)
  assert.match(cvGenerator, /source of truth for both formats/)
})

test('all local content assets exist', async () => {
  const paths = [content.getCvHref(), content.getAccessibleCvHref(), content.thesisCaseStudy.image,
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
  assert.match(home, /href="#agent-security"/)
  assert.match(home + nav, /download="Naghmeh_Melody_Nazar_Research_CV\.pdf"/)
  assert.match(nav, /event\.key === 'Escape'/)
  assert.match(nav, /aria-current=/)
  assert.match(app, /IntersectionObserver/)
  assert.match(await read('src/index.css'), /scroll-margin-top: 6rem/)
})

test('ambient features stay bounded, opt-in, and motion-aware', async () => {
  const sectionShell = await read('src/components/SectionShell.tsx')
  const home = await read('src/components/Home.tsx')
  const contact = await read('src/components/Contact.tsx')
  const navigation = await read('src/components/Navigation.tsx')
  const music = await read('src/components/MusicPlayer.tsx')
  const particles = await read('src/components/ParticlesBackground.tsx')
  const research = await read('src/components/Research.tsx')
  assert.match(sectionShell, /threshold: 0, triggerOnce: true/)
  assert.doesNotMatch(sectionShell, /min-h-screen|ParticlesBackground/)
  assert.match(home, /ParticlesBackground/)
  assert.doesNotMatch(contact, /ParticlesBackground|MusicPlayer/)
  assert.match(navigation, /MusicPlayer/)
  assert.match(music, /useState\(false\)/)
  assert.match(music, /preload="none"/)
  assert.match(music, /aria-pressed=\{isPlaying\}/)
  assert.doesNotMatch(music, /autoPlay|localStorage/)
  assert.match(particles, /fpsLimit: 40/)
  assert.match(particles, /value: 24/)
  assert.match(particles, /pointer-events-none/)
  assert.match(particles, /useReducedMotion/)
  assert.match(particles, /onClick:[\s\S]*?enable: false/)
  assert.match(particles, /onHover:[\s\S]*?enable: false/)
  assert.match(particles, /collisions:[\s\S]*?enable: false/)
  assert.doesNotMatch(contact, /aria-live|setInterval/)
  assert.match(research, /width="1100"/)
  assert.match(research, /height="300"/)
  assert.match(await read('src/App.tsx'), /reducedMotion="user"/)
  assert.match(home, /useReducedMotion/)
  assert.doesNotMatch(await read('src/components/SkillsTechnologies.tsx'), /cdn\.simpleicons|role="tab"/)
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

const navigationSource = await read('src/utils/sectionNavigation.ts')
const navigationJavascript = ts.transpileModule(navigationSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText
const { restoreInitialSection } = await import(`data:text/javascript;base64,${Buffer.from(navigationJavascript).toString('base64')}`)

test('a bookmarked section scrolls and receives focus after mounting', () => {
  const calls = []
  restoreInitialSection('#research', (id) => {
    assert.equal(id, 'research')
    return {
      scrollIntoView: (options) => calls.push(['scroll', options]),
      focus: (options) => calls.push(['focus', options]),
    }
  })
  assert.deepEqual(calls, [
    ['scroll', { behavior: 'instant', block: 'start' }],
    ['focus', { preventScroll: true }],
  ])
})

test('empty, malformed, and unknown section hashes are harmless', () => {
  const unexpected = () => assert.fail('An invalid hash should not be looked up')
  for (const hash of ['', '#', 'research', '#%ZZ']) restoreInitialSection(hash, unexpected)
  assert.doesNotThrow(() => restoreInitialSection('#missing-section', () => null))
})

test('URL-encoded section hashes resolve correctly', () => {
  let foundId
  restoreInitialSection('#research%2Dheading', (id) => { foundId = id; return null })
  assert.equal(foundId, 'research-heading')
})
