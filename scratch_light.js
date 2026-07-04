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

// Global Light Theme Replacements
const replacements = [
  // Dark colors to Light colors
  { from: /#050508/gi, to: '#F8FAFC' },
  { from: /#121216/gi, to: '#FFFFFF' },
  { from: /#1A1A22/gi, to: '#F1F5F9' },
  
  // Crimson accents to Electric Blue / Violet / Mint
  { from: /#FF003C/gi, to: '#0066FF' },
  { from: /#B90020/gi, to: '#7C3AED' },
  { from: /#FF3E6C/gi, to: '#10B981' },
  { from: /#FF3355/gi, to: '#0066FF' },

  // RGB colors update
  { from: /255,\s*0,\s*60/g, to: '0, 102, 255' },
  { from: /185,\s*0,\s*32/g, to: '124, 58, 237' },
  { from: /255,\s*62,\s*108/g, to: '16, 185, 129' },

  // Tailwind structural adjustments
  { from: /bg-white\/5/g, to: 'bg-slate-100/70' },
  { from: /bg-white\/10/g, to: 'bg-slate-100/90' },
  { from: /bg-white\/\[0\.01\]/g, to: 'bg-slate-50/50' },
  { from: /bg-white\/\[0\.04\]/g, to: 'bg-slate-50' },
  { from: /border-white\/5/g, to: 'border-slate-200/50' },
  { from: /border-white\/10/g, to: 'border-slate-200' },
  { from: /text-white\/90/g, to: 'text-slate-800' },
  { from: /text-white\/95/g, to: 'text-slate-800' },
  { from: /text-white\/80/g, to: 'text-slate-700' },
  { from: /text-white\/70/g, to: 'text-slate-600' },
  { from: /text-white\/50/g, to: 'text-slate-500' },
  { from: /text-\[#9CA3AF\]/g, to: 'text-slate-600' },
  { from: /text-\[#6B7280\]/g, to: 'text-slate-400' },
  { from: /text-[#9CA3AF]/g, to: 'text-slate-600' },
  { from: /text-[#6B7280]/g, to: 'text-slate-400' },
  { from: /hover:text-white/g, to: 'hover:text-slate-900' },
]

console.log('Running light mode replacements script...')

walkDir(srcDir, (filePath) => {
  if (filePath.endsWith('index.css') || filePath.endsWith('TechStack.jsx')) return // Skip global CSS and TechStack (already handled manually)

  if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return

  let content = fs.readFileSync(filePath, 'utf8')
  let original = content
  
  replacements.forEach(({ from, to }) => {
    content = content.replace(from, to)
  })

  // Specific file tag conversions
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`Converted to light mode: ${path.relative(srcDir, filePath)}`)
  }
})

console.log('Light Mode Theme setup complete!')
