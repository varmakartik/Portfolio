import fs from 'fs'
import path from 'path'

const srcDir = 'c:/Users/wonde/OneDrive/Pictures/Desktop/P1/src'

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f)
    const isDirectory = fs.statSync(dirPath).isDirectory()
    if (isDirectory) {
      walkDir(dirPath, callback)
    } else {
      callback(dirPath)
    }
  })
}

// User Palette Replacements:
// Primary: #2563EB
// Secondary: #38BDF8
// Background: #F8FAFC
// Text: #1E293B
const replacements = [
  // Hex Colors
  { from: /#0066FF/gi, to: '#2563EB' },
  { from: /#FF003C/gi, to: '#2563EB' },
  { from: /#7C3AED/gi, to: '#38BDF8' },
  { from: /#B90020/gi, to: '#38BDF8' },
  { from: /#FF3E6C/gi, to: '#38BDF8' },
  { from: /#EF4444/gi, to: '#38BDF8' },
  
  // RGBA strings
  { from: /0,\s*102,\s*255/g, to: '37, 99, 235' },
  { from: /255,\s*0,\s*60/g, to: '37, 99, 235' },
  { from: /124,\s*58,\s*237/g, to: '56, 189, 248' },
  { from: /185,\s*0,\s*32/g, to: '56, 189, 248' },
]

console.log('Replacing hex codes with User Palette...')

walkDir(srcDir, (filePath) => {
  if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx') && !filePath.endsWith('.css')) return

  let content = fs.readFileSync(filePath, 'utf8')
  let original = content
  
  replacements.forEach(({ from, to }) => {
    content = content.replace(from, to)
  })

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`Updated User Palette in: ${path.relative(srcDir, filePath)}`)
  }
})

console.log('User Palette update complete!')
