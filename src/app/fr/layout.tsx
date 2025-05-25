import Layout from '@/components/Layout'
import { getNavigationData } from '@/lib/markdown'

export default function FrenchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = getNavigationData('fr')
  
  return (
    <Layout language="fr" navItems={navItems}>
      {children}
    </Layout>
  )
} 