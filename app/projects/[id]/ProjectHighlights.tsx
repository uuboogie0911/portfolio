"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface ProjectHighlightsProps {
  sections: { title: string; content: string[] }[];
}

export default function ProjectHighlights({ sections }: ProjectHighlightsProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 마크다운을 HTML로 변환하는 함수
  const parseMarkdown = (text: string): string => {
    if (!text) return '';
    
    let html = text
      // **bold** -> <strong>bold</strong>
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // *italic* -> <em>italic</em>
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // 줄바꿈 처리
      .replace(/\n/g, '<br />');
    
    return html;
  };

  const expandAll = () => {
    const allSectionIds = new Set(sections.map((_, idx) => `section-${idx}`));
    setExpandedSections(allSectionIds);
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  const allExpanded = sections.length > 0 && sections.every((_, idx) => expandedSections.has(`section-${idx}`));

  const toggleButton = (
    <button
      onClick={allExpanded ? collapseAll : expandAll}
      className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
    >
      {allExpanded ? '전체 닫기' : '전체 열기'}
    </button>
  );

  return (
    <>
      {/* 전체 열기/닫기 버튼을 헤더에 포털로 렌더링 */}
      {mounted && typeof window !== 'undefined' && (
        createPortal(
          toggleButton,
          document.getElementById('highlights-toggle-container') || document.body
        )
      )}
      
      <div className="space-y-2">
        {sections.map((section, idx) => {
          const sectionId = `section-${idx}`;
          const isExpanded = expandedSections.has(sectionId);
          
          return (
            <div 
              key={idx} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => {
                  const newExpanded = new Set(expandedSections);
                  if (isExpanded) {
                    newExpanded.delete(sectionId);
                  } else {
                    newExpanded.add(sectionId);
                  }
                  setExpandedSections(newExpanded);
                }}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
                      <ul className="space-y-2">
                        {section.content.map((item, itemIdx) => (
                          <li 
                            key={itemIdx} 
                            className="flex items-start text-sm leading-relaxed text-gray-600 dark:text-gray-400"
                          >
                            <span className="text-indigo-500 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0 text-xs">▸</span>
                            <span dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );
}

