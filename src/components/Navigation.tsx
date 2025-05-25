'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { type NavItem } from '@/lib/markdown'
import styles from './Navigation.module.css'

interface NavigationProps {
  currentLanguage: 'de' | 'fr'
  navItems: NavItem[]
}

export default function Navigation({ currentLanguage, navItems }: NavigationProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close menu on route change
  useEffect(() => {
    setCollapsed(true)
    window.scrollTo(0, 0)
  }, [pathname])
  
  const getAlternateLanguage = () => {
    return currentLanguage === 'de' ? 'fr' : 'de'
  }
  
  const getAlternatePath = () => {
    const segments = pathname.split('/')
    if (segments[1] === 'de' || segments[1] === 'fr') {
      segments[1] = getAlternateLanguage()
      return segments.join('/')
    }
    return `/${getAlternateLanguage()}`
  }

  const getCurrentPageTitle = () => {
    const normalizedPathname = pathname.replace(/\/$/, '') || '/'
    const currentItem = navItems.find(item => {
      const normalizedItemPath = item.path.replace(/\/$/, '') || '/'
      return normalizedItemPath === normalizedPathname
    })
    return currentItem?.title || ''
  }

  const isActivePath = (itemPath: string) => {
    const normalizedPathname = pathname.replace(/\/$/, '') || '/'
    const normalizedItemPath = itemPath.replace(/\/$/, '') || '/'
    return normalizedItemPath === normalizedPathname
  }

  const getLanguageDisplay = () => {
    const altLang = getAlternateLanguage()
    const flag = altLang === 'de' ? '🇩🇪' : '🇫🇷'
    const text = altLang === 'de' ? 'Deutsch' : 'Français'
    
    return (
      <>
        {flag} <span className={styles.languageText}>{text}</span>
      </>
    )
  }

  const navbarClasses = [
    styles.navbar,
    scrolled ? styles.scrolled : '',
    collapsed ? styles.collapsed : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={navbarClasses}>
      <nav>
        <div className={styles.top}>
          <header className={styles.branding}>
            <h1>Palais Deleau</h1>
            <h2><i>Ferien Mittendrin</i></h2>
          </header>
          <div className={styles.hamburgerMenu}>
            <div>
              <span className={styles.routeName}>{getCurrentPageTitle()}</span>
              <button
                aria-label="hamburger menu"
                className={styles.hamburger}
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>
          </div>
        </div>
        <ul className={styles.links}>
          {navItems.map((item) => (
            <li key={item.path} className="nav-entry">
              <Link 
                href={item.path}
                className={isActivePath(item.path) ? styles.active : ''}
              >
                {item.title}
              </Link>
            </li>
          ))}
          <li className={`nav-entry ${styles.languageSwitcher}`}>
            <Link href={getAlternatePath()}>
              {getLanguageDisplay()}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
} 