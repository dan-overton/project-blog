"use client";
import { MotionConfig } from "framer-motion";

function ReduceMotionContainer({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export default ReduceMotionContainer;
