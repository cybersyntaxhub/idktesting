import { motion } from 'framer-motion';

export function CyberSecurityIcon({ size = 64 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.path
        d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4z"
        stroke="#00f0ff"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      <motion.path
        d="M24 32l6 6 12-12"
        stroke="#00f0ff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="32"
        cy="32"
        r="3"
        fill="#00f0ff"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 0.5, delay: 1.5 }}
      />
    </motion.svg>
  );
}

export function BioTechIcon({ size = 64 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
    >
      <motion.path
        d="M20 8c0 12 8 16 8 24s-8 12-8 24"
        stroke="#a855f7"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      <motion.path
        d="M44 8c0 12-8 16-8 24s8 12 8 24"
        stroke="#a855f7"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
      />
      {[16, 26, 36, 46].map((y, i) => (
        <motion.circle
          key={y}
          cx="32"
          cy={y}
          r="3"
          fill="#a855f7"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.4, 1] }}
          transition={{ duration: 0.4, delay: 0.8 + i * 0.2 }}
        />
      ))}
    </motion.svg>
  );
}

export function FinanceIcon({ size = 64 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
    >
      <motion.polyline
        points="8,48 20,36 28,42 40,24 56,16"
        stroke="#10b981"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      <motion.polygon
        points="50,16 56,16 56,22"
        fill="#10b981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      />
      {[
        { x: 14, h: 16 },
        { x: 26, h: 24 },
        { x: 38, h: 20 },
        { x: 50, h: 30 },
      ].map((bar, i) => (
        <motion.rect
          key={bar.x}
          x={bar.x}
          y={56 - bar.h}
          width="6"
          height={bar.h}
          rx="1"
          fill="#10b981"
          opacity={0.3}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
          style={{ transformOrigin: `${bar.x + 3}px 56px` }}
        />
      ))}
    </motion.svg>
  );
}

export function DataScienceIcon({ size = 64 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
    >
      <motion.ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="8"
        stroke="#f59e0b"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      <motion.ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="8"
        stroke="#f59e0b"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, rotate: 60 }}
        animate={{ pathLength: 1, rotate: 60 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.3 }}
        style={{ transformOrigin: '32px 32px' }}
      />
      <motion.ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="8"
        stroke="#f59e0b"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, rotate: -60 }}
        animate={{ pathLength: 1, rotate: -60 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.6 }}
        style={{ transformOrigin: '32px 32px' }}
      />
      <motion.circle
        cx="32"
        cy="32"
        r="5"
        fill="#f59e0b"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1] }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />
    </motion.svg>
  );
}

export function LogoIcon({ size = 40 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      initial={{ rotate: -180, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="8"
        stroke="url(#logoGrad)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.path
        d="M12 14l8-4 8 4v8l-8 4-8-4v-8z"
        stroke="url(#logoGrad)"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        d="M12 14l8 4 8-4M20 18v8"
        stroke="url(#logoGrad)"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

export function PulseOrb() {
  return (
    <motion.div
      className="absolute w-96 h-96 rounded-full opacity-10"
      style={{
        background: 'radial-gradient(circle, #00f0ff 0%, transparent 70%)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.08, 0.15, 0.08],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
