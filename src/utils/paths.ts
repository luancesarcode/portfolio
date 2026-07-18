/** Resolve files in /public correctly in both local dev and GitHub Pages. */
export function publicPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
