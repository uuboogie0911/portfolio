"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageZoomView from "./ImageZoomView";
import ZoomControls from "./ZoomControls";

interface Deliverable {
  category: string;
  name: string;
  image: string;
}

interface DeliverablesSectionProps {
  deliverables: Deliverable[];
}

export default function DeliverablesSection({ deliverables }: DeliverablesSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imageScales, setImageScales] = useState<Record<number, number>>({});

  const openModal = () => {
    setCurrentIndex(0);
    setImageScales({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImageScales({});
  };

  const handleImageChange = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
  }, []);

  const handleScaleChange = (newScale: number) => {
    const clampedScale = Math.max(0.5, Math.min(3.0, newScale));
    setImageScales(prev => ({
      ...prev,
      [currentIndex]: clampedScale
    }));
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      handleImageChange(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < deliverables.length - 1) {
      handleImageChange(currentIndex + 1);
    }
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      if (e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          handleImageChange(currentIndex - 1);
        }
      } else if (e.key === "ArrowRight") {
        if (currentIndex < deliverables.length - 1) {
          handleImageChange(currentIndex + 1);
        }
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, currentIndex, deliverables.length, handleImageChange]);

  // 터치 이벤트 처리 (모바일 스와이프)
  const minSwipeDistance = 50;
  const currentScale = imageScales[currentIndex] || 1.0;

  const onTouchStart = (e: React.TouchEvent) => {
    if (currentScale <= 1) {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (currentScale <= 1) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    if (currentScale > 1) return;
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // deliverables가 없거나 비어있으면 아무것도 렌더링하지 않음
  // React Hooks 규칙 준수: 모든 hooks 호출 후에 early return
  if (!deliverables || deliverables.length === 0) {
    return null;
  }

  return (
    <>
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            산출물 예시
          </h2>
          <button
            onClick={openModal}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            산출물보기
          </button>
        </div>
      </section>

      {/* 이미지 모달 */}
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.9, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="relative max-w-7xl w-full h-[90vh] flex flex-col"
            >
              {/* 닫기 버튼 */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors z-20"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* 이전 버튼 */}
              {currentIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-full p-3 shadow-lg transition-all z-10 md:flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}

              {/* 다음 버튼 */}
              {currentIndex < deliverables.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-full p-3 shadow-lg transition-all z-10 md:flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}

              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden flex flex-col h-full">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {deliverables[currentIndex]?.name || "산출물"}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {currentIndex + 1} / {deliverables.length}
                    </span>
                  </div>
                </div>
                
                {/* 줌 컨트롤 */}
                <ZoomControls
                  currentScale={currentScale}
                  onZoomIn={() => {
                    const newScale = Math.min(currentScale + 0.25, 3.0);
                    handleScaleChange(newScale);
                  }}
                  onZoomOut={() => {
                    const newScale = Math.max(currentScale - 0.25, 0.5);
                    handleScaleChange(newScale);
                  }}
                  onReset={() => {
                    handleScaleChange(1.0);
                  }}
                  onScaleChange={handleScaleChange}
                />
                
                <div className="relative w-full flex-1 bg-gray-100 dark:bg-gray-900">
                  {deliverables[currentIndex]?.image ? (
                    <ImageZoomView
                      src={deliverables[currentIndex].image}
                      alt={deliverables[currentIndex].name || "산출물"}
                      scale={currentScale}
                      onScaleChange={handleScaleChange}
                      onDoubleClick={() => handleScaleChange(1.0)}
                    />
                  ) : (
                    <div className="p-8 text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">
                      이미지를 불러올 수 없습니다.
                    </div>
                  )}
                </div>
              </div>

              {/* 모바일 인디케이터 */}
              <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {deliverables.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? "w-8 bg-white"
                        : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
