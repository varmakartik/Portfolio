export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#F8FAFC] pointer-events-none">
      {/* Mesh Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(37, 99, 235,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37, 99, 235,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Abstract Design Pink Spiral / Waves */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none transform-gpu" 
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pink-spiral" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />       {/* Pink */}
            <stop offset="50%" stopColor="#F472B6" />      {/* Light Pink */}
            <stop offset="100%" stopColor="#38BDF8" />     {/* Sky Blue */}
          </linearGradient>
          <linearGradient id="pink-spiral-reverse" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        
        {/* Primary flowing spiral curve from top-left area to bottom-right */}
        <path
          d="M 100,-50 C 450,200 100,500 800,500 C 1300,500 600,800 900,1050"
          fill="none"
          stroke="url(#pink-spiral)"
          strokeWidth="6"
          strokeLinecap="round"
          className="opacity-70"
        />

        {/* Secondary overlapping trail */}
        <path
          d="M 150,-50 C 490,220 120,480 820,480 C 1350,480 620,780 950,1050"
          fill="none"
          stroke="url(#pink-spiral-reverse)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="opacity-40 animate-pulse"
          style={{ animationDuration: '8s' }}
        />

        {/* Small background nodes */}
        <circle cx="350" cy="180" r="8" fill="#EC4899" className="opacity-50 animate-ping" style={{ animationDuration: '4s' }} />
        <circle cx="700" cy="500" r="10" fill="#38BDF8" className="opacity-40" />
        <circle cx="500" cy="800" r="6" fill="#EC4899" className="opacity-55" />
      </svg>

      {/* Static Aurora Radial Glows */}
      <div className="absolute inset-0 transform-gpu">
        <div 
          className="absolute -top-[20%] left-[-10%] w-[60%] h-[70%] rounded-full opacity-[0.08] blur-[140px]"
          style={{
            background: 'radial-gradient(circle, #2563EB 0%, transparent 80%)',
          }}
        />
        <div 
          className="absolute top-[40%] right-[-10%] w-[50%] h-[60%] rounded-full opacity-[0.06] blur-[140px]"
          style={{
            background: 'radial-gradient(circle, #38BDF8 0%, transparent 80%)',
          }}
        />
        <div 
          className="absolute bottom-[-10%] left-[20%] w-[45%] h-[55%] rounded-full opacity-[0.06] blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #10B981 0%, transparent 80%)',
          }}
        />
      </div>
    </div>
  )
}
