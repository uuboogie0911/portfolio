"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface ImageZoomViewProps {
  src: string;
  alt: string;
  scale: number;
  onScaleChange: (scale: number) => void;
  onDoubleClick?: () => void;
}

export default function ImageZoomView({ src, alt, scale, onScaleChange, onDoubleClick }: ImageZoomViewProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, [scale]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  }, [position.x, position.y]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-gray-100 dark:bg-gray-900"
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "0 0",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          className="max-w-full max-h-full object-contain select-none pointer-events-none"
          onDoubleClick={onDoubleClick}
          draggable={false}
          unoptimized
        />
      </div>
    </div>
  );
}
