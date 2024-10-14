import React, { useEffect, useState } from 'react';
// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const BodyDiagram = ({
selectedSymptoms,
handleSymptomClick,
setSelectedBodyPart, 
}) => {
const [hoveredPart, setHoveredPart] = useState(null);
const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
const [tapPart, setTapPart] = useState(null); 
const [isTouchDevice, setIsTouchDevice] = useState(false); 

useEffect(() => {
    const isTouchDevice = 
      'ontouchstart' in window || window.matchMedia('(hover: none)').matches;
    setIsTouchDevice(isTouchDevice);
  }, []);


  const handlePartTap = (part) => {
    if (isTouchDevice) {
      if (tapPart === part) {
        // Second tap, open the sidebar
        setSelectedBodyPart(part);
        setTapPart(null); 
      } else {
        // First tap, show tooltip or highlight
        setTapPart(part);
        setHoveredPart(part);
      }
    } else {
      // For non-touch devices (like desktop), just open the sidebar immediately
      setSelectedBodyPart(part);
    }
  };



const handleMouseEnter = (part) => {
setHoveredPart(part);
setTooltipPosition({ x: event.clientX, y: event.clientY });
};


const handleMouseLeave = () => {
setHoveredPart(null);
};

const isSymptomSelected = (bodyPart) => {
return selectedSymptoms.some((item) => item.bodyPart === bodyPart);
};

return (
    <div className="body-diagram-container">
        
<svg
    version="1.1"
    id="Body"
    x="0px"
    y="0px"
    viewBox="0 0 411.02 740.02"
        preserveAspectRatio="xMidYMid meet"
        
>
    <style type="text/css">
    {`
    .st0 { stroke: #231F20; stroke-width: 0.25; stroke-miterlimit: 10; }
    .st1 { fill: var(--model-color); } 
    .clickable { cursor: pointer; }
    .selected { fill: #FFD700; } 
    .hovered { fill: #3498db; } 
    `}
    </style>
    <g
        id="Hips"
        className="clickable"
        onClick={() => handlePartTap('Hips')}
        onMouseEnter={() => handleMouseEnter('Hips')}
        onMouseLeave={handleMouseLeave}
        >
            <path
            id="Right_Hip"
            className={`st1 ${isSymptomSelected('Hips') ? 'selected' : ''}
            ${hoveredPart === 'Hips' ? 'hovered' : ''}`}
            d="M184.25,331.33l-0.04-0.07c0.48,1.6,0.97,3.21,1.79,5.92c-3.21-0.98-5.93-1.22-7.94-2.55
            c-6.11-4.06-12.45-8-17.73-13c-6.19-5.86-11.82-12.37-16.08-19.99c-3.19-5.71-6.54-11.38-6.6-17.96
            c-0.04-5.4,1.19-10.83,2.04-16.21c0.45-2.87,1.19-5.7,1.96-8.5c0.2-0.74,0.98-1.31,1.5-1.96c0.64,0.52,1.5,0.92,1.89,1.59
            c4.1,6.97,10,11.98,17.12,15.55c3.04,1.53,4.15,3.67,4.49,7c0.71,7,1.13,14.21,3.19,20.86c2.38,7.67,6.3,14.88,9.77,22.19
            c1.21,2.54,3.08,4.77,4.65,7.14L184.25,331.33z"
        />
        <path
            id="Left_Hip"
            className={`st1 ${isSymptomSelected('Hips') ? 'selected' : ''} ${hoveredPart === 'Hips' ? 'hovered' : ''}`}
            d="M224.07,331.9c2.2-3.66,4.69-7.18,6.53-11.01c2.7-5.61,5.47-11.29,7.25-17.22
            c2.36-7.85,4.99-15.75,4.33-24.21c-0.19-2.4,1.09-3.78,3.45-5.01c6.36-3.31,12.25-7.4,16.1-13.76c0.3-0.5,0.77-0.91,1.17-1.35
            c2.51-2.75,3.82-2.74,4.59,0.77c2.36,10.74,5.28,21.6,1.32,32.54c-2.32,6.4-6.04,12.12-10.52,17.28
            c-3.29,3.79-6.41,7.77-9.98,11.27c-6.35,6.23-13.28,11.75-21.81,14.81c-1.17,0.42-2.47,0.47-4.31,0.8
            c0.83-2.08,1.41-3.54,1.99-4.99l-0.11,0.11L224.07,331.9z"
        />
        </g>


<g 
    id="Neck"
    className="clickable"
    onClick={() => handlePartTap('Neck')}
    onMouseEnter={() => handleMouseEnter('Neck')}
    onMouseLeave={handleMouseLeave}
>
<g id="Upper_Neck">
    <path id="Neck_Path"
    className={`st1 ${
    isSymptomSelected('Neck') ? 'selected' : ''
    } ${hoveredPart === 'Neck' ? 'hovered' : ''}`}
   d="M210.81,113.6c1.18-8.44,6.76-14.26,12.15-20.16c1.94-2.12,4.21-3.92,6.25-5.96
        c0.32-0.32,0.17-1.09,0.24-1.66c-0.64,0-1.38-0.18-1.91,0.07c-1.7,0.79-3.36,1.71-4.98,2.65c-2.13,1.24-5.01,2.06-6.18,3.93
        c-2.89,4.65-5.35,9.66-7.3,14.79c-2.01,5.28-2.81,10.89-1.6,17.54C209.12,121.06,207.62,116.54,210.81,113.6z"/>
    <path id="Right_Upper_Neck" 
    className={`st1 ${
    isSymptomSelected('Neck') ? 'selected' : ''
    } ${hoveredPart === 'Neck' ? 'hovered' : ''}`}
    d="M201.25,114.57c-1.83-6.03-4.53-11.79-6.52-17.78c-2.34-7.03-8.57-7.99-14.5-9.8
        c7.15,9.31,16.56,17.2,17.84,29.88c0.73,2.46,1.58,4.56,2.86,6.63c0.2-0.12,0.35-0.23,0.41-0.34l0,0l0,0
        c0.02-0.03,0.05-0.07,0.05-0.09C201.56,120.23,202.05,117.19,201.25,114.57L201.25,114.57z"/>
</g>
<g id="Side_Neck">
    <path id="Left_Side_Neck" 
    className={`st1 ${
    isSymptomSelected('Neck') ? 'selected' : ''
    } ${hoveredPart === 'Neck' ? 'hovered' : ''}`}
    d="M230.66,89.16c-7.74,7.37-14.79,14.78-18.89,24.42c-0.27,0.63-0.52,1.26-0.76,1.9
        c-0.25-0.65-0.3-1.15-0.24-1.64c0.01-0.08,0.03-0.16,0.04-0.25c-3.19,2.94-1.69,7.45-3.33,11.2c0.03,0.16,0.04,0.32,0.08,0.48
        c3.2-1.92,6.25-3.15,8.52-5.23c4.35-4.01,8.44-8.36,12.26-12.88c1.84-2.18,3.72-4.98,4-7.66
        C232.68,96.26,231.34,92.85,230.66,89.16L230.66,89.16z"/>
    <path id="Right_Side_Neck" 
        className={`st1 ${
    isSymptomSelected('Neck') ? 'selected' : ''
    } ${hoveredPart === 'Neck' ? 'hovered' : ''}`}
    d="M198.13,117.35c-4.69-11.27-11.7-20.83-21.2-29.09c-0.32,3.95-0.86,7.47-0.8,10.99
        c0.03,1.81,0.72,3.88,1.77,5.37c4.2,5.91,8.82,11.52,14.82,15.74c1.97,1.38,4.08,2.61,6.26,3.61c0.4,0.18,1.37-0.13,1.94-0.47
        c-1.28-2.07-2.13-4.17-2.86-6.63c0.02,0.16,0.05,0.32,0.06,0.48H198.13z"/>
</g>
<g id="Lower_Neck"
    className="clickable">

    <path id="Left_Lower_Neck"
    className={`st1 ${
    isSymptomSelected('Neck') ? 'selected' : ''
    } ${hoveredPart === 'Neck' ? 'hovered' : ''}`}
    d="M213.21,126.25c0.37-0.55,0.63-1.23,1.12-1.63c6.87-5.56,13.42-11.46,18.28-18.91
        c1.24-1.89,2.51-1.91,4.05-1.29c7.6,3.07,15.16,6.24,23.04,9.5c-14.14,9.22-30.84,8.62-45.98,13.53
        C213.55,127.05,213.38,126.65,213.21,126.25L213.21,126.25z"/>

    <path id="Right_Lower_Neck" 
    className={`st1 ${
    isSymptomSelected('Neck') ? 'selected' : ''
    } ${hoveredPart === 'Neck' ? 'hovered' : ''}`}

    d="M194.4,127.37c-15-4.76-31.5-4.2-46.01-13.59c3.9-1.48,7.11-2.64,10.29-3.91
        c4.32-1.73,8.63-3.49,12.9-5.34c2.17-0.94,3.22-0.27,4.71,1.61c3.72,4.72,7.87,9.12,12,13.51c2.13,2.27,4.57,4.25,6.87,6.37
        L194.4,127.37z"/>
</g>
</g>
<g 
    id="Throat"
    className="clickable"
    onClick={() => handlePartTap('Throat')}
    onMouseEnter={() => handleMouseEnter('Throat')}
    onMouseLeave={handleMouseLeave}
    >
    <path
        id="Throat_Path"
        className={`st1 ${isSymptomSelected('Throat') ? 'selected' : ''} ${hoveredPart === 'Throat' ? 'hovered' : ''}`}
        d="M195.16,92.47c2.91,8.59,5.9,17.45,9.09,26.86c3.28-4.16,1.89-9.45,3.8-13.72c1.93-4.32,3.59-8.76,5.36-13.14
        H195.16z"
    />
    </g>

        

{/* Legs */}
<g id="Legs-2" className="clickable">
{/* <g id="Legs-2" onClick={() => handleSymptomClick('Legs', category.name)}> */}
<g
id="Calves"
className={`st1 ${isSymptomSelected('Calves', 'Legs') ? 'selected' : ''} ${hoveredPart === 'Calves' ? 'hovered' : ''}`}
onClick={() => handlePartTap('Calves', 'Legs')}
onMouseEnter={() => handleMouseEnter('Calves')}
onMouseLeave={handleMouseLeave}
>
        <path 
        id="Right_Calf" 
        d="M196.25,667.11c-3.7-3.71-7.16-7.71-11.15-11.08c-5.72-4.82-9.4-10.98-12.35-17.6
            c-3.59-8.07-6.85-16.3-10.08-24.53c-1.58-4.01-2.91-8.13-4.11-12.27c-2.13-7.28-4.57-14.52-5.98-21.95
            c-1.94-10.21-2.17-20.63-0.52-30.94c0.95-5.93,2.11-11.92,4.06-17.57c3.01-8.74,7.01-17.09,12.71-24.49
            c0.16-0.21,0.53-0.25,1.32-0.59c0,1.66,0.13,3.1-0.02,4.51c-1.48,13.71-1.89,27.43,0.18,41.11c1.21,7.96,2.98,15.84,4.23,23.8
            c1.58,10.06,2.78,20.18,4.34,30.25c1.28,8.27,2.8,16.5,4.32,24.72c0.22,1.19,1.07,2.27,2.04,3.36c-0.24-2.24-0.25-4.54-0.75-6.72
            c-2.49-11-2.65-22.12-1.84-33.29c0.21-2.94,0.29-5.91,0.71-8.82c0.99-6.88,2.17-13.73,3.23-20.6c0.6-3.91,1.01-7.86,1.7-11.75
            c0.78-4.42,1.79-8.8,2.85-13.92c0.98,1.83,1.86,3,2.28,4.32c2.11,6.54,4.83,13.01,5.91,19.73c0.99,6.12,0.72,12.6,0,18.8
            c-1.6,13.58-3.96,27.06-5.76,40.61c-0.77,5.77-1.57,11.65-1.17,17.4c0.28,3.94,2.63,7.73,4.02,11.6
            c1.29,3.58,2.63,7.16,3.8,10.78c0.76,2.35,1.28,4.79,2.08,7.85c-1.6-0.27-2.7-0.46-3.8-0.65c-0.75-0.69-1.5-1.39-2.24-2.08
            L196.25,667.11z"/>
        <path id="Left_Calf" d="M209.94,669.69c-1.67,0.36-2.26-0.37-2.02-1.98c1.18-7.72,3.83-14.91,7.55-21.76
            c0.71-1.31,1.52-2.82,1.5-4.22c-0.13-7.42-0.08-14.89-0.9-22.25c-1.13-10.19-3.05-20.29-4.49-30.45
            c-0.96-6.75-2.08-13.52-2.31-20.31c-0.12-3.53,1.38-7.17,2.39-10.69c1.75-6.07,3.7-12.09,5.59-18.13
            c0.07-0.24,0.41-0.39,1.46-1.33c0.87,4.73,1.73,8.83,2.34,12.97c0.75,5.11,0.8,10.38,2.03,15.36c3.31,13.38,4.5,26.95,3.98,40.63
            c-0.35,8.99-1.76,17.94-2.68,26.91c-0.09,0.86-0.1,1.74,0.55,2.7c1.05-5.43,2.2-10.85,3.13-16.31
            c1.01-5.94,1.88-11.91,2.66-17.89c0.67-5.13,0.92-10.32,1.71-15.43c1.28-8.25,2.24-16.62,4.42-24.64
            c3.75-13.75,3.64-27.69,3.43-41.68c-0.07-4.91-0.83-9.82-1.27-14.72c0.26-0.12,0.52-0.24,0.78-0.36
            c0.96,1.04,2.14,1.96,2.85,3.15c4.47,7.55,8.45,15.26,11.31,23.68c3.44,10.11,4.35,20.41,4.26,30.81
            c-0.06,7.57-0.77,15.32-2.53,22.66c-2.46,10.26-5.96,20.29-9.43,30.28c-2.23,6.42-4.88,12.75-7.93,18.83
            c-3.36,6.7-6.66,13.55-12.14,18.91c-3.38,3.31-6.9,6.48-10.32,9.76c-0.93,0.89-1.72,1.91-2.56,2.86
            c-1.11,0.86-2.23,1.74-3.36,2.61L209.94,669.69z"/>
    </g>
    <path
        id="Left_Knee"
        className={`st1 ${isSymptomSelected('Knee', 'Legs') ? 'selected' : ''} ${hoveredPart === 'Knee' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Knees', 'Legs')}
        onMouseEnter={() => handleMouseEnter('Knee')}
        onMouseLeave={handleMouseLeave}
    d="M229.32,586.34c-0.42-1.14-1.06-2.26-1.22-3.44c-1.29-9.79-2.32-19.61-3.77-29.37
        c-0.99-6.68-1.77-13.56-4.09-19.81c-1.91-5.16-2.07-10.38-1.07-15.03c2.07-9.65,1.88-19.91,6.88-28.85
        c0.45-0.8,1.39-2.09,1.82-1.99c0.88,0.21,1.91,1.07,2.29,1.93c3.24,7.29,4.56,15.1,6.24,22.85c2.06,9.49,2.47,18.93,1.23,28.48
        c-1.33,10.17-2.71,20.34-4.33,30.47c-0.79,4.94-2.17,9.78-3.28,14.66c-0.24,0.03-0.47,0.07-0.71,0.1L229.32,586.34z"/>
    <path id="Right_Knee" 
    className={`st1 ${isSymptomSelected('Knee', 'Legs') ? 'selected' : ''} 
    ${hoveredPart === 'Knee' ? 'hovered' : ''}`}
    onClick={() => handlePartTap('Knees', 'Legs')}
    onMouseEnter={() => handleMouseEnter('Knee')}
    onMouseLeave={handleMouseLeave}
    d="M180.29,586.87c-0.8-1.42-1.56-2.22-1.71-3.11c-0.93-5.62-1.71-11.27-2.58-16.9
        c-0.85-5.48-1.88-10.93-2.61-16.43c-1.28-9.69-2.65-19.44-1.56-29.19c1.14-10.25,3.3-20.36,6.7-30.15c0.23-0.66,0.54-1.35,1-1.87
        c1.27-1.47,2.58-2.64,3.72,0.2c0.74,1.85,1.97,3.55,2.44,5.45c2.37,9.58,5.01,19.12,4.82,29.12c-0.09,4.66-0.58,9.09-2.17,13.67
        c-1.81,5.2-1.91,11-2.73,16.55c-1.5,10.15-2.98,20.31-4.48,30.46c-0.07,0.48-0.34,0.92-0.83,2.2L180.29,586.87z"/>
    
    <g id="Left_Foot" 
    className="clickable" >
    <path id="Left_Foot_Path"
        className={`st1 ${
            isSymptomSelected('Foot', 'Legs') ? 'selected' : ''
            } ${hoveredPart === 'Feet' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Feet')}
            onMouseEnter={() => handleMouseEnter('Feet')}
            onMouseLeave={handleMouseLeave}

        d="M209.02,720.78c0-7.44-0.7-14.22,0.23-20.77c0.68-4.81,3.19-9.47,5.49-13.88c1.32-2.53,3.71-4.58,5.86-6.59
        c3.26-3.04,6.71-5.86,10.12-8.73c0.5-0.42,1.17-0.62,2.31-1.21c-2.31,6.71,0.12,12.52,1.43,18.37c2.1,9.35,2.8,7.94-5.42,14.12
        c-3.39,2.55-7.09,4.72-10.27,7.49c-2.52,2.2-4.47,5.07-6.67,7.64C211.18,718.3,210.25,719.37,209.02,720.78L209.02,720.78z"/>
    <path id="Left_Toes" 
        className={`st1 ${
        isSymptomSelected('Toes') ? 'selected' : ''
        } ${hoveredPart === 'Toes' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Toes')}
        onMouseEnter={() => handleMouseEnter('Toes')}
        onMouseLeave={handleMouseLeave}
        d="M242.64,714.59c-0.02,0.3-0.12,0.62-0.06,0.91c1.7,7.99-4.79,10.11-9.6,13.41c-0.49,0.34-1.16,0.4-1.68,0.7
        c-7.11,4.01-8.02,3.71-9.73-4.01c-0.74-3.35-1.14-6.81-1.39-10.24c-0.21-2.88,1.34-4.9,3.8-6.44c3.34-2.09,6.61-4.32,9.72-6.73
        c1.04-0.81,1.59-2.31,2.23-3.57c0.75-1.46,1.84-1.57,2.33-0.18c1.85,5.26,3.45,10.61,5.14,15.93L242.64,714.59L242.64,714.59z"/>
    <path id="Left_Ankle" 
        className={`st1 ${
        isSymptomSelected('Ankles') ? 'selected' : ''
        } ${hoveredPart === 'Ankles' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Ankles')}
        onMouseEnter={() => handleMouseEnter('Ankles')}
        onMouseLeave={handleMouseLeave}
        d="M209.94,669.69c1.12-0.87,2.25-1.75,3.36-2.61c4.99-4.07,10.05-8.08,14.95-12.27
        c1.35-1.15,2.18-2.88,3.39-4.23c0.55-0.62,1.47-1.36,2.13-1.27c0.54,0.07,1.31,1.26,1.33,1.97c0.12,3.16,0.11,6.33-0.06,9.48
        c-0.19,3.46-2.68,5.64-5.06,7.63c-3.47,2.91-7.44,5.25-10.73,8.33c-2.28,2.14-4.08,4.97-5.53,7.78
        c-1.58,3.07-2.51,6.48-3.86,10.1c-2.19-3.19-1.87-19.3,0.09-24.91H209.94z"/>
    <path id="Left_Hallux" 
        className={`st1 ${
        isSymptomSelected('Hallux') ? 'selected' : ''
        } ${hoveredPart === 'Hallux' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Hallux')}
        onMouseEnter={() => handleMouseEnter('Hallux')}
        onMouseLeave={handleMouseLeave}
        d="M216.94,714.8c0.59,4.7,1.1,9.21,1.73,13.7c0.28,1.96,0.78,3.88,1.2,5.81
        c0.58,2.68-0.94,3.94-3.16,4.72c-0.86,0.3-1.74,0.61-2.64,0.75c-5.43,0.88-6.86-0.61-6.03-6.07c0.18-1.17,0.05-2.4-0.05-3.59
        c-0.41-4.79,4.37-13.04,8.95-15.33L216.94,714.8z"/>
</g>
    <g id="Right_Foot"
    className="clickable" >
    <path id="Right_Foot_Path"
        className={`st1 ${
            isSymptomSelected('Foot', 'Legs') ? 'selected' : ''
            } ${hoveredPart === 'Feet' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Feet')}
            onMouseEnter={() => handleMouseEnter('Feet')}
            onMouseLeave={handleMouseLeave}
        d="M198.97,720.26c-0.65-1.18-1.19-2.43-1.96-3.52c-5.52-7.9-13.93-12.48-21.27-18.27c-2.14-1.69-2.65-3.39-2.05-5.78
            c1.03-4.09,2.37-8.15,2.98-12.3c0.49-3.35,0.1-6.84,0.1-11.15c3.18,2.66,5.66,5.16,8.53,7.06c8.39,5.56,12.31,14.2,14.63,23.2
            c1.64,6.34,0.73,13.34,0.85,20.05c0,0.17-1.23,0.36-1.89,0.53L198.97,720.26L198.97,720.26z"/>
        <path id="Right_Toes" 
        className={`st1 ${
        isSymptomSelected('Toes') ? 'selected' : ''
        } ${hoveredPart === 'Toes' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Toes')}
        onMouseEnter={() => handleMouseEnter('Toes')}
        onMouseLeave={handleMouseLeave}
        d="M166.59,720.41c0.28-1.42,0.91-2.87,0.78-4.25c-0.56-5.75,1.53-10.94,3.09-16.26c0.5-1.7,1.34-2.09,2.72-0.93
            c3.36,2.81,6.48,5.98,10.11,8.4c7.02,4.69,8.05,7.35,5.1,15.95c-0.49,1.43-0.71,2.97-1.01,4.47c-0.88,4.38-3.38,5.46-7.33,2.95
            c-4.78-3.04-9.47-6.24-14.19-9.38c0.25-0.31,0.49-0.62,0.74-0.94L166.59,720.41z"/>
        
        <path id="Right_Ankle" 
        className={`st1 ${
            isSymptomSelected('Ankles') ? 'selected' : ''
            } ${hoveredPart === 'Ankles' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Ankles')}
            onMouseEnter={() => handleMouseEnter('Ankles')}
            onMouseLeave={handleMouseLeave}
        d="M196.25,667.11c0.75,0.69,1.5,1.39,2.24,2.08c0.77,2.15,2.08,4.28,2.21,6.47
            c0.34,5.48,0.17,11,0.14,16.5c0,0.5-0.42,0.99-0.89,2.03c-1.71-3.86-3-7.32-4.73-10.53c-1.29-2.4-2.87-4.79-4.84-6.64
            c-3.21-3.03-6.77-5.72-10.31-8.39c-3.87-2.91-6.24-6.46-5.93-11.49c0.12-1.93-0.08-3.89,0.12-5.8c0.08-0.76,0.84-1.44,1.28-2.16
            c0.7,0.46,1.5,0.81,2.08,1.38c3.72,3.62,7.3,7.4,11.13,10.9C191.05,663.56,193.73,665.24,196.25,667.11L196.25,667.11z"/>
        <path id="Right_Hallux" 
        className={`st1 ${
            isSymptomSelected('Hallux') ? 'selected' : ''
            } ${hoveredPart === 'Hallux' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Hallux')}
            onMouseEnter={() => handleMouseEnter('Hallux')}
            onMouseLeave={handleMouseLeave}
        d="M198.97,720.26l-0.07-0.18c0.24,0.87,0.35,1.82,0.75,2.6c2.24,4.36,2.31,9.07,2.32,13.78
            c0,2.26-1.26,3.77-3.62,3.52c-2.18-0.23-4.37-0.77-6.44-1.51c-0.72-0.26-1.39-1.47-1.52-2.33c-0.22-1.49-0.11-3.06,0.06-4.58
            c0.61-5.45,1.31-10.88,2.07-17.09c2.25,2.01,4.36,3.9,6.46,5.78L198.97,720.26z"/>
    </g>

    <g id="Thighs" className="clickable">
        <path id="Left_Front_Thigh"
        className={`st1 ${
            isSymptomSelected('Thighs') ? 'selected' : ''
            } ${hoveredPart === 'Thighs' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Thighs')}
            onMouseEnter={() => handleMouseEnter('Thighs')}
            onMouseLeave={handleMouseLeave}
        d="M265.2,316.58c-0.22,3.91-0.07,7.88-0.72,11.71c-2.04,11.89-1.89,23.85-1.61,35.82
            c0.29,12.51,1.46,25.04,0.94,37.51c-0.66,15.6-2.44,31.16-4.15,46.69c-0.96,8.72-2.94,17.31-4.17,26.01
            c-1.61,11.41-2.9,22.87-4.41,34.3c-0.24,1.84-0.93,3.62-1.45,5.56c-1.58-2.19-3.29-4.27-4.69-6.55
            c-3.76-6.14-7.3-12.42-11.09-18.55c-6.31-10.22-7.81-21.6-8.2-33.25c-0.27-7.94-0.9-15.91-0.49-23.82
            c0.46-8.87,1.05-17.91,3.17-26.48c2.11-8.5,6.2-16.5,9.42-24.72c0.04-0.09,0.06-0.19,0.1-0.28c2.09-4.96,4.24-9.88,6.25-14.87
            c3.43-8.5,6.86-17.01,10.15-25.57c2.59-6.75,4.92-13.59,7.48-20.35c0.5-1.31,1.51-2.43,2.28-3.64c0.4,0.16,0.79,0.31,1.19,0.47
            L265.2,316.58z"/>
        <path id="RIght_Front_Thigh"
        className={`st1 ${
            isSymptomSelected('Thighs') ? 'selected' : ''
            } ${hoveredPart === 'Thighs' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Thighs')}
            onMouseEnter={() => handleMouseEnter('Thighs')}
            onMouseLeave={handleMouseLeave}
        d="M146.01,316.18c1.25,2.88,2.65,5.71,3.73,8.66c2.4,6.55,4.5,13.22,6.98,19.74
            c2.91,7.63,6.06,15.17,9.18,22.72c4.25,10.3,8.85,20.48,12.75,30.91c2.06,5.51,3.07,11.43,4.4,17.19
            c2.71,11.7,2.39,23.64,1.67,35.45c-0.58,9.41-1.69,19.04-4.43,28c-2.35,7.69-7.15,14.68-11.2,21.79
            c-2.73,4.78-6.03,9.23-9.79,13.71c-0.12-1.03-0.25-2.06-0.36-3.09c-0.93-8.13-1.81-16.27-2.79-24.4
            c-0.66-5.45-1.37-10.9-2.22-16.33c-1.4-9-3.06-17.95-4.37-26.96c-1.17-8.09-2.59-16.21-2.89-24.35
            c-0.57-15.61-0.51-31.24-0.55-46.86c-0.03-10.51,0.43-21.03,0.27-31.54c-0.1-6.3-1-12.58-1.47-18.88
            c-0.13-1.78-0.02-3.59-0.02-5.38c0.37-0.12,0.74-0.25,1.11-0.37L146.01,316.18z"/>
        <path id="Left_Outer_Thigh" 
        className={`st1 ${
            isSymptomSelected('Thighs') ? 'selected' : ''
            } ${hoveredPart === 'Thighs' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Thighs')}
            onMouseEnter={() => handleMouseEnter('Thighs')}
        
        d="M271.4,306.73c1.01,5.51,2.2,10.99,2.99,16.54c0.88,6.13,1.44,12.31,2.06,18.48
            c0.41,4.01,1.19,8.08,0.92,12.06c-0.87,12.75-1.8,25.52-3.38,38.2c-1.45,11.63-3.75,23.16-5.73,34.73
            c-0.13,0.75-0.81,1.41-1.23,2.11c-0.32-0.11-0.65-0.22-0.97-0.33c0-1.16,0-2.33,0-3.49c-0.04-18.98-0.03-37.96-0.13-56.94
            c-0.04-7.53-0.62-15.07-0.39-22.59c0.21-7.07,0.94-14.16,1.84-21.18c0.76-5.88,2.1-11.68,3.18-17.51
            c0.28-0.02,0.56-0.05,0.84-0.07L271.4,306.73z"/>
        <path id="Right_Outer_Thigh" 
        className={`st1 ${ 
            isSymptomSelected('Thighs') ? 'selected' : ''
            } ${hoveredPart === 'Thighs' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Thighs')}
            onMouseEnter={() => handleMouseEnter('Thighs')}
            onMouseLeave={handleMouseLeave}
        d="M143.03,430.39c-0.55-1.24-1.02-1.94-1.16-2.7c-1.93-10.78-4.05-21.53-5.62-32.36
            c-1.34-9.2-2.33-18.48-2.93-27.76c-0.61-9.63-1.13-19.33-0.62-28.94c0.41-7.6,2.49-15.1,3.76-22.65
            c0.55-3.26,0.93-6.54,1.39-9.81c0.4-0.05,0.8-0.09,1.2-0.14c0.57,2.33,1.38,4.64,1.66,7.01c0.98,8.19,1.88,16.4,2.61,24.62
            c0.56,6.36,1.2,12.74,1.11,19.11c-0.29,19.95-0.94,39.89-1.4,59.84C142.93,420.99,143.02,425.38,143.03,430.39L143.03,430.39z"/>
        <g id="Pelvis" 
        className="clickable">
            <path id="Left_Pelvis" 
            className={`st1 ${
                isSymptomSelected('Pelvis') ? 'selected' : ''
                } ${hoveredPart === 'Pelvis' ? 'hovered' : ''}`}
                onClick={() => handlePartTap('Pelvis')}
                onMouseEnter={() => handleMouseEnter('Pelvis')}
                onMouseLeave={handleMouseLeave}

            d="M259.74,317.55c-0.94,3.13-1.62,6.37-2.87,9.38c-3.85,9.3-7.89,18.52-11.91,27.75
                c-1.41,3.24-3.04,6.38-4.45,9.62c-2.13,4.9-4.13,9.86-6.22,14.78c-3.76,8.89-7.61,17.74-11.26,26.67
                c-2.06,5.04-3.83,10.2-5.67,15.32c-1.67,4.65-3.25,9.33-4.94,13.98c-0.16,0.44-0.77,0.72-1.17,1.07
                c-0.31-0.53-0.84-1.04-0.89-1.59c-0.45-5.07-0.94-10.13-1.19-15.21c-0.51-10.17-0.95-20.35-1.29-30.53
                c-0.3-9.07-0.3-18.15-0.7-27.21c-0.12-2.86,1.3-4.36,3.3-5.7c9.13-6.14,18.67-11.75,27.28-18.54
                c6.98-5.51,12.84-12.45,19.22-18.74c0.6-0.6,1.37-1.03,2.06-1.54C259.27,317.22,259.5,317.38,259.74,317.55L259.74,317.55z"/>
            <path id="Right_Pelvis" 
            className={`st1 ${
                isSymptomSelected('Pelvis') ? 'selected' : ''
                } ${hoveredPart === 'Pelvis' ? 'hovered' : ''}`}
                onClick={() => handlePartTap('Pelvis')}
                onMouseEnter={() => handleMouseEnter('Pelvis')}
                onMouseLeave={handleMouseLeave}
            
            d="M150.28,316.87c1.7,1.57,2.98,2.51,3.95,3.7c6.32,7.73,13.68,14.32,21.9,19.94
                c8.31,5.68,16.73,11.2,24.99,16.96c0.91,0.64,1.56,2.33,1.55,3.53c-0.11,11.84-0.1,23.69-0.71,35.5
                c-0.67,13.06-1.96,26.08-2.99,39.12c-0.01,0.18-0.18,0.36-0.67,1.27c-0.67-1.1-1.27-1.8-1.55-2.61
                c-2.44-6.94-4.63-13.98-7.28-20.84c-3.65-9.42-7.53-18.75-11.5-28.04c-4.98-11.65-10.16-23.21-15.21-34.82
                c-2.9-6.67-5.79-13.35-8.52-20.1c-1.4-3.46-2.46-7.06-3.61-10.61c-0.23-0.7-0.18-1.49-0.35-2.99L150.28,316.87z"/>
            <path id="Genitals" 
            className={`st1 ${
                isSymptomSelected('Genitals') ? 'selected' : ''
                } ${hoveredPart === 'Genitals' ? 'hovered' : ''}`}
                onClick={() => handlePartTap('Genitals')}
                onMouseEnter={() => handleMouseEnter('Genitals')}
                onMouseLeave={handleMouseLeave}

            d="M215.78,351.23c-7.4,9.02-12.74,10.51-23.58-0.81C199.9,354.57,207.72,356,215.78,351.23z"/>
        </g>
        <path id="Right_Inner_Thigh" 
        className={`st1 ${
            isSymptomSelected('Inner Thighs') ? 'selected' : ''
            } ${hoveredPart === 'Inner Thighs' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Inner Thighs')}
            onMouseEnter={() => handleMouseEnter('Inner Thighs')}
            onMouseLeave={handleMouseLeave}
        d="M190,423.59c1.33,3.01,2.99,5.91,3.92,9.04c3.41,11.49,6.67,23.03,7.06,35.15
            c0.18,5.46,1.46,10.97,0.99,16.35c-0.88,9.89-2.56,19.72-4.19,29.53c-0.51,3.05-1.9,5.95-2.97,8.89
            c-0.24,0.67-0.82,1.21-1.24,1.81c-0.34-0.72-0.88-1.41-0.98-2.16c-1.04-8.16-1.77-16.37-3.11-24.49
            c-0.57-3.45-2.14-6.8-3.67-9.99c-1.77-3.67-1.37-7.34-0.55-10.97c3.65-16.13,3.02-32.5,3.04-48.85c0-1.46,0.28-2.92,0.43-4.38
            C189.15,423.54,189.58,423.57,190,423.59L190,423.59z"/>
        <path id="Left_Inner_Thigh" 
        className={`st1 ${
            isSymptomSelected('Inner Thighs') ? 'selected' : ''
            } ${hoveredPart === 'Inner Thighs' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Inner Thighs')}
            onMouseEnter={() => handleMouseEnter('Inner Thighs')}
            onMouseLeave={handleMouseLeave}
        d="M220.77,423.06c0.11,1.58,0.3,3.17,0.31,4.75c0.04,8.27-0.4,16.57,0.16,24.81
            c0.53,7.92,1.95,15.79,3.23,23.65c0.7,4.34,1.57,8.44-1.46,12.44c-1.19,1.58-1.26,3.99-1.89,6.01
            c-2.82,9.07-4.3,18.34-4.32,27.84c0,0.58-0.2,1.15-0.47,2.61c-0.94-1.25-1.71-1.86-1.91-2.61c-2.63-9.55-5.85-18.97-5.96-29.05
            c-0.06-5.19-0.77-10.4-0.48-15.57c0.5-8.81,0.84-17.74,2.57-26.35c1.82-9.03,5.17-17.76,7.93-26.6c0.25-0.81,1.04-1.45,1.58-2.17
            c0.24,0.08,0.49,0.16,0.73,0.25L220.77,423.06z"/>
    </g>
</g>
{/* <path id="Genitals-2" class="st1" d="M217.3,347.22c-7.4,9.02-12.74,10.51-23.58-0.81C201.42,350.56,209.24,351.99,217.3,347.22z"
    />
</g> */}
<g id="Chest" className="clickable">
<g id="Abdomen" 
    className="clickable">
    <path id="Left_Abdomen"
    className={`st1 ${
        isSymptomSelected('Abdomen') ? 'selected' : ''
        } ${hoveredPart === 'Abdomen' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Abdomen')}
        onMouseEnter={() => handleMouseEnter('Abdomen')}
        onMouseLeave={handleMouseLeave}
         d="M206.09,265.68c-0.41-3.5-1.21-7.02-1.12-10.51c0.11-4.11,0.78-8.24,1.68-12.26c0.22-0.96,2.25-2.08,3.52-2.16
        c10.71-0.71,21.17,0.27,30.7,5.78c1.02,0.59,2.15,2.14,2.13,3.22c-0.13,7.4-2.64,14.06-7.47,19.66c-1.13,1.32-3.18,2.11-4.96,2.55
        c-6.2,1.53-12.49,2.72-18.71,4.19c-4.47,1.06-6.13-0.09-6.15-4.61c0-1.94,0-3.88,0-5.82L206.09,265.68z"/>
    <path id="Left_Side_Abdomen"
    className={`st1 ${
        isSymptomSelected('Abdomen') ? 'selected' : ''
        } ${hoveredPart === 'Abdomen' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Abdomen')}
        onMouseEnter={() => handleMouseEnter('Abdomen')}
        onMouseLeave={handleMouseLeave}
    d="M224.18,331.8c-0.91,0.86-1.99,1.6-2.71,2.6c-4.06,5.61-9.54,8.39-16.69,8.96c0-2.91,0-5.45,0-7.98
        c0-8.78,0.17-17.57-0.06-26.35c-0.23-8.9,1.32-17.58,2.52-26.32c0.31-2.25,1.36-3.49,3.71-4.15c8.2-2.32,16.26-5.27,25-4.81
        c0.46,0.02,1.08-0.1,1.39-0.4c8.77-8.56,12.16-18.84,9.72-30.93c-0.74-3.68-1.67-7.32-2.46-10.99c-0.12-0.55,0.08-1.18,0.2-2.49
        c2.05,1.18,3.97,1.87,5.34,3.15c4.46,4.19,9.21,8.22,12.82,13.08c1.49,2.01,1.35,6.44,0.18,8.93c-2.16,4.6-5.25,8.79-9.18,12.38
        c-4.51,4.11-9.57,6.63-14.73,7.55c-0.6,6.79-0.85,13.27-1.83,19.63c-0.82,5.34-2.1,10.69-3.91,15.77
        c-2.36,6.61-5.46,12.95-8.23,19.41c-0.43,1-0.79,2.03-1.18,3.05l0.1-0.1L224.18,331.8z"/>
    <path id="Right_Side_Abdomen"
    className={`st1 ${
        isSymptomSelected('Abdomen') ? 'selected' : ''
        } ${hoveredPart === 'Abdomen' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Abdomen')}
        onMouseEnter={() => handleMouseEnter('Abdomen')}
        onMouseLeave={handleMouseLeave}
    d="M184.25,331.33c-1.69-3.54-3.36-7.08-5.06-10.61c-0.52-1.08-1.21-2.1-1.6-3.22c-3.01-8.65-5.68-17.38-6.61-26.56
        c-0.45-4.4-1.34-8.75-1.84-13.15c-0.12-1.08,0.49-2.24,0.6-2.69c-4.18-2.06-8.6-4.07-12.84-6.4c-1.7-0.93-3.27-2.37-4.44-3.93
        c-3.41-4.52-7.54-8.62-7.83-14.92c-0.27-5.91,3.87-9.03,7.32-12.57c2.24-2.3,4.86-4.24,7.41-6.21c1.05-0.81,2.37-1.28,3.57-1.9
        c0.26,0.18,0.52,0.37,0.78,0.55c-0.57,3.02-1.09,6.05-1.72,9.05c-0.42,2.02-1.26,3.98-1.47,6.01c-0.8,7.53,0.89,14.67,4.51,21.19
        c1.6,2.87,4.4,5.07,6.72,7.52c0.27,0.29,0.95,0.26,1.44,0.26c8.39-0.09,16.24,2.47,24.14,4.82c2.39,0.71,3.83,2.31,4.18,4.7
        c0.69,4.62,1.64,9.25,1.71,13.89c0.22,15.01,0.08,30.02,0.07,45.04c0,0.29-0.14,0.58-0.31,1.27c-4.79-0.62-9.27-1.87-12.76-5.42
        c-2.11-2.15-4-4.52-5.99-6.79l0.04,0.07L184.25,331.33z"/>
    <path id="Right_Abdomen"
    className={`st1 ${
        isSymptomSelected('Abdomen') ? 'selected' : ''
        } ${hoveredPart === 'Abdomen' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Abdomen')}
        onMouseEnter={() => handleMouseEnter('Abdomen')}
        onMouseLeave={handleMouseLeave}
    d="M202.69,261.22c0,3.57,0.02,7.15,0,10.72c-0.03,3.4-1.76,5.01-5,4.33c-7.68-1.6-15.39-3.1-22.93-5.23
        c-1.96-0.55-3.97-2.97-4.81-5c-2.03-4.9-3.56-10.03-4.96-15.16c-1.13-4.16,2.92-4.84,5.18-5.84c8.92-3.91,18.42-4.88,28.1-4.15
        c2.67,0.2,4.08,1.92,4.14,4.45c0.13,5.29,0.04,10.58,0.04,15.87c0.08,0,0.16,0,0.25,0L202.69,261.22z"/>
</g>
<g id="Upper_Chest" 
    className="clickable">
    <path id="Left_Upper_Chest"
    className={`st1 ${
        isSymptomSelected('Lungs') ? 'selected' : ''
        } ${hoveredPart === 'Lungs' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Lungs')}
        onMouseEnter={() => handleMouseEnter('Lungs')}
        onMouseLeave={handleMouseLeave}
        d="M268.95,250.42c-1.07-8.43-7.08-12.72-12.77-16.89c-6.7-4.91-11.42-10.54-13.02-18.31c-1.16-5.66-2.95-11.21-4.38-16.82
        c-0.43-1.7-0.83-3.44-0.88-5.17c-0.07-2.16,1.38-3.29,3.76-3.66c4.42-0.69,7.55,0.93,9.74,4.23c5.2,7.85,10.42,15.7,15.5,23.61
        c4.91,7.64,7.21,15.93,6.75,24.74c-0.1,1.98-0.88,3.98-1.67,5.86C271.65,248.79,270.45,249.27,268.95,250.42z"/>
    <path 
    id="Right_Upper_Chest"
    className={`st1 ${
        isSymptomSelected('Lungs') ? 'selected' : ''
        } ${hoveredPart === 'Lungs' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Lungs')}
        onMouseEnter={() => handleMouseEnter('Lungs')}
    
    d="M140.18,249.49c-1.86,0.13-2.4-2.04-2.73-3.79c-1.34-7.05-0.21-13.7,2.09-20.6c2.84-8.55,8.57-15.32,12.33-23.25
        c2-4.22,4.81-8.04,7.15-12.11c1.61-2.8,8.98-4.11,11.38-0.1c0.33,0.55,0.51,1.38,0.37,1.99c-1.34,5.93-2.71,11.85-4.16,17.75
        c-1.02,4.13-1.92,8.33-3.39,12.3c-0.75,2.04-2.42,3.89-4.03,5.45c-3.69,3.57-7.97,6.6-11.32,10.45c-2.95,3.4-4.97,7.61-7.68,11.91
        H140.18z"/>
    <g id="Lower_Chest" 
    className="clickable">
        <path id="Chest_Area_2"
        className={`st1 ${
            isSymptomSelected('Chest Area') ? 'selected' : ''
            } ${hoveredPart === 'Chest Area' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Chest Area')}
            onMouseEnter={() => handleMouseEnter('Chest Area')}
            onMouseLeave={handleMouseLeave}
        d="M166.63,219.36c1.38-6.15,2.54-11.44,3.77-16.72c0.25-1.06,0.99-2.03,1.12-3.09c0.79-6.12,4.45-9.75,9.99-11.77
            c3.34-1.22,6.68-2.53,10.14-3.29c1.37-0.3,3.34,0.4,4.51,1.32c5.25,4.09,7.35,9.59,7.01,16.25c-0.39,7.85,1.57,8.01-7.96,8.83
            c-8.38,0.73-16.4,2.79-23.87,6.81c-1.11,0.6-2.4,0.85-4.72,1.65L166.63,219.36z"/>
        <path 
        id="Right_Lower_Chest"
        className={`st1 ${
            isSymptomSelected('Upper Abdomen') ? 'selected' : ''
            } ${hoveredPart === 'Upper Abdomen' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Upper Abdomen')}
            onMouseEnter={() => handleMouseEnter('Upper Abdomen')}
            onMouseLeave={handleMouseLeave}
        
        d="M242.54,244.43c-1.89-0.96-3.75-2-5.68-2.86c-6.34-2.81-12.99-3.98-19.92-3.71c-1.33,0.05-2.65,0-3.98,0
            c-7.39,0-7.95-0.26-8.09-7.55c-0.09-4.61,0.63-9.26,1.32-13.85c0.13-0.88,1.7-2.08,2.72-2.2c10.3-1.21,19.81,1.29,28.35,7.04
            c2.45,1.65,4.38,4.1,4.7,7.41c0.48,5.02,1.08,10.02,1.63,15.03c-0.35,0.23-0.7,0.46-1.05,0.68L242.54,244.43z"/>
        <path 
        id="Chest_Area"
        className={`st1 ${
            isSymptomSelected('Heart') ? 'selected' : ''
            } ${hoveredPart === 'Heart' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Heart')}
            onMouseEnter={() => handleMouseEnter('Heart')}
            onMouseLeave={handleMouseLeave}
        
        d="M240.77,219.05c-1.54-0.6-3.11-1.12-4.6-1.82c-8.09-3.78-16.54-6.04-25.5-6.37c-4.68-0.17-5.85-1.4-5.69-6.25
            c0.17-5.22,0.12-10.57,3.41-15.08c1.24-1.7,2.56-3.39,4.11-4.78c0.68-0.61,2.2-0.88,3.07-0.56c5.39,1.97,10.77,4.03,16.01,6.37
            c1.28,0.57,2.55,2.12,2.99,3.49c1.99,6.23,3.69,12.55,5.48,18.84c0.52,1.84,0.98,3.7,1.46,5.55
            C241.26,218.64,241.02,218.85,240.77,219.05z"/>
        <path 
        id="Left_Lower_Chest"
        className={`st1 ${
            isSymptomSelected('Upper Abdomen') ? 'selected' : ''
            } ${hoveredPart === 'Upper Abdomen' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Upper Abdomen')}
            onMouseEnter={() => handleMouseEnter('Upper Abdomen')}
            onMouseLeave={handleMouseLeave}

        d="M162.3,244.18c-1.29-6.47,0.11-12.36,2.99-17.82c1.14-2.17,3.96-4.09,6.55-5.21c8.02-3.46,16.51-5.55,25.68-4.85
            c4.26,0.32,5.05,0.62,5.24,4.3c0.25,4.99,0.07,9.99,0.11,14.99c0.02,2.06-1.11,2.81-3.46,2.75c-4.06-0.1-8.13,0.02-12.2-0.03
            c-7.76-0.09-14.88,1.76-21.61,4.99c-0.96,0.46-2.15,0.58-3.29,0.87L162.3,244.18z"/>
    </g>
    <path 
    id="Chest_Area-3"
    className={`st1 ${
        isSymptomSelected('Chest Area') ? 'selected' : ''
        } ${hoveredPart === 'Chest Area' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Chest Areat')}
        onMouseEnter={() => handleMouseEnter('Chest Area')}
        onMouseLeave={handleMouseLeave}

    
    d="M272.2,228.89c-0.45-0.74-1-1.45-1.34-2.24c-2.25-5.25-4.14-10.69-6.76-15.75c-2.89-5.57-6.38-10.83-9.72-16.16
        c-2.29-3.66-1.67-7.32,2.08-9.36c4.15-2.26,8.48-4.19,12.73-6.28c2.46-1.21,3.69-0.16,3.89,2.26c1.04,12.77,2.11,25.54,0.75,38.36
        c-0.31,2.92-0.49,5.85-0.73,8.77C272.8,228.62,272.5,228.75,272.2,228.89L272.2,228.89z"/>
    <path 
    id="Chest_Area-4"
    className={`st1 ${
        isSymptomSelected('Chest Area') ? 'selected' : ''
        } ${hoveredPart === 'Chest Area' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Chest Area')}
        onMouseEnter={() => handleMouseEnter('Chest Area')}
        onMouseLeave={handleMouseLeave}
    
    d="M136.12,228.74c-3.53-11.77-2.43-41.64,0.6-50.43c2.86,1.09,5.78,2.02,8.53,3.33c2.35,1.12,4.5,2.67,6.72,4.05
        c3.23,2.02,3.95,3.61,2.42,7.02c-1.63,3.63-3.7,7.07-5.55,10.6c-2.87,5.47-5.76,10.92-8.55,16.43
        C138.84,222.61,137.58,225.58,136.12,228.74L136.12,228.74z"/>
    <path id="Heart_Area" 
    className={`st1 ${
        isSymptomSelected('Sternum') ? 'selected' : ''
        } ${hoveredPart === 'Sternum' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Sternum')}
        onMouseEnter={() => handleMouseEnter('Sternum')}
        onMouseLeave={handleMouseLeave}
    
    d="M212.65,179.28c-0.99,1.92-1.61,3.28-2.38,4.54c-0.46,0.74-1.21,1.3-1.75,2
        c-3.83,4.95-5.9,4.82-9.28-0.63c-0.05-0.08-0.05-0.2-0.1-0.29c-0.88-1.86-2.93-4.17-2.42-5.48c1.21-3.08,3.52-5.79,5.66-8.42
        c0.49-0.6,2.63-0.8,3.09-0.31C208,173.38,210.25,176.34,212.65,179.28L212.65,179.28z"/>
    <g id="Side_Ribs"
    className="clickable">
        <path id="Left_Side_Rib"
        className={`st1 ${
            isSymptomSelected('Ribs') ? 'selected' : ''
            } ${hoveredPart === 'Ribs' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Ribs')}
            onMouseEnter={() => handleMouseEnter('Ribs')}
            onMouseLeave={handleMouseLeave}
            d="M277.07,216.14c0-2.18,0-4.37,0-6.55c0-3.67,0.21-7.37-0.09-11.02c-0.51-6.22-1.17-12.45-2.1-18.62
            c-0.61-4.1-0.5-4.6,3.94-5.47c0.2,0.73,0.53,1.46,0.58,2.22c0.4,5.59,3.31,10.86,2.23,16.62c-0.36,1.93-1.33,3.76-1.65,5.69
            c-0.33,1.99-0.08,4.08-0.32,6.09c-0.44,3.7-1.05,7.38-1.59,11.07c-0.33-0.01-0.66-0.02-1-0.04V216.14z"/>
        <path id="Right_Side_Rib" 
        className={`st1 ${
            isSymptomSelected('Ribs') ? 'selected' : ''
            } ${hoveredPart === 'Ribs' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Ribs')}
            onMouseEnter={() => handleMouseEnter('Ribs')}
            onMouseLeave={handleMouseLeave}
        d="M130.37,216.58c-0.32-1.07-0.85-2.13-0.93-3.22c-0.68-9.11-1.42-18.21-1.8-27.33
            c-0.13-3.2,0.57-6.45,1.13-9.64c0.14-0.76,1.23-1.36,1.88-2.03c1.01,1.1,3.06,2.42,2.88,3.27c-2.49,11.97-1.81,24.07-1.91,36.15
            c0,0.9-0.16,1.8-0.25,2.7C131.04,216.51,130.7,216.55,130.37,216.58L130.37,216.58z"/>
    </g>
    <g id="Breasts" 
    className="clickable">
        <path id="Right_Breast" 
        className={`st1 ${
            isSymptomSelected('Breasts') ? 'selected' : ''
            } ${hoveredPart === 'Breasts' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Breasts')}
            onMouseEnter={() => handleMouseEnter('Breasts')}
            onMouseLeave={handleMouseLeave}
        d="M137.99,118.03c-0.65-1.9,0.08-2.49,2.02-2.6c3.95-0.22,7.41,0.87,11.06,2.42
            c5.98,2.54,12.34,4.17,18.55,6.16c7.76,2.49,15.65,4.66,23.25,7.57c3.08,1.18,5.27,3.99,6.86,7.29c1.98,4.09,1.83,8.41,2.16,12.6
            c0.39,4.93,0.59,10.14-0.57,14.88c-2.48,10.13-10.21,17.52-21.47,18.69c-7.46,0.78-15.12,1-22.27-1.82
            c-5.32-2.1-10.39-4.87-15.48-7.52c-2.58-1.35-4.93-3.12-7.39-4.69c-3.31-2.1-4.63-4.88-3.02-8.51c1.9-4.28,4.42-8.3,6.8-12.36
            c2.22-3.79,4.71-7.43,6.88-11.25c1.58-2.78,2.9-5.71,4.21-8.63c1.27-2.83,0.88-5.4-1.9-7.13c-2.7-1.68-5.52-3.19-8.28-4.77
            C138.93,118.25,138.46,118.14,137.99,118.03L137.99,118.03z"/>
        <path id="Left_Breast" 
        className={`st1 ${
            isSymptomSelected('Breasts') ? 'selected' : ''
            } ${hoveredPart === 'Breasts' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Breasts')}
            onMouseEnter={() => handleMouseEnter('Breasts')}
            onMouseLeave={handleMouseLeave}
        
        d="M269.12,118.37c-4.7,1.01-8.18,3.8-10.75,7.7c-0.49,0.74-0.47,2.22-0.07,3.07
            c1.95,4.16,3.97,8.3,6.24,12.29c2.47,4.34,5.29,8.49,7.88,12.77c1.65,2.73,3.39,5.45,4.64,8.37c1.39,3.26,0.24,5.99-3.83,8.64
            c-5.13,3.35-10.45,6.44-15.83,9.38c-7.92,4.33-16.58,4.88-25.4,4.78c-9.61-0.12-17.01-4.37-22.12-12.14
            c-1.95-2.98-2.99-7.03-3.1-10.64c-0.2-6.68,0.45-13.4,0.99-20.08c0.52-6.46,4.85-10.3,10.4-12.17
            c10.33-3.47,20.91-6.15,31.32-9.38c3.43-1.06,6.56-3.11,10-4.11c3.01-0.88,6.26-1,9.41-1.23c0.31-0.02,0.74,1.48,1.12,2.27
            C269.72,118.05,269.42,118.21,269.12,118.37L269.12,118.37z"/>
    </g>
</g>
<path id="Clavicle" 
    className={`st1 ${
        isSymptomSelected('Sternum') ? 'selected' : ''
        } ${hoveredPart === 'Sternum' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Sternum')}
        onMouseEnter={() => handleMouseEnter('Sternum')}
        onMouseLeave={handleMouseLeave}
d="M197.45,129.35c4.25-0.28,8.03-0.56,11.8-0.76c0.62-0.03,1.38,0.13,1.83,0.5c0.2,0.17-0.04,1.15-0.33,1.61
    c-1.62,2.64-3.3,5.24-4.99,7.83c-0.43,0.66-1.02,1.22-1.65,1.96C201.75,136.54,199.45,132.7,197.45,129.35L197.45,129.35z"/>
</g>
<g id="Head"
    className="clickable">
<g id="Jaw" 
    className="clickable">
    <path id="Left_Jaw" 
    className={`st1 ${
        isSymptomSelected('Jaw') ? 'selected' : ''
        } ${hoveredPart === 'Jaw' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Jaw')}
        onMouseEnter={() => handleMouseEnter('Jaw')}
        onMouseLeave={handleMouseLeave}
    d="M236.34,60.2c-0.26,3.86-0.35,6.89-0.7,9.89c-0.42,3.67-0.78,7.39-1.76,10.93
        c-0.37,1.33-2.21,2.55-3.66,3.23c-4.76,2.23-9.64,4.23-14.51,6.23c-0.79,0.32-1.76,0.17-2.85,0.25c-0.3-2.83-0.64-5.16,1.89-7.32
        c1.92-1.64,3.28-4.1,4.49-6.4c2.96-5.64,9.02-8.06,12.88-12.76C233.31,62.8,234.84,61.62,236.34,60.2L236.34,60.2z"/>
    <path id="Right_Jaw" 
    className={`st1 ${
        isSymptomSelected('Jaw') ? 'selected' : ''
        } ${hoveredPart === 'Jaw' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Jaw')}
        onMouseEnter={() => handleMouseEnter('Jaw')}
        onMouseLeave={handleMouseLeave}
    d="M171.87,60.2c3,2.78,5.3,5.33,8.01,7.33c6.23,4.6,10.39,10.89,14.65,17.13c0.4,0.59,0.91,1.22,0.98,1.88
        c0.12,1.25,0.27,2.67-0.22,3.72c-0.23,0.48-2.12,0.66-2.97,0.29c-5.56-2.4-11.11-4.85-16.48-7.64c-1.15-0.59-2.03-2.56-2.21-4
        C172.9,72.97,172.48,66.99,171.87,60.2L171.87,60.2z"/>
</g>
<g id="Ears" 
    className="clickable">

    <path id="Right_Ear" 
    className={`st1 ${
        isSymptomSelected('Ears') ? 'selected' : ''
        } ${hoveredPart === 'Ears' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Ears')}
        onMouseEnter={() => handleMouseEnter('Ears')}
        onMouseLeave={handleMouseLeave}
    d="M170.07,60.03c-0.47,0.91-0.66,1.91-1.19,2.15c-0.55,0.24-1.6-0.05-2.12-0.48
        c-0.83-0.68-1.53-1.6-2.05-2.55c-1.89-3.4-3.7-6.85-5.52-10.29c-1.05-1.98-0.01-3.66,2.98-5.32c2.26-1.26,2.78,0.1,3.31,1.86
        c1.49,4.89,3.05,9.76,4.59,14.64L170.07,60.03z"/>
    <path 
    id="Left_Ear"
    className={`st1 ${
        isSymptomSelected('Ears') ? 'selected' : ''
        } ${hoveredPart === 'Ears' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Ears')}
        onMouseEnter={() => handleMouseEnter('Ears')}
        onMouseLeave={handleMouseLeave}
    d="M245.7,43.32c-0.78-0.17-2.25,0.66-2.64,1.42c-0.71,1.4-0.7,3.14-1.24,4.66c-1.31,3.66-2.75,7.27-4.2,11.05
        c0.67,0.85,1.21,1.93,1.55,1.87c1.15-0.2,2.77-0.49,3.25-1.31c2.18-3.72,4.06-7.61,5.97-11.47
        C249.59,47.11,248.28,43.87,245.7,43.32z"/>
</g>
<g id="Face" 
    className="clickable">
    <path id="Left_Cheek"
    className={`st1 ${
        isSymptomSelected('Cheeks') ? 'selected' : ''
        } ${hoveredPart === 'Cheeks' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Cheeks')}
        onMouseEnter={() => handleMouseEnter('Cheeks')}
        onMouseLeave={handleMouseLeave}
    d="M230.39,49.27c-5.02,0.55-10.03,1.17-15.5,1.81c2.36,5.9,4.49,11.24,6.9,17.29
        c5.32-5.08,11.74-9.08,15.19-15.48c-0.89-1.65-1.64-3.3-2.57-4.96C233.86,48.66,232.53,49.04,230.39,49.27L230.39,49.27z"/>
    
    <path id="Right_Cheek"
    className={`st1 ${
        isSymptomSelected('Cheeks') ? 'selected' : ''
        } ${hoveredPart === 'Cheeks' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Cheeks')}
        onMouseEnter={() => handleMouseEnter('Cheeks')}
        onMouseLeave={handleMouseLeave}
     d="M188.45,50.5c-4.31-0.63-8.63-1.22-12.95-1.81c-0.43-0.06-0.77-0.15-1.05-0.27
        c-1.16,1.62-2.28,3-3.13,4.53c3.64,6.17,9.28,10.56,15.3,14.83c2.27-5.47,4.46-10.73,6.81-16.38
        C191.96,51.13,190.22,50.76,188.45,50.5z"/>

    <g id="Left_Eye" 
    className="clickable">
        <path id="Left_Eye-2" 
        className={`st1 ${
            isSymptomSelected('Eyes') ? 'selected' : ''
            } ${hoveredPart === 'Eyes' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Eyes')}
            onMouseEnter={() => handleMouseEnter('Eyes')}
            onMouseLeave={handleMouseLeave}
        
        d="M222.43,39.4c1.35,0.65,3.86,1.17,4,2.05c0.37,2.39-1.82,3.38-3.9,3.7c-1.66,0.25-3.42,0.28-5.07,0
            c-0.82-0.13-1.98-1.08-2.1-1.81c-0.11-0.67,0.79-1.9,1.54-2.25c1.6-0.74,3.39-1.08,5.54-1.71L222.43,39.4z"/>
        <path id="Left_Eye_Socket" 
        className={`st1 ${
            isSymptomSelected('Eye Socket') ? 'selected' : ''
            } ${hoveredPart === 'Eye Socket' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Eyes')}
            onMouseEnter={() => handleMouseEnter('Eye Socket')}
            onMouseLeave={handleMouseLeave}
        
        d="M228.12,38.89c-1.03-0.13-2.08-0.16-3.08-0.39c-4.32-1-8.04,0.48-11.47,2.85
            c-1.84,1.27-1.54,2.53,0.5,3.66c4.2,2.34,8.31,2.21,12.43-0.23c1.28-0.76,2.68-1.34,4-1.99c1.96,3.28,1.33,4.69-1.96,5.14
            c-4.13,0.57-8.23,1.33-12.36,1.89c-2.79,0.38-4.36-0.83-4.86-3.75c-0.32-1.85-1.34-3.56-1.88-5.38
            c-1.51-5.03,0.88-8.78,6.13-9.83c4.13-0.83,6.53,2.23,9.36,4.2C226.13,35.9,226.89,37.37,228.12,38.89L228.12,38.89z"/>
    </g>
    <g id="Right_Eye" 
    className="clickable">

        <path id="Right_Eye-2" 
        className={`st1 ${
            isSymptomSelected('Eyes') ? 'selected' : ''
            } ${hoveredPart === 'Eyes' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Eyes')}
            onMouseEnter={() => handleMouseEnter('Eyes')}
            onMouseLeave={handleMouseLeave}
        d="M186.71,39.6c1.43,0.42,2.98,0.64,4.27,1.34c1.03,0.56,1.74,1.71,2.59,2.59
            c-1.11,0.61-2.21,1.73-3.32,1.72c-2.14-0.01-4.36-0.44-6.39-1.14c-0.88-0.3-1.38-1.7-2.05-2.6c0.99-0.52,1.95-1.11,2.98-1.52
            c0.54-0.21,1.21-0.09,1.82-0.12l0.09-0.29L186.71,39.6z"/>
        <path id="Right_Eye_Socket" 
        className={`st1 ${
            isSymptomSelected('Eye Socket') ? 'selected' : ''
            } ${hoveredPart === 'Eye Socket' ? 'hovered' : ''}`}
            onClick={() => handlePartTap('Eyes')}
            onMouseEnter={() => handleMouseEnter('Eye Socket')}
            onMouseLeave={handleMouseLeave}
        d="M195.93,42.9c-3.97-4.74-9.1-5.48-15-4.45c2.38-3.46,5.26-6.29,9.22-7.53
            c3.31-1.03,5.79,1.23,8.16,3.14c0.59,0.47,1.32,1.46,1.19,2.03c-0.93,4.01-1.83,8.05-3.29,11.88c-0.38,0.99-2.73,1.85-4.09,1.74
            c-4.65-0.39-9.27-1.18-13.88-1.99c-0.64-0.11-1.47-1.13-1.58-1.82c-0.14-0.9,0.13-2.07,0.68-2.76c0.26-0.32,1.65,0.06,2.42,0.39
            c2.05,0.87,3.98,2.05,6.07,2.81C189.5,47.67,193.35,46.32,195.93,42.9L195.93,42.9z"/>
    </g>
    <path id="Nose_and_Sinus" 
    className={`st1 ${
        isSymptomSelected('Nose') ? 'selected' : ''
        } ${hoveredPart === 'Nose' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Nose')}
        onMouseEnter={() => handleMouseEnter('Nose')}
        onMouseLeave={handleMouseLeave}
    
    d="M204.3,15.53c0.59,0.67,1.27,1.37,1.86,2.14c2.01,2.65,3.89,5.41,6.01,7.97
        c1.64,1.99,2.32,3.8-0.41,5.15c-5.23,2.6-5.5,6.86-4.34,11.77c0.28,1.18,0.23,2.43,0.41,3.64c0.32,2.13,0.91,3.84,3.03,5.23
        c2.38,1.56,4.24,3.94,4.8,7.07c0.46,2.59,1.39,5.09,1.84,7.68c0.63,3.68-1.69,6.35-5.36,6.34c-5.7-0.01-11.41-0.02-17.11-0.17
        c-2.97-0.08-5.31-2.6-4.63-5.41c1.4-5.81,2.26-11.96,7.64-15.96c0.93-0.69,1.5-2.09,1.88-3.28c0.67-2.09,1.09-4.26,1.57-6.41
        c1.03-4.56-0.38-7.64-4.6-10.08c-3.18-1.84-3.08-2.8-0.67-5.43C199.05,22.7,201.44,19.2,204.3,15.53L204.3,15.53z M210.01,58.28
        c-4.49,2.79-8.84,1.96-13.13-0.48C202.92,64.43,205.89,63.56,210.01,58.28z"/>
</g>
{/* <g id="Mouth"
    className="clickable">
    <path id="Mouth-2"
    className={`st1 ${
        isSymptomSelected('Mouth') ? 'selected' : ''
        } ${hoveredPart === 'Mouth' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Mouth')}
        onMouseEnter={() => handleMouseEnter('Mouth')}
        onMouseLeave={handleMouseLeave}
    d="M204.3,15.53c-0.59,0.67-1.27,1.37-1.86,2.14c-2.01,2.65-3.89,5.41-6.01,7.97
        c-1.64,1.99-2.32,3.8,0.41,5.15c5.23,2.6,5.5,6.86,4.34,11.77c-0.28,1.18-0.23,2.43-0.41,3.64c-0.32,2.13-0.91,3.84-3.03,5.23
        c-2.38,1.56-4.24,3.94-4.8,7.07c-0.46,2.59-1.39,5.09-1.84,7.68c-0.63,3.68,1.69,6.35,5.36,6.34c5.7-0.01,11.41-0.02,17.11-0.17
        c2.97-0.08,5.31-2.6,4.63-5.41c-1.4-5.81-2.26-11.96-7.64-15.96c-0.93-0.69-1.5-2.09-1.88-3.28c-0.67-2.09-1.09-4.26-1.57-6.41
        c-1.03-4.56,0.38-7.64,4.6-10.08c3.18-1.84,3.08-2.8,0.67-5.43C209.55,22.7,207.16,19.2,204.3,15.53z"/>
    </g> */}

<g id="Head-2" 
    className="clickable">

    <path id="Left_Head_Side" 
    className={`st1 ${
        isSymptomSelected('Head') ? 'selected' : ''
        } ${hoveredPart === 'Head' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Head')}
        onMouseEnter={() => handleMouseEnter('Head')}
        onMouseLeave={handleMouseLeave}
    d="M234.34,14.38c-1.31,2.15-2.62,3.51-3.02,5.1c-2.06,8.27-3.16,16.43,1.99,24.28
        c1.35,2.06,1.72,3.34,1.09,4.17c0.93,1.65,1.68,3.3,2.57,4.96c0.94-1.75,1.68-3.68,2.09-5.87
        C241.13,35.98,240.85,25.19,234.34,14.38z"/>
    <path id="Right_Side_Head" 
    className={`st1 ${
        isSymptomSelected('Head') ? 'selected' : ''
        } ${hoveredPart === 'Head' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Head')}
        onMouseEnter={() => handleMouseEnter('Head')}
        onMouseLeave={handleMouseLeave}
    
    d="M174.19,45.19c4.14-6.43,5.91-13.24,3.8-20.79c-0.71-2.53-1.3-5.11-2.12-7.6
        c-0.2-0.62-1.08-1.36-1.69-1.4c-0.55-0.04-1.41,0.69-1.69,1.29c-1.18,2.54-2.76,5.08-3.14,7.77c-0.8,5.72-1.2,11.52-1.24,17.3
        c-0.02,2.87,0.63,5.98,1.83,8.59c0.42,0.91,0.88,1.77,1.37,2.61c0.86-1.54,1.97-2.92,3.13-4.53c-1.44-0.61-1.09-1.94-0.26-3.22
        L174.19,45.19z"/>
    <path id="Head-3" 
    className={`st1 ${
        isSymptomSelected('Hair') ? 'selected' : ''
        } ${hoveredPart === 'Hair' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Hair')}
        onMouseEnter={() => handleMouseEnter('Hair')}
        onMouseLeave={handleMouseLeave}
    d="M226.8,33.99c-10.68-6.53-19.92-13.37-22.63-26.23c-2.55,13.2-12.4,19.62-21.74,25.79
        c-0.75-5.25-1.47-10.42-2.23-15.58c-0.09-0.59-0.34-1.17-0.56-1.74c-0.63-1.6-2.24-3.68-1.73-4.68c1.15-2.24,3.04-4.41,5.17-5.77
        c9.42-6.01,19.79-6.81,30.53-4.78c5.59,1.06,10.64,3.35,14.72,7.36c1.69,1.66,2.96,3.52,1.42,6.4
        C226.64,20.57,225.18,26.83,226.8,33.99z"/>
</g>
<path id="Chin" 
    className={`st1 ${
        isSymptomSelected('Mouth') ? 'selected' : ''
        } ${hoveredPart === 'Mouth' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Mouth')}
        onMouseEnter={() => handleMouseEnter('Mouth')}
        onMouseLeave={handleMouseLeave}
d="M192.45,78.38h23.69c-1.96,2.61-3.6,4.46-4.84,6.54c-1.1,1.84-1.64,3.99-2.66,5.89
    c-0.48,0.89-1.4,1.68-2.31,2.16c-0.64,0.33-1.6,0.06-2.41,0.06c-4.54,0-4.25-0.08-5.5-4.38c-0.65-2.24-2.58-4.11-3.84-6.19
    c-0.73-1.2-1.3-2.49-2.11-4.08H192.45z"/>
</g>
<g id="Right_Arm" 
    className="clickable">
<path id="Right_Bicep" 
    className={`st1 ${
        isSymptomSelected('Biceps') ? 'selected' : ''
        } ${hoveredPart === 'Biceps' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Biceps')}
        onMouseEnter={() => handleMouseEnter('Biceps')}
        onMouseLeave={handleMouseLeave}
d="M87.05,254.45c-2.04,0.76-2.91-0.25-2.94-2.13c-0.15-10.79-0.45-21.59-0.3-32.38
    c0.1-7.21,0.5-14.47,1.44-21.62c1.65-12.48,7.82-22.12,19.56-27.45c3.64-1.65,7.55-2.89,11.47-3.65c2.94-0.57,4.39,1.04,4.26,4.11
    c-0.36,8.24-1.27,16.42-4.15,24.24c-0.35,0.95-0.41,2.01-0.76,2.96c-3.61,9.67-6.57,19.67-11.1,28.89c-3.5,7.13-9,13.29-13.58,19.9
    c-0.68,0.97-1.21,2.05-1.8,3.08c-0.7,1.35-1.41,2.7-2.11,4.04L87.05,254.45z"/>
<path id="Right_Shoulder" 
    className={`st1 ${
        isSymptomSelected('Shoulders') ? 'selected' : ''
        } ${hoveredPart === 'Shoulders' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Shoulders')}
        onMouseEnter={() => handleMouseEnter('Shoulders')}
        onMouseLeave={handleMouseLeave}

d="M137.99,118.03c0.47,0.11,0.94,0.23,1.41,0.34c1.57,1.09,3.1,2.23,4.71,3.25
    c2.49,1.59,3.6,3.67,3.01,6.7c-1.83,9.31-6.27,17.16-12.85,23.91c-6.94,7.11-15.93,10.57-24.93,13.91
    c-5.79,2.15-11.69,3.92-16.6,7.85c-0.19,0.15-0.58,0.05-1.44,0.1c0.28-4.19,0.42-8.29,0.86-12.35c0.3-2.8,0.88-5.59,1.55-8.33
    c1.49-6.16,3.59-12.05,7.67-17.08c3.84-4.73,8.76-8.06,14.13-10.65c5.2-2.5,10.55-4.73,15.95-6.76c2.01-0.76,4.36-0.62,6.56-0.9
    L137.99,118.03z"/>
<g id="Right_Forearm" 
    className="clickable">
    <path id="Right_Extensor"
    className={`st1 ${
        isSymptomSelected('Forearms') ? 'selected' : ''
        } ${hoveredPart === 'Forearms' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Forearms')}
        onMouseEnter={() => handleMouseEnter('Forearms')}
        onMouseLeave={handleMouseLeave}
        d="M87.05,254.45c0.7-1.35,1.41-2.7,2.11-4.04c2.53-2.65,5.05-5.31,7.6-7.94
        c0.31-0.32,0.62-0.64,0.93-0.96c2.54-2.65,5.04-5.36,7.79-7.77c2.59-2.27,4.25-1.38,4.66,2.25c0.63,5.48-0.29,10.59-3.44,15.29
        c-3.19,4.76-4.96,10.18-7.08,15.49c-4.43,11.08-9.85,21.76-14.94,32.57c-3.62,7.69-7.39,15.31-11.03,22.99
        c-2.56,5.4-4.98,10.86-7.54,16.26c-0.28,0.59-1.08,0.93-1.63,1.38c-0.41-0.63-1.19-1.27-1.17-1.88c0.14-3.13,0.39-6.26,0.79-9.37
        c0.65-5.01,1.45-10.01,2.19-15.01c1.33-9.02,3.91-17.69,7.27-26.15c0.71-1.77,0.97-3.73,1.68-5.5c3.26-8.14,6.58-16.26,9.93-24.36
        c0.48-1.15,1.25-2.18,1.89-3.27L87.05,254.45z"/>
    <path id="Right_Brachioradialis" 
    className={`st1 ${
        isSymptomSelected('Forearms') ? 'selected' : ''
        } ${hoveredPart === 'Forearms' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Forearms')}
        onMouseEnter={() => handleMouseEnter('Forearms')}
        onMouseLeave={handleMouseLeave}
    
    d="M39.16,323.78c0.71-1.62,1.35-3.28,2.14-4.86c1.96-3.95,4.41-7.71,5.89-11.82
        c3.3-9.21,6.74-18.37,7.59-28.32c0.57-6.7,1.71-13.46,3.57-19.91c3.13-10.85,8.05-20.91,16.14-29.11
        c2.19-2.23,3.53-1.86,5.14,0.87c4.24,7.24,3.47,14.72,1.53,22.38c-1.15,4.54-1.26,9.42-2.92,13.73
        c-2.94,7.59-6.61,14.91-10.18,22.24c-1.5,3.07-3.65,5.82-5.3,8.83c-4.44,8.13-10.41,15.05-16.89,21.58
        c-1.8,1.81-3.66,3.54-5.49,5.31C39.98,324.4,39.57,324.09,39.16,323.78L39.16,323.78z"/>
    <path id="Right_Flexor" 
    className={`st1 ${
        isSymptomSelected('Wrists') ? 'selected' : ''
        } ${hoveredPart === 'Wrists' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Wrists')}
        onMouseEnter={() => handleMouseEnter('Wrists')}
        onMouseLeave={handleMouseLeave}
    d="M67.28,298.56c-0.99,3.06-1.38,6.52-3.09,9.09c-4.87,7.29-11.69,12.59-18.78,17.48
        c-0.33-0.32-0.67-0.64-1-0.96c7.12-8.75,14.24-17.51,21.36-26.26C65.77,297.91,67.28,298.56,67.28,298.56z"/>
</g>
<path id="Right_Hand" 
    className={`st1 ${
        isSymptomSelected('Hands') ? 'selected' : ''
        } ${hoveredPart === 'Hands' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Hands')}
        onMouseEnter={() => handleMouseEnter('Hands')}
        onMouseLeave={handleMouseLeave}

d="M39.47,373.12c2.14,3.34-0.34,5.7-1.64,8.16c-2.45,4.65-5.26,9.1-7.8,13.7c-1.36,2.46-3.14,4.06-6.07,4.1
    c-2.78,0.04-3.76-1.28-2.43-3.79c2.54-4.83,5.31-9.54,7.96-14.31c0.27-0.49,0.43-1.05,0.64-1.58c-0.28-0.25-0.56-0.49-0.83-0.74
    c-0.56,0.85-1.19,1.67-1.68,2.56c-2.3,4.11-4.46,8.29-6.87,12.33c-1.58,2.64-3.16,5.52-7.05,5.18c-3.18-0.27-4.23-2.48-2.58-5.27
    c1.9-3.22,3.64-6.53,4.88-10.26c-1.16,1.45-2.56,2.78-3.4,4.39c-0.93,1.78-2.49,2.2-3.73,1.46c-0.84-0.5-1.55-2.68-1.14-3.54
    c2.17-4.54,4.61-8.96,7.17-13.29c2.01-3.4,4.25-6.68,6.53-9.91c1.21-1.71,2.74-3.19,4.05-4.84c0.31-0.4,0.22-1.1,0.43-1.6
    c0.68-1.56,1.11-3.4,2.23-4.54c0.9-0.91,2.84-1.57,4.05-1.27c3.55,0.88,6.83,2.22,10.58,0.32c2.59-1.31,3.93,1.38,4.17,3.04
    c0.59,4.08,1.27,8.44,0.38,12.34c-0.78,3.45-3.52,6.54-7.83,7.34L39.47,373.12z M30.51,358.78c-1.85,4.72,2.43,4.82,3.39,7.08
    c0.24-0.16,0.49-0.31,0.73-0.47C33.35,363.34,32.07,361.29,30.51,358.78z"/>
<path id="Right_Wrist" 
    className={`st1 ${
        isSymptomSelected('Wrists') ? 'selected' : ''
        } ${hoveredPart === 'Wrists' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Wrists')}
        onMouseEnter={() => handleMouseEnter('Wrists')}
        onMouseLeave={handleMouseLeave}

d="M47.29,375.25h-4.24c1.06-1.68,1.54-3.13,2.54-3.92c4.79-3.77,4.94-9.05,3.82-14.02
    c-1.66-7.31-2.05-14.48,0.53-21.43c2.74-7.39,5.31-15.02,11.16-20.79c0.54-0.54,1.31-0.84,2.36-1.49
    c-0.68,6.3-1.59,11.96-1.82,17.66c-0.19,4.78,0.18,9.62,0.76,14.38c0.36,2.89,2.29,5.69,2.22,8.5c-0.07,2.68-1.47,5.53-2.89,7.94
    c-2.84,4.82-6.73,8.68-11.97,11.02c-0.77,0.35-1.35,1.13-2.02,1.72c-0.15,0.15-0.3,0.29-0.45,0.44V375.25z"/>
<path id="Right_Tricep" 
    className={`st1 ${
        isSymptomSelected('Triceps') ? 'selected' : ''
        } ${hoveredPart === 'Triceps' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Triceps')}
        onMouseEnter={() => handleMouseEnter('Triceps')}
        onMouseLeave={handleMouseLeave}
d="M107.76,229.14c1.05-3.84,1.84-6.97,2.77-10.06c1.95-6.42,3.93-12.84,6.01-19.21
    c0.9-2.75,2.03-5.42,3.2-8.07c0.47-1.07,1.2-2.07,2-2.94c1.52-1.65,2.8-1.74,3.24,0.87c0.15,0.87,0.35,1.79,0.23,2.64
    c-1.6,11.11-6.14,21.2-11.04,31.14c-0.78,1.58-2.06,2.96-3.3,4.24C110.28,228.36,109.23,228.51,107.76,229.14L107.76,229.14z"/>
<g id="Right_Thumb"
    className="clickable">
    
    <path id="Right_Thenar" 
    className={`st1 ${
        isSymptomSelected('Thumb') ? 'selected' : ''
        } ${hoveredPart === 'Thumb' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Thumb')}
        onMouseEnter={() => handleMouseEnter('Thumb')}
        onMouseLeave={handleMouseLeave}

    d="M14.56,345.51c2.91-2.67,5.61-5.6,8.77-7.93c3.76-2.78,7.62-5.96,11.96-7.32
        c5.52-1.73,11.13-2.77,15.46-7.02c0.48-0.47,1.46-0.43,2.46-0.69c-0.21,0.78-0.29,1.38-0.51,1.92
        c-2.89,7.17-5.72,14.37-8.73,21.49c-1.46,3.46-5.72,5.63-8.73,3.82c-6.02-3.63-12.34-4.03-18.99-3.4
        c-0.39,0.04-0.79-0.08-1.19-0.12c-0.16-0.25-0.33-0.49-0.49-0.74L14.56,345.51z"/>
    <path id="Right_Thumb-2" 
    className={`st1 ${
        isSymptomSelected('Thumb') ? 'selected' : ''
        } ${hoveredPart === 'Thumb' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Thumb')}
        onMouseEnter={() => handleMouseEnter('Thumb')}
        onMouseLeave={handleMouseLeave}
    
    d="M27.38,347.83c-0.28,3.78-4.2,8.33-7.35,8.96c-3.74,0.75-7.47,1.57-11.21,2.34
        c-3.05,0.63-7.01-0.64-8.11-2.63c-0.7-1.27-1.43-2.57,0.73-3.35c3.04-1.09,6.13-2.12,9.02-3.52c5.42-2.63,11.1-1.63,16.91-1.8
        H27.38z"/>
</g>
<path id="Right_Pinky" 
    className={`st1 ${
        isSymptomSelected('Fingers') ? 'selected' : ''
        } ${hoveredPart === 'Fingers' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Fingers')}
        onMouseEnter={() => handleMouseEnter('Fingers')}
        onMouseLeave={handleMouseLeave}
d="M47.29,371.8c0.15-0.15,0.3-0.29,0.45-0.44c0.77,0.05,1.53,0.09,3.24,0.2
    c-3.05,4.72-5.72,8.88-8.45,13.01c-0.54,0.82-1.47,1.42-1.93,2.27c-1.32,2.42-3.21,3.22-6.52,2.24
    C37.02,382.07,39.53,375.06,47.29,371.8z"/>

<path id="Rght_Elbow" 
    className={`st1 ${
        isSymptomSelected('Elbows') ? 'selected' : ''
        } ${hoveredPart === 'Elbows' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Elbows')}
        onMouseEnter={() => handleMouseEnter('Elbows')}
    d="M104.18,254.7c0,0,7-6.84,5.97-18.71s-15.05,9.35-15.05,9.35L104.18,254.7L104.18,254.7z"/>
</g>

<g id="Left_Arm"
    className="clickable">

<path id="Left_Bicep" 
    className={`st1 ${
        isSymptomSelected('Biceps') ? 'selected' : ''
        } ${hoveredPart === 'Biceps' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Biceps')}
        onMouseEnter={() => handleMouseEnter('Biceps')}
        onMouseLeave={handleMouseLeave}
d="M323.97,254.44c2.04,0.76,2.91-0.25,2.94-2.13c0.15-10.79,0.45-21.59,0.3-32.38
    c-0.1-7.21-0.5-14.47-1.44-21.62c-1.65-12.48-7.82-22.12-19.56-27.45c-3.64-1.65-7.55-2.89-11.47-3.65
    c-2.94-0.57-4.39,1.04-4.26,4.11c0.36,8.24,1.27,16.42,4.15,24.24c0.35,0.95,0.41,2.01,0.76,2.96c3.61,9.67,6.57,19.67,11.1,28.89
    c3.5,7.13,9,13.29,13.58,19.9c0.68,0.97,1.21,2.05,1.8,3.08C322.57,251.74,323.28,253.09,323.97,254.44L323.97,254.44z"/>
<path id="Left_Shoulder" 
    className={`st1 ${
        isSymptomSelected('Shoulders') ? 'selected' : ''
        } ${hoveredPart === 'Shoulders' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Shoulders')}
        onMouseEnter={() => handleMouseEnter('Shoulders')}
        onMouseLeave={handleMouseLeave}
d="M273.04,118.02c-0.47,0.11-0.94,0.23-1.41,0.34c-1.57,1.09-3.1,2.23-4.71,3.25
    c-2.49,1.59-3.6,3.67-3.01,6.7c1.83,9.31,6.27,17.16,12.85,23.91c6.94,7.11,15.93,10.57,24.93,13.91
    c5.79,2.15,11.69,3.92,16.6,7.85c0.19,0.15,0.58,0.05,1.44,0.1c-0.28-4.19-0.42-8.29-0.86-12.35c-0.3-2.8-0.88-5.59-1.55-8.33
    c-1.49-6.16-3.59-12.05-7.67-17.08c-3.84-4.73-8.76-8.06-14.13-10.65c-5.2-2.5-10.55-4.73-15.95-6.76
    c-2.01-0.76-4.36-0.62-6.56-0.9L273.04,118.02z"/>
<g id="Left_Forearm" 
    className="clickable">
    <path id="Left_Extensor" 
    className={`st1 ${
        isSymptomSelected('Forearms') ? 'selected' : ''
        } ${hoveredPart === 'Forearms' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Forearms')}
        onMouseEnter={() => handleMouseEnter('Forearms')}
        onMouseLeave={handleMouseLeave}
    d="M323.97,254.44c-0.7-1.35-1.41-2.7-2.11-4.04c-2.53-2.65-5.05-5.31-7.6-7.94
        c-0.31-0.32-0.62-0.64-0.93-0.96c-2.54-2.65-5.04-5.36-7.79-7.77c-2.59-2.27-4.25-1.38-4.66,2.25
        c-0.63,5.48,0.29,10.59,3.44,15.29c3.19,4.76,4.96,10.18,7.08,15.49c4.43,11.08,9.85,21.76,14.94,32.57
        c3.62,7.69,7.39,15.31,11.03,22.99c2.56,5.4,4.98,10.86,7.54,16.26c0.28,0.59,1.08,0.93,1.63,1.38c0.41-0.63,1.19-1.27,1.17-1.88
        c-0.14-3.13-0.39-6.26-0.79-9.37c-0.65-5.01-1.45-10.01-2.19-15.01c-1.33-9.02-3.91-17.69-7.27-26.15
        c-0.71-1.77-0.97-3.73-1.68-5.5c-3.26-8.14-6.58-16.26-9.93-24.36c-0.48-1.15-1.25-2.18-1.89-3.27L323.97,254.44z"/>
    
    <path id="Left_Brachioradialis" 
    className={`st1 ${
        isSymptomSelected('Forearms') ? 'selected' : ''
        } ${hoveredPart === 'Forearms' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Forearms')}
        onMouseEnter={() => handleMouseEnter('Forearms')}
        onMouseLeave={handleMouseLeave}
    d="M371.86,323.78c-0.71-1.62-1.35-3.28-2.14-4.86c-1.96-3.95-4.41-7.71-5.89-11.82
        c-3.3-9.21-6.74-18.37-7.59-28.32c-0.57-6.7-1.71-13.46-3.57-19.91c-3.13-10.85-8.05-20.91-16.14-29.11
        c-2.19-2.23-3.53-1.86-5.14,0.87c-4.24,7.24-3.47,14.72-1.53,22.38c1.15,4.54,1.26,9.42,2.92,13.73
        c2.94,7.59,6.61,14.91,10.18,22.24c1.5,3.07,3.65,5.82,5.3,8.83c4.44,8.13,10.41,15.05,16.89,21.58c1.8,1.81,3.66,3.54,5.49,5.31
        c0.4-0.3,0.81-0.61,1.21-0.91L371.86,323.78z"/>

    <path id="Left_Flexor" 
    className={`st1 ${
        isSymptomSelected('Wrists') ? 'selected' : ''
        } ${hoveredPart === 'Wrists' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Wrists')}
        onMouseEnter={() => handleMouseEnter('Wrists')}
        onMouseLeave={handleMouseLeave}
    d="M343.74,298.56c0.99,3.06,1.38,6.52,3.09,9.09c4.87,7.29,11.69,12.59,18.78,17.48
        c0.33-0.32,0.67-0.64,1-0.96c-7.12-8.75-14.24-17.51-21.36-26.26L343.74,298.56z"/>
</g>
<path id="Left_Hand" 
    className={`st1 ${ 
        isSymptomSelected('Hands') ? 'selected' : ''
        } ${hoveredPart === 'Hands' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Hands')}
        onMouseEnter={() => handleMouseEnter('Hands')}
        onMouseLeave={handleMouseLeave}
d="M363.73,365.77c-0.88-3.9-0.21-8.27,0.38-12.34c0.24-1.66,1.58-4.36,4.17-3.04
    c3.75,1.91,7.03,0.56,10.58-0.32c1.21-0.3,3.14,0.36,4.05,1.27c1.13,1.14,1.56,2.98,2.23,4.54c0.22,0.5,0.12,1.2,0.43,1.6
    c1.3,1.65,2.84,3.12,4.05,4.84c2.28,3.23,4.52,6.51,6.53,9.91c2.56,4.34,5,8.76,7.17,13.29c0.41,0.86-0.3,3.05-1.14,3.54
    c-1.24,0.74-2.8,0.32-3.73-1.46c-0.84-1.62-2.24-2.94-3.4-4.39c1.24,3.73,2.98,7.04,4.88,10.26c1.65,2.79,0.6,4.99-2.58,5.27
    c-3.89,0.33-5.47-2.54-7.05-5.18c-2.41-4.04-4.57-8.22-6.87-12.33c-0.5-0.89-1.12-1.71-1.68-2.56c-0.28,0.25-0.56,0.49-0.83,0.74
    c0.21,0.53,0.36,1.09,0.64,1.58c2.65,4.77,5.42,9.48,7.96,14.31c1.32,2.51,0.35,3.82-2.43,3.79c-2.93-0.04-4.71-1.64-6.07-4.1
    c-2.54-4.6-5.35-9.06-7.8-13.7c-1.3-2.46-3.78-4.82-1.64-8.16c-4.31-0.8-7.05-3.89-7.83-7.34L363.73,365.77z M376.39,365.39
    c0.24,0.16,0.49,0.31,0.73,0.47c0.95-2.26,5.23-2.37,3.39-7.08C378.94,361.29,377.67,363.34,376.39,365.39L376.39,365.39z"/>

<path id="Left_Wrist" 
    className={`st1 ${
        isSymptomSelected('Wrists') ? 'selected' : ''
        } ${hoveredPart === 'Wrists' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Wrists')}
        onMouseEnter={() => handleMouseEnter('Wrists')}
        onMouseLeave={handleMouseLeave}
d="M363.74,375.24h4.24c-1.06-1.68-1.54-3.13-2.54-3.92c-4.79-3.77-4.94-9.05-3.82-14.02
    c1.66-7.31,2.05-14.48-0.53-21.43c-2.74-7.39-5.31-15.02-11.16-20.79c-0.54-0.54-1.31-0.84-2.36-1.49
    c0.68,6.3,1.59,11.96,1.82,17.66c0.19,4.78-0.18,9.62-0.76,14.38c-0.36,2.89-2.29,5.69-2.22,8.5c0.07,2.68,1.47,5.53,2.89,7.94
    c2.84,4.82,6.73,8.68,11.97,11.02c0.77,0.35,1.35,1.13,2.02,1.72c0.15,0.15,0.3,0.29,0.45,0.44V375.24z"/>

<path id="Left_Tricep" 
    className={`st1 ${
        isSymptomSelected('Triceps') ? 'selected' : ''
        } ${hoveredPart === 'Triceps' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Triceps')}
        onMouseEnter={() => handleMouseEnter('Triceps')}
        onMouseLeave={handleMouseLeave}
d="M303.26,229.14c-1.05-3.84-1.84-6.97-2.77-10.06c-1.95-6.42-3.93-12.84-6.01-19.21
    c-0.9-2.75-2.03-5.42-3.2-8.07c-0.47-1.07-1.2-2.07-2-2.94c-1.52-1.65-2.8-1.74-3.24,0.87c-0.15,0.87-0.35,1.79-0.23,2.64
    c1.6,11.11,6.14,21.2,11.04,31.14c0.78,1.58,2.06,2.96,3.3,4.24C300.74,228.36,301.79,228.51,303.26,229.14L303.26,229.14z"/>

<g id="Left_Thumb" 
    className="clickable">

    <path id="Left_Thenar" 
    className={`st1 ${
        isSymptomSelected('Thumb') ? 'selected' : ''
        } ${hoveredPart === 'Thumb' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Thumb')}
        onMouseEnter={() => handleMouseEnter('Thumb')}
        onMouseLeave={handleMouseLeave}
    d="M396.46,345.51c-2.91-2.67-5.61-5.6-8.77-7.93c-3.76-2.78-7.62-5.96-11.96-7.32
        c-5.52-1.73-11.13-2.77-15.46-7.02c-0.48-0.47-1.46-0.43-2.46-0.69c0.21,0.78,0.29,1.38,0.51,1.92
        c2.89,7.17,5.72,14.37,8.73,21.49c1.46,3.46,5.72,5.63,8.73,3.82c6.02-3.63,12.34-4.03,18.99-3.4c0.39,0.04,0.79-0.08,1.19-0.12
        c0.16-0.25,0.33-0.49,0.49-0.74L396.46,345.51z"/>
        
    <path id="Left_Thumb-2" 
    className={`st1 ${
        isSymptomSelected('Thumb') ? 'selected' : ''
        } ${hoveredPart === 'Thumb' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Thumb')}
        onMouseEnter={() => handleMouseEnter('Thumb')}
        onMouseLeave={handleMouseLeave}
    d="M383.65,347.83c0.28,3.78,4.2,8.33,7.35,8.96c3.74,0.75,7.47,1.57,11.21,2.34
        c3.05,0.63,7.01-0.64,8.11-2.63c0.7-1.27,1.43-2.57-0.73-3.35c-3.04-1.09-6.13-2.12-9.02-3.52
        C395.15,347,389.47,348,383.65,347.83L383.65,347.83z"/>
</g>
<path id="Left_Pinky" 
    className={`st1 ${
        isSymptomSelected('Fingers') ? 'selected' : ''
        } ${hoveredPart === 'Fingers' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Fingers')}
        onMouseEnter={() => handleMouseEnter('Fingers')}
        onMouseLeave={handleMouseLeave}

    d="M363.74,371.8c-0.15-0.15-0.3-0.29-0.45-0.44c-0.77,0.05-1.53,0.09-3.24,0.2
    c3.05,4.72,5.72,8.88,8.45,13.01c0.54,0.82,1.47,1.42,1.93,2.27c1.32,2.42,3.21,3.22,6.52,2.24
    C374.01,382.07,371.5,375.06,363.74,371.8z"/>
<path id="Left_Elbow" 
    className={`st1 ${
        isSymptomSelected('Elbows') ? 'selected' : ''
        } ${hoveredPart === 'Elbows' ? 'hovered' : ''}`}
        onClick={() => handlePartTap('Elbows')}
        onMouseEnter={() => handleMouseEnter('Elbows')}
    d="M306.84,254.7c0,0-7-6.84-5.97-18.71s15.05,9.35,15.05,9.35L306.84,254.7L306.84,254.7z"/>
</g>

</svg>
  {hoveredPart &&  <div
          className="tooltip"
          style={{
            position: 'absolute',
            top: tooltipPosition.y + 5,
            left: tooltipPosition.x + 10,
            padding: '8px',
            backgroundColor: '#333',
            color: '#fff',
            borderRadius: '4px',
            fontSize: '14px',
            pointerEvents: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {hoveredPart}
        </div>
        }
  </div>
);
};

export default BodyDiagram;