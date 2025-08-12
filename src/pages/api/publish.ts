import type { APIRoute } from 'astro'
import { access, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json() as any
  const title: string = body.title || ''
  const content: string = body.content || ''
  const tags: string = body.tags || ''

  if (!title || !content) {
    return new Response(
      JSON.stringify({ success: false, error: 'Missing title or content' }),
      { status: 400 },
    )
  }

  const slug = slugify(title)
  const date = new Date().toISOString().slice(0, 10)
  const tagsArr = tags
    .split(',')
    .map((t: string) => t.trim())
    .filter((t: string) => t.length > 0)

  const frontmatter = [
    '---',
    `title: ${title}`,
    `published: ${date}`,
    `description: ''`,
    `updated: ''`,
    'tags:',
    ...tagsArr.map((t: string) => `  - ${t}`),
    'draft: false',
    'pin: 0',
    'toc: true',
    `lang: ''`,
    `abbrlink: ''`,
    '---',
    '',
  ].join('\n')

  const filePath = join(process.cwd(), 'src', 'content', 'posts', `${slug}.md`)

  try {
    await access(filePath)
    return new Response(
      JSON.stringify({ success: false, error: 'Post already exists' }),
      { status: 409 },
    )
  }
  catch {
    // file does not exist
  }

  await writeFile(filePath, `${frontmatter}${content}\n`, 'utf8')

  return new Response(
    JSON.stringify({ success: true, slug }),
    { status: 200 },
  )
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
