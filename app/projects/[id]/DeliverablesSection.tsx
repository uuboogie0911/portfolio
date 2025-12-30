"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const openModal = () => {
    setCurrentIndex(0);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // 휠 이벤트 제거 (돋보기 버튼으로만 확대/축소)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageChange = (newIndex: number) => {
    setCurrentIndex(newIndex);
    setScale(1);
    setPosition({ x: 0, y: 0 });
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
  }, [isModalOpen, currentIndex, deliverables.length]);

  // deliverables가 없거나 비어있으면 아무것도 렌더링하지 않음
  if (!deliverables || deliverables.length === 0) {
    return null;
  }

  // 터치 이벤트 처리 (모바일 스와이프)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
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

  return (
    <>
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            산출물
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
            onClick={closeModal}
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
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <svg
                  className="w-8 h-8"
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

              {/* 줌 컨트롤 버튼 */}
              <div className="absolute -top-10 left-0 flex gap-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomIn();
                  }}
                  className="text-white hover:text-gray-300 transition-colors bg-black/50 rounded p-2"
                  title="확대 (Ctrl + 마우스휠)"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomOut();
                  }}
                  className="text-white hover:text-gray-300 transition-colors bg-black/50 rounded p-2"
                  title="축소 (Ctrl + 마우스휠)"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                  </svg>
                </button>
                {scale !== 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleResetZoom();
                    }}
                    className="text-white hover:text-gray-300 transition-colors bg-black/50 rounded p-2"
                    title="리셋"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                )}
              </div>

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
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {deliverables[currentIndex]?.name || "산출물"}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentIndex + 1} / {deliverables.length}
                  </span>
                </div>
                <div 
                  className="relative w-full flex-1 overflow-auto bg-gray-100 dark:bg-gray-900"
                  style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
                >
                  {deliverables[currentIndex]?.image ? (
                    <div className="flex items-center justify-center p-4 w-full h-full">
                      <img
                        src={deliverables[currentIndex].image}
                        alt={deliverables[currentIndex].name || "산출물"}
                        className="select-none max-w-full h-auto"
                        style={{ 
                          transform: `scale(${scale})`,
                          transformOrigin: 'center center',
                          transition: isDragging ? 'none' : 'transform 0.2s',
                        }}
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
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

