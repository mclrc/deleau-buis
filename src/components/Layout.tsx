import Navigation from './Navigation'
import { type NavItem } from '@/lib/markdown'

interface LayoutProps {
  children: React.ReactNode
  language: 'de' | 'fr'
  navItems: NavItem[]
}

export default function Layout({ children, language, navItems }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Navigation currentLanguage={language} navItems={navItems} />
      <main>
        {children}
      </main>
      <footer className="site-footer">
        <hr />
        <div className="footer-content">
          <div>
            <ul>
              <li>Roland Deleau</li>
              <li>15, Place du Marché<br />F-26170 Buis Les Baronnies</li>
            </ul>
          </div>
          <div>
            <ul>
              <li><a href="mailto:roland@deleau.de">roland@deleau.de</a></li>
              <li>🇩🇪 <a href="tel:+4915753535828">+49 1575 3535828</a></li>
              <li>🇫🇷 <a href="tel:+33638594369">+33 638 59 43 69</a></li>
              <li>Website by <a href="https://mclrc.me">Moritz</a></li>
            </ul>
          </div>
        </div>
        <p className="copyright">©{new Date().getFullYear()} Roland Deleau</p>
      </footer>
    </div>
  )
} 