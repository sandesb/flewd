import React from 'react';

const BodySilhouette = ({ animatedLevel }) => {
  const femaleBodyPath = "M50 15 C45 15 40 20 40 28 C40 35 45 40 50 40 C55 40 60 35 60 28 C60 20 55 15 50 15 Z M50 45 C45 45 42 48 42 52 L42 85 C42 88 40 90 38 92 L35 120 C34 125 32 130 30 135 L30 180 C30 185 35 190 40 190 C45 190 48 185 48 180 L48 140 L52 140 L52 180 C52 185 55 190 60 190 C65 190 70 185 70 180 L70 135 C68 130 66 125 65 120 L62 92 C60 90 58 88 58 85 L58 52 C58 48 55 45 50 45 Z";

  // Arms change position based on hydration level
  const getArmsPath = (level) => {
    if (level >= 100) {
      // Raised arms for celebration
      return "M42 60 C30 40 30 20 40 10 M58 60 C70 40 70 20 60 10";
    } else {
      // Normal arms
      return "M42 60 C30 80 30 110 40 120 M58 60 C70 80 70 110 60 120";
    }
  };

  const armsPath = getArmsPath(animatedLevel);
  const isCelebrating = animatedLevel >= 100;

  return (
    <div className="flex justify-center mb-6">
      <div className={`relative ${isCelebrating ? 'animate-bounce mt-10' : ''}`}>
        <svg width="200" height="300" viewBox="0 0 100 200" className="overflow-visible">
          <defs>
            {/* Gradient for water */}
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
            
            {/* Water animation pattern */}
            <pattern id="wave" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
              <path d="M0,5 Q5,0 10,5 T20,5" stroke="#ffffff" strokeWidth="0.5" fill="none" opacity="0.3">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 20,0; 0,0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
            </pattern>

            {/* Clip path for body shape */}
            <clipPath id="bodyClip">
              <path d={femaleBodyPath} />
            </clipPath>
          </defs>

          {/* Body outline */}
          <path
            d={femaleBodyPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            className="transition-all duration-500"
          />
          
          {/* Arms - change position based on hydration level */}
          <path
            d={armsPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            className="transition-all duration-500"
          />

          {/* Water fill */}
          <g clipPath="url(#bodyClip)">
            <rect
              x="0"
              y={200 - (animatedLevel * 2)}
              width="100"
              height={animatedLevel * 2}
              fill="url(#waterGradient)"
              className="transition-all duration-100"
            />
            <rect
              x="0"
              y={200 - (animatedLevel * 2)}
              width="100"
              height={animatedLevel * 2}
              fill="url(#wave)"
            />
            
            {/* Water surface animation */}
            <ellipse
              cx="50"
              cy={200 - (animatedLevel * 2)}
              rx="45"
              ry="2"
              fill="#ffffff"
              opacity="0.3"
            >
              <animate
                attributeName="rx"
                values="45;40;45"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0.6;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </ellipse>
          </g>

          {/* Bubbles animation */}
          {[...Array(3)].map((_, i) => (
            <circle
              key={i}
              r="1"
              fill="#ffffff"
              opacity="0.6"
            >
              <animate
                attributeName="cy"
                values={`${190 - (animatedLevel * 1.8)};${180 - (animatedLevel * 1.8)};${170 - (animatedLevel * 1.8)}`}
                dur={`${2 + i * 0.5}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                values={`${40 + i * 10};${45 + i * 10};${40 + i * 10}`}
                dur={`${2 + i * 0.5}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.6;0"
                dur={`${2 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default BodySilhouette;
