import React from 'react'
import { motion } from 'framer-motion'

const FloatingShape = ({ color, size, top, left, delay}) => {
  return (
    <motion.div
    // -- الإصلاح المهم هنا --
    className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl ${top} ${left}`}
        animate={{
            y: ["0%", "100%", "0%"],
            x: ["0%", "100%", "0%"],
        }}
        transition={{
            duration: 20,
            ease: "linear", 
            repeat: Infinity,
            delay
        }} 

        aria-hidden="true"
/>
  );
};

export default FloatingShape