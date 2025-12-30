"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { experiences, type Experience } from "@/data/portfolio";

export default function Experience() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  if (!experiences || experiences.length === 0) {
    return null;
  }

  const toggleExpanded = (expId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(expId)) {
      newExpanded.delete(expId);
    } else {
      newExpanded.add(expId);
    }
    setExpandedItems(newExpanded);
  };

  // 성과 문구 감지 함수
  const isAchievement = (text: string): boolean => {
    const achievementPatterns = [
      /\d+%?\s*(증가|감소|상승|향상|절감|개선)/,
      /\d+배\s*(증가|상승|향상)/,
      /성과:/,
      /유입률.*상승/,
      /가입율.*증가/,
      /CS.*절감/,
    ];
    return achievementPatterns.some(pattern => pattern.test(text));
  };

  // 텍스트를 성과 부분과 일반 부분으로 분리하여 렌더링
  const renderDetailText = (text: string, itemTitle: string) => {
    const isLeadership = itemTitle.includes("항공 Aggregator 플랫폼 - 운영") && 
                         text.includes("스프린트 운영으로 기획, 개발, 디자인, 사업 등 유관부서와 협력 리딩");
    
    // 성과 문구인지 확인
    if (isAchievement(text)) {
      return (
        <span className="inline-flex items-center gap-1">
          <span>✨</span>
          <span className="bg-yellow-200/50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 font-semibold px-2 py-0.5 rounded-md">
            {text}
          </span>
        </span>
      );
    }
    
    // 리더십 문구인지 확인
    if (isLeadership) {
      return (
        <span className="inline-flex items-center gap-1">
          <span>👑</span>
          <span>{text}</span>
        </span>
      );
    }
    
    return <span>{text}</span>;
  };

  return (
    <section
      id="experience"
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            경력 사항
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            IT 서비스 기획·운영 중심 경력, 중국어 커뮤니케이션 가능한 PM
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const isExpanded = expandedItems.has(exp.id);
            const hasDetails = exp.items && exp.items.length > 0 && 
              exp.items.some(item => item.details && item.details.length > 0);

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                          {exp.position}
                        </h3>
                      <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
                          {exp.company}
                        </p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {exp.period}
                      </span>
                    </div>
                    {hasDetails && (
                      <button
                        onClick={() => toggleExpanded(exp.id)}
                        className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                      >
                        <span>{isExpanded ? '접기' : '주요 업무 내용 보기'}</span>
                        <svg
                          className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
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
                          </div>

                  <AnimatePresence>
                    {isExpanded && hasDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-6">
                          {exp.items && exp.items.map((item, itemIndex) => (
                            <div key={itemIndex}>
                              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                                {item.title}
                              </h4>
                              {item.details && item.details.length > 0 && (
                                <ul className="space-y-2">
                                  {item.details.map((detail, detailIndex) => {
                                    const mainText = detail.replace(/^-\s*/, '').trim();
                                    return (
                                      <li key={detailIndex} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex items-start">
                                        <span className="text-gray-400 dark:text-gray-500 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span className="flex-1">
                                          {renderDetailText(mainText, item.title)}
                                        </span>
                                      </li>
                        );
                      })}
                                </ul>
                              )}
                    </div>
                        ))}
                      </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
