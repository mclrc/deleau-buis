import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

export interface PostData {
  slug: string
  title: string
  bannerImage?: string
  content: string
  language: 'de' | 'fr'
}

export interface NavItem {
  slug: string
  title: string
  path: string
}

export async function getPostData(language: 'de' | 'fr', slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(contentDirectory, language, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    const matterResult = matter(fileContents)
    
    // Process markdown content to HTML
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()
    
    return {
      slug,
      title: matterResult.data.title,
      bannerImage: matterResult.data.bannerImage,
      content: contentHtml,
      language
    }
  } catch (error) {
    console.error(`Error reading post ${slug} in ${language}:`, error)
    return null
  }
}

export function getAllPosts(language: 'de' | 'fr'): string[] {
  try {
    const fullPath = path.join(contentDirectory, language)
    const fileNames = fs.readdirSync(fullPath)
    
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''))
      .sort()
  } catch (error) {
    console.error(`Error reading posts for ${language}:`, error)
    return []
  }
}

export function getAllPostsData(language: 'de' | 'fr'): Promise<PostData[]> {
  const slugs = getAllPosts(language)
  
  return Promise.all(
    slugs.map(async (slug) => {
      const postData = await getPostData(language, slug)
      return postData
    })
  ).then(posts => posts.filter(Boolean) as PostData[])
}

export function getNavigationData(language: 'de' | 'fr'): NavItem[] {
  try {
    const fullPath = path.join(contentDirectory, language)
    const fileNames = fs.readdirSync(fullPath)
    
    const navItems: NavItem[] = []
    
    fileNames
      .filter(name => name.endsWith('.md'))
      .sort()
      .forEach(fileName => {
        try {
          const slug = fileName.replace(/\.md$/, '')
          const filePath = path.join(fullPath, fileName)
          const fileContents = fs.readFileSync(filePath, 'utf8')
          const matterResult = matter(fileContents)
          
          // For the index page, use the language root path
          const itemPath = slug === '1.index' ? `/${language}` : `/${language}/${slug}`
          
          navItems.push({
            slug,
            title: matterResult.data.title || slug,
            path: itemPath
          })
        } catch (error) {
          console.error(`Error reading navigation data for ${fileName}:`, error)
        }
      })
    
    return navItems
  } catch (error) {
    console.error(`Error reading navigation data for ${language}:`, error)
    return []
  }
} 