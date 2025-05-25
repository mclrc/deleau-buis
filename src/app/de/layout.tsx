import Layout from '@/components/Layout'
import { getNavigationData } from '@/lib/markdown'

export default function GermanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = getNavigationData('de')
  
  return (
    <Layout language="de" navItems={navItems}>
      {children}
    </Layout>
  )
} 