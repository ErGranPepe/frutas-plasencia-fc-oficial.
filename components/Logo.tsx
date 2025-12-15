import React, { useId } from 'react';

export const Logo = ({ className = "w-20 h-20" }: { className?: string }) => {
  const curveId = useId();
  const bottomCurveId = useId();

  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Background Circle */}
      <circle cx="50" cy="50" r="48" fill="#FF6B00" />
      
      {/* Inner Ring (Border) */}
      <circle cx="50" cy="50" r="44" fill="none" stroke="white" strokeWidth="2.5" />
      
      {/* Crown */}
      <g transform="translate(50, 32)">
         {/* Cross on top */}
         <path d="M0 -14 V-8 M-3 -11 H3" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
         
         {/* Crown Body */}
         <path 
           d="M-14 -6 L-12 6 H12 L14 -6 L7 0 L0 -9 L-7 0 Z" 
           fill="none" 
           stroke="white" 
           strokeWidth="2.5" 
           strokeLinejoin="round" 
         />
         
         {/* Dots on tips */}
         <circle cx="-14" cy="-6" r="1.5" fill="white" />
         <circle cx="14" cy="-6" r="1.5" fill="white" />
         <circle cx="0" cy="-9" r="1.5" fill="white" />
         
         {/* Crown Base Detail */}
         <path d="M-9 3 H9" stroke="white" strokeWidth="1" strokeLinecap="round" />
         <circle cx="0" cy="3" r="1" fill="white" />
      </g>
      
      {/* Text FP - Big Serif Font */}
      <text x="50" y="68" textAnchor="middle" fill="white" fontSize="30" fontFamily="serif" fontWeight="900" letterSpacing="1">FP</text>
      
      {/* Curved Text Paths */}
      
      {/* Top Curve for FRUTAS (Left to Right, curving Up) */}
      <path id={curveId} d="M 22 50 A 28 28 0 0 1 78 50" fill="transparent" />
      <text width="100">
        <textPath href={`#${curveId}`} startOffset="50%" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="900" letterSpacing="1" fontFamily="sans-serif">
          FRUTAS
        </textPath>
      </text>
      
      {/* Bottom Curve for PLASENCIA (Right to Left, curving Down to keep text upright) */}
      <path id={bottomCurveId} d="M 79 50 A 29 29 0 0 1 21 50" fill="transparent" />
      <text width="100">
        <textPath href={`#${bottomCurveId}`} startOffset="50%" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="900" letterSpacing="1" fontFamily="sans-serif">
          PLASENCIA
        </textPath>
      </text>
    </svg>
  );
};