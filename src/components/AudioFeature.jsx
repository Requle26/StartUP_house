import { useState } from 'react';
import { motion } from 'motion/react';
import Waveform from './Waveform';
import './AudioFeature.css';

const POSTS = [
  {
    id: 1,
    place: '포항 · 죽도시장',
    desc: '경매 시작을 알리는 종소리와 상인들의 흥정 소리',
    time: '0:58',
    seconds: 8,
    date: '2026.03.02',
  },
  {
    id: 2,
    place: '경산 · 갓바위',
    desc: '갓바위에서 짹짹거리는 새소리',
    time: '1:24',
    seconds: 10,
    date: '2026.03.18',
  },
  {
    id: 3,
    place: '안동 · 하회마을',
    desc: '기와 지붕 위로 떨어지는 빗소리',
    time: '0:36',
    seconds: 6,
    date: '2026.04.05',
  },
];

export default function AudioFeature() {
  const [activeId, setActiveId] = useState(null);

  const toggle = (id) => {
    setActiveId((cur) => (cur === id ? null : id));
  };

  return (
    <section id="audio" className="audio">
      <div className="container audio__inner">
        <div className="audio__head">
          <span className="eyebrow">01 · Audio Diary</span>
          <h2 className="audio__title">
            녹음은 한 번,
            <br />
            듣는 순간은 그대로
          </h2>
          <p className="audio__text">
            스토리로드의 모든 기록에는 오디오가 함께 남겨집니다
            남기는 사람은 그 장소의 소리를 한 번 녹음해 두고 떠나고,
            듣는 사람은 같은 자리에 서서 그 순간을 그대로 재생할 뿐입니다
            서로 말을 주고받지 않아도, 시간을 가로질러 같은 풍경을 듣게 됩니다
          </p>
          <ul className="audio__points">
            <li>
              <span>재생만 있고, 답장은 없습니다</span>
              단방향으로 남기는 현장의 소리
            </li>
            <li>
              <span>위치와 함께 묶입니다</span>
              어디서 녹음됐는지가 곧 그 기록의 제목
            </li>
            <li>
              <span>그날의 분위기를 보존합니다</span>
              편집 없이, 들리는 그대로
            </li>
          </ul>
        </div>

        <div className="audio__deck">
          {POSTS.map((post, i) => {
            const active = activeId === post.id;
            return (
              <motion.div
                key={post.id}
                className={`audio-card ${active ? 'is-active' : ''}`}
                style={{ '--rot': `${(i - 1) * 2.5}deg`, zIndex: active ? 10 : POSTS.length - i }}
                initial={{ opacity: 0, y: 40, rotate: (i - 1) * 2.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: (i - 1) * 2.5 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, rotate: 0 }}
              >
                <button
                  className="audio-card__play"
                  onClick={() => toggle(post.id)}
                  data-cursor="play"
                  data-cursor-label={active ? '정지' : '재생'}
                  aria-label={active ? '정지' : '재생'}
                >
                  {active ? (
                    <svg viewBox="0 0 24 24" width="16" height="16"><rect x="5" y="4" width="4" height="16" fill="currentColor" /><rect x="15" y="4" width="4" height="16" fill="currentColor" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="16" height="16"><path d="M6 4l14 8-14 8V4z" fill="currentColor" /></svg>
                  )}
                </button>

                <div className="audio-card__body">
                  <div className="audio-card__top">
                    <h3>{post.place}</h3>
                    <span>{post.date}</span>
                  </div>
                  <p>{post.desc}</p>
                  <div className="audio-card__wave">
                    <Waveform bars={46} playing={active} />
                  </div>
                  <div className="audio-card__bar">
                    {active && (
                      <span
                        key={post.id}
                        className="audio-card__progress"
                        style={{ '--secs': `${post.seconds}s` }}
                        onAnimationEnd={() => setActiveId(null)}
                      />
                    )}
                  </div>
                  <div className="audio-card__foot">
                    <span>{post.time}</span>
                    <span className="audio-card__onlyplay">REC · ONE-WAY</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
