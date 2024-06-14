import React, { useRef, useEffect } from 'react';
import './Tree.css';

const TreeCanvas = ({ imageCount }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;

    function clearCanvas() {
      const ctx = contextRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
      clearCanvas();

      let height = canvas.height = canvas.offsetHeight;
      let width = canvas.width = canvas.offsetWidth;

      context.save();
      context.clearRect(0, 0, width, height);
      context.lineWidth = 3;
      context.lineCap = 'round';
      context.translate(width / 2, height);
      context.rotate(-Math.PI / 2);

      drawBranch(1, imageCount);
      context.restore();
    }

    function drawBranch(level, count) {
      if (level > count) return;

      let length = 100 + 20 * level;
      let thickness = 12 * Math.pow(0.7, level);
      thickness = Math.max(0.5, thickness);

      const ctx = contextRef.current;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.strokeStyle = level < 7 ? '#502000' : '#0f0';
      ctx.lineWidth = thickness;
      ctx.lineTo(length, 0);
      ctx.stroke();

      ctx.save();
      ctx.translate(length, 0);
      ctx.rotate(Math.PI / 5);
      drawBranch(level + 1, count); 
      ctx.restore();

      ctx.save();
      ctx.translate(length, 0);
      ctx.rotate(-Math.PI / 8);
      drawBranch(level + 1, count); 
      ctx.restore();
    }

    draw();

  }, [imageCount]);

  return <canvas ref={canvasRef} id="main" />;
};

export default TreeCanvas;
