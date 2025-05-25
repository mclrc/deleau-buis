import { getAllPosts } from '@/lib/markdown'
import ContentPage from '@/components/ContentPage'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts('de')
  
  return posts
    .filter(slug => slug !== '1.index') // Exclude the home page
    .map((slug) => ({
      slug: slug,
    }))
}

export default async function GermanPage({ params }: PageProps) {
  const { slug } = await params
  
  return <ContentPage language="de" slug={slug} />
} 