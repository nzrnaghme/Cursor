type SectionTarget = Pick<HTMLElement, 'scrollIntoView' | 'focus'>

/** Resolve a bookmarked section after React has mounted its target element. */
export function restoreInitialSection(
  hash: string,
  findTarget: (id: string) => SectionTarget | null = (id) => document.getElementById(id),
): void {
  if (!hash.startsWith('#') || hash.length < 2) return
  let id: string
  try {
    id = decodeURIComponent(hash.slice(1))
  } catch {
    return
  }
  const target = findTarget(id)
  if (!target) return
  target.scrollIntoView({ behavior: 'instant', block: 'start' })
  target.focus({ preventScroll: true })
}
