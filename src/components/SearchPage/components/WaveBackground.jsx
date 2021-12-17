import Wave from 'react-wavify';

const WaveBackground = () => {
  return (
    <Wave
      mask="url(#mask)"
      fill="#52b788"
      style={{
        position: 'absolute',
        bottom: '0',
        height: '100px',
        zIndex: '-3',
      }}
      options={{
        height: 20,
      }}
    >
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="0" stopColor="white" />
          <stop offset="0.5" stopColor="black" />
        </linearGradient>
        <mask id="mask">
          <rect x="0" y="0" width="3000" height="150" fill="url(#gradient)" />
        </mask>
      </defs>
    </Wave>
  );
};

export default WaveBackground;
