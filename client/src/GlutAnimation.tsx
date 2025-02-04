// src/GlutAnimation.tsx

import React, { useEffect, useRef } from "react";

// Interface für AshParticle (optional, aber nützlich)
interface AshParticleInterface {
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  opacity: number;
  speedX: number;
  speedY: number;
  fadeSpeed: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  rotationXSpeed: number;
  rotationYSpeed: number;
  rotationZSpeed: number;
  scaleX: number;
  scaleY: number;
}

const GlutAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ashParticles: AshParticle[] = [];
  let numParticles = 2000;

  class AshParticle {
    x!: number;
    y!: number;
    sizeX!: number;
    sizeY!: number;
    opacity!: number;
    speedX!: number;
    speedY!: number;
    fadeSpeed!: number;
    rotationX!: number;
    rotationY!: number;
    rotationZ!: number;
    rotationXSpeed!: number;
    rotationYSpeed!: number;
    rotationZSpeed!: number;
    scaleX!: number;
    scaleY!: number;

    constructor(isInitial = false) {
      this.init(isInitial);
    }

    init(isInitial = false): void {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const isFromLeft = Math.random() < 0.5;

      if (isInitial) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
      } else {
        this.x = isFromLeft ? -10 : Math.random() * canvas.width;
        this.y = isFromLeft
          ? Math.random() * canvas.height
          : canvas.height + 10;
      }

      this.sizeX = Math.random() * 4 + 0.5;
      this.sizeY = Math.random() * 10 + 2;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.speedX = Math.random() * 1.5 + 0.5;
      this.speedY = -(Math.random() * 1.5 + 0.5);
      this.fadeSpeed = Math.random() * 0.0008 + 0.0003;

      this.rotationX = 0;
      this.rotationY = 0;
      this.rotationZ = 0;
      this.rotationXSpeed = Math.random() * 0.1 - 0.05;
      this.rotationYSpeed = Math.random() * 0.1 - 0.05;
      this.rotationZSpeed = Math.random() * 0.1 - 0.05;

      this.scaleX = 1;
      this.scaleY = 1;
    }

    checkBounds(canvas: HTMLCanvasElement): void {
      if (this.y < -50 || this.x > canvas.width + 50 || this.opacity <= 0) {
        this.init();
      }
    }

    update(canvas: HTMLCanvasElement): void {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= this.fadeSpeed;

      this.rotationX += this.rotationXSpeed;
      this.rotationY += this.rotationYSpeed;
      this.rotationZ += this.rotationZSpeed;

      const cosRotationX = Math.cos(this.rotationX);
      const cosRotationY = Math.cos(this.rotationY);
      this.scaleY = 0.8 + 0.2 * cosRotationX;
      this.scaleX = 0.8 + 0.2 * cosRotationY;

      this.checkBounds(canvas);
    }

    draw(ctx: CanvasRenderingContext2D): void {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotationZ);
      ctx.scale(this.scaleX, this.scaleY);

      const rotationFactor = Math.cos(this.rotationZ);
      const red = 255 - Math.abs(rotationFactor) * 80;
      const green = 100 + Math.abs(rotationFactor) * 80;
      const blue = 50 + Math.abs(rotationFactor) * 30;

      ctx.beginPath();
      ctx.ellipse(0, 0, this.sizeX, this.sizeY, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${Math.floor(red)}, ${Math.floor(
        green
      )}, ${Math.floor(blue)}, ${this.opacity})`;
      ctx.fill();

      ctx.restore();
    }
  }

  const resizeCanvas = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    numParticles = Math.floor((canvas.width * canvas.height) / 6000);
    updateParticles();
  };

  const updateParticles = (): void => {
    const diff = numParticles - ashParticles.length;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        ashParticles.push(new AshParticle(true));
      }
    } else if (diff < 0) {
      ashParticles.length = numParticles;
    }
  };

  const animate = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ashParticles.forEach((particle) => {
      particle.update(canvas);
      particle.draw(ctx);
    });
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default GlutAnimation;
