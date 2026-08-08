import { profile } from '../data/portfolio'

type SiteFooterProps = {
  homeHref?: string
}

export function SiteFooter({ homeHref = '#inicio' }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <p>© {new Date().getFullYear()} {profile.shortName}</p>
        <a href={homeHref}>Voltar ao início ↑</a>
      </div>
    </footer>
  )
}
