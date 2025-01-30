import React, { useState, useEffect } from 'react';



type EyePosition = 'center' | 'left' | 'right';

const AnimatedBotIcon = ({ size = 32, isLoading = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);
    const [eyePosition, setEyePosition] = useState<EyePosition>('center');

    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true); // Start blinking
            
            setTimeout(() => {
                setIsBlinking(false); // Stop blinking after 200ms
            }, 200); 
        }, Math.random() * 4000 + 4000);
    
        return () => clearInterval(blinkInterval);
    }, []);



    // Eye movement
    useEffect(() => {
        const moveEyes = () => {
        const positions: EyePosition[] = ['left', 'right', 'center'];
        const currentIndex = positions.indexOf(eyePosition);
        const nextPosition = positions[(currentIndex + 1) % positions.length];
        setEyePosition(nextPosition);
        };
    
        const moveInterval = setInterval(() => {
        if (!isHovered) moveEyes();
        }, Math.random() * 3000 + 2000);
        
        return () => clearInterval(moveInterval);
}, [isHovered, isBlinking, eyePosition]);


const handleInteraction = () => {
    setIsHovered(true);
    setIsBlinking(false);
};

useEffect(() => {
    if (isLoading) {
    setIsHovered(false);
    }
}, [isLoading]);

const getEyeTransform = (baseX: number) => {
    if (isHovered || isBlinking) return '';
    switch (eyePosition) {
    case 'left': return `translate(-1, 0)`;
    case 'right': return `translate(1, 0)`;
    default: return '';
    }
};

return (

    <svg
    viewBox="0 0 58 62"
    width={size}
    height={size}
    onMouseEnter={handleInteraction}
    onMouseLeave={() => setIsHovered(false)}
    className={`transition-all duration-300 ease-in-out ${isLoading ?  'animate-spin' : ''}`}
    >


    {isLoading ? ( 
        // Loading spinner version of the icon
        <>
        <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="opacity-25"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
        </>
    ) : (
        <>


<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 62"

>


<path id="outline" d="M26.46.05c5.64-.36,21.74.95,22.14,7.45-.12,1.83-1.44,4.27-2.43,5.89-.48.73-.74,1.34-.44,2.22.4,1.27.84,2.66.9,4.07-.12,4-.2,8.99,4.66,13.04.71.81,1.98,1.09,1.67,2.14-.15.39-.7,1.02-1.2,1.34-1.51,1.08-3.65,1.79-5.62,2.41-.26.12-.67.21-.69.45-.03.3,1.08.7,1.54.88,7.23,2.75,10.02,6.43,10.74,13.15.18,2.6,1.24,8.34-2.68,8.8-5.29.01-47.9.1-52.1.11-1.07.02-2.28-.98-2.61-1.97-.74-2.69-.11-5.68.25-8.36.86-5.61,4.99-9.97,10.99-12.04,3.21-1.02.12-1.27-1.26-1.68-1.84-.64-7.46-2.78-4.98-4.55,8.07-4.53,5.05-11.37,7.21-17.54.35-1.04-.04-1.96-.7-2.8-.82-1.31-1.43-3.07-2-4.48-.51-1.31-.48-2.59.49-3.65C13.01,2.36,21.53.47,26.28.07h.18Z" fill="#343333"/>

<path id="hair" d="M26.52,1.5c5-.33,19.08,1.09,20.68,5.75-.01.34-2.01,5.57-2.82,5.93-6.89-4.92-23.06-4.97-29.98-.38-1.2.48-1.72-.83-2.57-3.14C8.06,3.11,21.95,2.41,26.52,1.5Z" fill="black"/>
<path id="face" d="M21.24,12.63c1.15.14,2.09.94,3.19,1.79,3.26,2.78,8.09,3.26,12.5,3.55,3.75.08,6.15.71,5.78,3.74-.96,7.09-8.86,14.91-16.44,12.43-4.85-1.92-8.88-5.49-10.46-10.14-.88-2.47-1.25-5.05-.32-7.32.91-2.34,3.64-4.25,5.6-4.07l.16.02Z" 
fill="#FAD7B0"/>
<g id="neck">
    <path d="M36.13,37.74c.77,4.15-3.84,7.71-8.36,6.83-2.21-.66-4.77-2.12-5.34-4.1-.35-1.37-.16-2.77-.1-4.18.09-.94-.03-2.06.4-2.37.77-.35,1.67.39,2.53.61,3,1.3,6.68.55,9.54-.61.47-.15.91-.01,1.23.29" 
    fill="#FAD7B0"/>
</g><path id="shirt" d="M20.29,38.77c.61.25.5,1.31.7,1.91,1.05,4.51,9.39,6.29,13.91,2.81,1.33-.9,2.08-2.47,2.49-3.81.23-.58.47-.82,1.02-.79,6.64,1.32,14.23,3.51,16.87,9.56.81,2.92.96,7.1,1.07,10.17.03,1.19-1.22,2.31-2.43,2.29-5.67.25-41.87-.19-50.58-.18-1.54-.05-1.65-1.75-1.67-2.9-.15-7.21,2.06-13.59,9.64-16.53,2.59-.95,6.65-2.52,8.88-2.56l.1.03Z" fill="#eaeaea"/>
<path id="crossbig" d="M42.31,45.83c.14-.11.86-.08.9-.08.4.01,1,.04,1.14.35.17.44-.01,1.28.17,1.81.34,1.46,3.68-.25,3.52,1.5,0,.36-.03.88-.33,1.07-.4.37-2.32-.1-3.05.41-.19.24-.18.85-.23,1.46-.03.52-.06.89-.31,1.04-.46.18-1.21.17-1.59.04-.82-.35-.38-1.65-.58-2.36-.17-.38-.36-.45-.91-.45-.69-.09-2.29.15-2.78-.2-.17-.47-.11-1.15,0-1.6.1-.3.47-.25,1.12-.24.79-.04,1.83.22,2.41-.13.44-.3.1-2.24.43-2.53l.1-.07Z" 
fill="#D72638"/>
<path id="hat" d="M26.52,1.5c5-.33,19.08,1.09,20.68,5.75-.01.34-2.01,5.57-2.82,5.93-6.89-4.92-23.06-4.97-29.98-.38-1.2.48-1.72-.83-2.57-3.14C8.06,3.11,21.95,2.41,26.52,1.5Z" fill="#eaeaea"/>
<path id="cross" 
d="M28.54,3.65c.73-.03,1.27-.12,1.42.44.07.33-.14.98.34,1.31.43.25,1.1.03,1.57.26.32.23.3.78-.15.89-.64.23-1.69.05-1.75.38-.12.31.05,1.22-.59,1.34-.24,0-.37.11-.77-.19-.14-.19-.07-.86-.16-.87-.15-.41-.53-.59-1.01-.55-.67.05-1.21.02-1.09-.76.05-.43.51-.3,1.04-.33.41-.05.95-.22.98-.61.1-.48-.16-1.13.07-1.28l.1-.04Z" 
fill="#D72638"/>

{isBlinking ? (
  <line
    id="blink-line-left"
    x1="21"
    y1="23"
    x2="26"
    y2="23"
    stroke="black"
    strokeWidth="1"
    strokeLinecap="round"
  />
) : isHovered ? (
    <path 
    id="left-eye-smile" 
    d="M22.41,24.23c.56-.69,1.42-1.15,2.57-1.15,0,0,.01,0,.02,0,0-.21.01-.41,0-.63-.08-1.96-.78-3.48-1.57-3.4-.79.08-1.36,1.73-1.28,3.68.02.55.1,1.06.21,1.52.02,0,.03-.01.05-.02Z" 
    fill="#2f3031"/>
) : (
    <ellipse
    id="left-eye"
    cx="23.58"
    cy="22.57"
    rx="1.43"
    ry="3.55"
    fill="black"
    transform={getEyeTransform(0)}
  />
)}

{isBlinking ? (
  <line
    id="blink-line-right"
    x1="34"
    y1="23"
    x2="39"
    y2="23"
    stroke="black"
    strokeWidth="1"
    strokeLinecap="round"
  />
) : isHovered ? (
    <path 
    id="right-eye-smile" 
    d="M36.9,24.2s.09.04.13.06c.11-.46.19-.97.21-1.52.08-1.96-.5-3.61-1.28-3.68-.79-.08-1.49,1.45-1.57,3.4,0,.22,0,.43,0,.63,1.12.01,1.95.45,2.51,1.11Z" 
    fill="#2f3031"/>
) : (
    <ellipse
    id="right-eye"
    cx="35.81"
    cy="22.58"
    rx="1.43"
    ry="3.55"
    fill="black"
    transform={getEyeTransform(0)}
 

  />
)}









</svg>

</>
    )}
    </svg>
);
}



export default AnimatedBotIcon; 