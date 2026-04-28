import { motion } from 'framer-motion';

/** Layered, cool-monochrome background:
 * - aurora gradient base (gunmetal/steel)
 * - animated blurred blobs in muted steel tones
 * - faint masked grid lines
 * - subtle grain overlay
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-0 overflow-hidden bg-aurora">
      <div className="absolute inset-0 bg-grid opacity-50" />

      <motion.div
        className="absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--aurora-cyan) / 0.18) 0%, rgb(var(--aurora-cyan) / 0) 70%)',
        }}
        animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-32 top-1/3 h-[34rem] w-[34rem] rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--aurora-violet) / 0.16) 0%, rgb(var(--aurora-violet) / 0) 70%)',
        }}
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-12rem] left-1/4 h-[36rem] w-[36rem] rounded-full blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--aurora-cyan) / 0.10) 0%, rgb(var(--aurora-cyan) / 0) 70%)',
        }}
        animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="grain" />
    </div>
  );
}
