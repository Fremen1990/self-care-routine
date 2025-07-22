import React, { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import { ConfettiMethods, PIConfetti } from 'react-native-fast-confetti';

interface ProgressConfettiProps {
  progress: number;
  scrollY: number;
  colors: string[];
  blastRadius?: number;
  count?: number;
  fallDuration?: number;
}

export const ProgressConfetti = ({
  progress,
  scrollY,
  colors,
  blastRadius = 200,
  count = 200,
  fallDuration = 5000
}: ProgressConfettiProps) => {
  const confettiRef = useRef<ConfettiMethods>(null);
  const hasShownConfetti = useRef(false);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (progress === 100 && !hasShownConfetti.current) {
      setTimeout(() => {
        confettiRef.current?.restart();
      }, 100);
      hasShownConfetti.current = true;
    } else if (progress < 100) {
      hasShownConfetti.current = false;
    }
  }, [progress]);

  return (
    <PIConfetti
      ref={confettiRef}
      count={count}
      colors={colors}
      blastRadius={blastRadius}
      blastPosition={{
        x: screenWidth / 2,
        y: 150 + scrollY
      }}
      autoplay={false}
      isInfinite={false}
      fadeOutOnEnd={true}
      fallDuration={fallDuration}
    />
  );
};

