import * as React from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { Progress } from "./progress";
import { ComponentProps } from "react";

interface ProgressWithConfettiProps extends ComponentProps<typeof Progress> {
  value: number;
  withConfetti?: boolean;
}

export function ProgressWithConfetti({
  value,
  withConfetti = false,
  ...props
}: ProgressWithConfettiProps) {
  return (
    <>
      <Progress value={value} {...props} />
      {withConfetti && value === 100 && (
        <Fireworks
          autorun={{ speed: 3, duration: 2000 }}
          style={{
            position: "fixed",
            pointerEvents: "none",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            zIndex: 9999,
          }}
        />
      )}
    </>
  );
}
