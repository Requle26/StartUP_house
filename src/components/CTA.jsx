import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import './CTA.css';

function MagneticButton({ children, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 14, mass: 0.4 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default function CTA() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <section id="cta" className="cta">
      <div className="cta__route" aria-hidden="true">
        <svg viewBox="0 0 1400 400" preserveAspectRatio="none">
          <path
            d="M -50 320 C 250 220, 380 380, 620 260 S 980 120, 1180 220 S 1400 160, 1480 200"
            fill="none"
            stroke="var(--paper)"
            strokeOpacity="0.08"
            strokeWidth="2"
            strokeDasharray="2 14"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="container cta__inner">
        <span className="eyebrow eyebrow--light">Pre-Registration</span>
        <h2 className="cta__title">
          다음 여행은,
          <br />
          듣는 것부터 시작됩니다
        </h2>
        <p className="cta__text">
          스토리로드는 경상북도에서 베타로 첫 페이지를 채우고 있습니다
          출시 소식과 베타 참여 안내를 가장 먼저 받아보세요
        </p>

        <div className="cta__form-wrap">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.form
                key="form"
                className="cta__form"
                onSubmit={submit}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <input
                  type="email"
                  required
                  placeholder="이메일 주소를 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-cursor="view"
                  data-cursor-label="입력"
                />
                <MagneticButton type="submit" className="btn btn-primary cta__submit" data-cursor="view" data-cursor-label="등록">
                  알림 받기
                </MagneticButton>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                className="cta__done"
                initial={{ opacity: 0, scale: 1.4, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ type: 'spring', stiffness: 240, damping: 16 }}
              >
                <span className="cta__done-ring" />
                등록 완료 · 첫 소식을 보내드릴게요
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
