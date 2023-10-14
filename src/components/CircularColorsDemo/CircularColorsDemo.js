"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import { Pause, Play, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [playing, setPlaying] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  function reset() {
    setTimeElapsed(0);
    setPlaying(false);
  }

  React.useEffect(() => {
    let interval = null;
    if (playing) {
      setTimeElapsed((t) => t + 1);
      interval = setInterval(() => {
        setTimeElapsed((t) => t + 1);
      }, 1000);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, [playing]);

  const selectedColor = COLORS[timeElapsed % 3];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId="selected-color"
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={() => setPlaying(!playing)}>
            {playing ? <Pause /> : <Play />}
            <VisuallyHidden>{playing ? "Pause" : "Play"}</VisuallyHidden>
          </button>
          <button onClick={() => reset()}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
