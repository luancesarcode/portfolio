import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { publicPath } from '../utils/paths'

type HeaderProps = {
  currentPage?: 'home' | 'projects'
}

export function Header({ currentPage = 'home' }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const homeHref = publicPath('')
  const navigation = [
    {
      label: 'Home',
      href: currentPage === 'home' ? '#inicio' : homeHref,
      current: currentPage === 'home',
    },
    {
      label: 'Formação',
      href: currentPage === 'home' ? '#formacao' : `${homeHref}#formacao`,
      current: false,
    },
    {
      label: 'Projetos',
      href: publicPath('projetos.html'),
      current: currentPage === 'projects',
    },
    {
      label: 'Contato',
      href: currentPage === 'home' ? '#contato' : `${homeHref}#contato`,
      current: false,
    },
  ]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.classList.toggle('menu-open', open)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('menu-open')
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <a className="brand" href={currentPage === 'home' ? '#inicio' : homeHref} aria-label="Luan César — voltar ao início">
          <img
            className="brand-mark"
            src={publicPath('assets/logo-luan-cesar-marca.svg')}
            alt=""
            aria-hidden="true"
          />
          <span>
            <strong>LUAN CÉSAR</strong>
            <small>CONTROLE / AUTOMAÇÃO</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} aria-current={item.current ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? 'is-open' : ''}`}
        aria-label="Navegação mobile"
        aria-hidden={!open}
      >
        <div className="site-container mobile-nav-inner">
          <span className="mono-label">NAVEGAÇÃO</span>
          {navigation.map((item) => (
            <a key={item.href} href={item.href} aria-current={item.current ? 'page' : undefined} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span className="mobile-nav-node" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
