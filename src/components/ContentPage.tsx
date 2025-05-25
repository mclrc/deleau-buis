import { getPostData } from '@/lib/markdown'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface ContentPageProps {
  language: 'de' | 'fr'
  slug?: string // Optional - if not provided, defaults to '1.index' (home page)
}

export default async function ContentPage({ language, slug = '1.index' }: ContentPageProps) {
  const postData = await getPostData(language, slug)
  
  if (!postData) {
    notFound()
  }

  return (
    <div>
      {postData.bannerImage && (
        <div className="banner-image">
          <Image
            src={postData.bannerImage}
            alt={postData.title}
            width={800}
            height={400}
            className="image"
            unoptimized
          />
        </div>
      )}
      
      <article className="document-driven-page">
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </div>
  )
} 