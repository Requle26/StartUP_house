import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import './HowItWorks.css';

const STEPS = [
  {
    n: '01',
    title: '도착하면, 도장이 찍힌다',
    text: '그 지역에 실제로 도착하면 위치 인증으로 도장이 찍히고, 그곳에 남겨진 오디오 다이어리가 잠금 해제됩니다.',
  },
  {
    n: '02',
    title: '걸으며, 듣는다',
    text: '먼저 다녀간 여행자들이 남긴 소리를 같은 장소에서 재생합니다. 설명이 아니라 그 순간의 현장음 그대로.',
  },
  {
    n: '03',
    title: '느낀 만큼, 남긴다',
    text: '마음에 닿은 순간이 있다면 짧게 녹음해 그 자리에 둡니다. 다음 사람을 위한 한 토막의 목소리.',
  },
  {
    n: '04',
    title: '다녀온 만큼, 채워진다',
    text: '도장이 늘어날수록 나만의 오디오 다이어리가 완성됩니다. 사진첩이 아니라, 소리로 만든 여행기.',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how" className="how" ref={ref}>
      <div className="container">
        <div className="how__head">
          <span className="eyebrow">04 · How it works</span>
          <h2 className="how__title">네 걸음으로 완성되는 여행 기록</h2>
        </div>

        <div className="how__list">
          <div className="how__line">
            <motion.div className="how__line-fill" style={{ scaleY }} />
          </div>

          {STEPS.map((step, i) => (
            <motion.div
              className="how__step"
              key={step.n}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="how__num">{step.n}</span>
              <div className="how__step-body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
