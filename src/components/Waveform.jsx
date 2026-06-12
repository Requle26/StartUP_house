import './Waveform.css';

export default function Waveform({ bars = 28, playing = true, className = '' }) {
  return (
    <div className={`waveform ${playing ? 'is-playing' : 'is-paused'} ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          style={{
            '--d': `${(i % 7) * 0.09}s`,
            '--h': `${28 + ((i * 37) % 72)}%`,
          }}
        />
      ))}
    </div>
  );
}
