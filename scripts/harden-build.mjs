import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const distDirectory = fileURLToPath(new URL('../dist/', import.meta.url))

const collectHtmlFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) {
      return collectHtmlFiles(path)
    }

    return path.endsWith('.html') ? [path] : []
  }))

  return files.flat()
}

const exemptModuleScriptsFromRocketLoader = (html) => html.replace(
  /<script\b[^>]*\btype=["']module["'][^>]*>/gi,
  (scriptTag) => {
    if (!/\ssrc=/i.test(scriptTag)) {
      return scriptTag
    }

    return scriptTag
      .replace(/\sdata-cfasync=["'][^"']*["']/gi, '')
      .replace(/\ssrc=/i, ' data-cfasync="false" src=')
  }
)

const htmlFiles = await collectHtmlFiles(distDirectory)

await Promise.all(htmlFiles.map(async (file) => {
  const html = await readFile(file, 'utf8')
  await writeFile(file, exemptModuleScriptsFromRocketLoader(html))
}))

console.log(`已为 ${htmlFiles.length} 个 HTML 文件设置 Rocket Loader 排除标记。`)
