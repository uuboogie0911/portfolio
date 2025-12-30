"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { personalInfo } from "@/data/portfolio";

export default function Contact() {
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);
  const [isDownloadingResume, setIsDownloadingResume] = useState(false);

  // 모바일 환경 감지
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isMobile()) {
      alert("모바일 환경에서 클릭해주세요");
      return;
    }

    setShowPhoneOptions(true);
  };

  const handleCall = () => {
    const phoneNumber = personalInfo.linkedin?.replace(/[^0-9]/g, '') || '';
    window.location.href = `tel:${phoneNumber}`;
    setShowPhoneOptions(false);
  };

  const handleSMS = () => {
    const phoneNumber = personalInfo.linkedin?.replace(/[^0-9]/g, '') || '';
    window.location.href = `sms:${phoneNumber}`;
    setShowPhoneOptions(false);
  };

  const handleResumeDownload = async (e: React.MouseEvent) => {
    e.preventDefault();

    setIsDownloadingResume(true);
    
    try {
      // API 라우트를 통해 PDF 파일 다운로드
      const response = await fetch('/api/resume', {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API 응답 오류:', errorText);
        throw new Error('파일을 불러올 수 없습니다.');
      }
      
      // Content-Type 확인
      const contentType = response.headers.get('content-type') || '';
      console.log('Content-Type:', contentType);
      
      const blob = await response.blob();
      console.log('Blob type:', blob.type, 'Blob size:', blob.size);
      
      // Blob 타입을 명시적으로 PDF로 설정
      const pdfBlob = blob.type === 'application/pdf' 
        ? blob 
        : new Blob([blob], { type: 'application/pdf' });
      
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      
      // 다운로드 링크 생성
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = '문진경_이력서.pdf';
      link.type = 'application/pdf';
      document.body.appendChild(link);
      link.click();
      
      // 정리
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (error) {
      console.error('이력서 다운로드 실패:', error);
      alert(`이력서 다운로드에 실패했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setIsDownloadingResume(false);
    }
  };
  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            감사합니다
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            더 궁금한 점이 있다면 편하게 연락주세요
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">전화번호</span>
            {personalInfo.linkedin && (
              <button
                onClick={handlePhoneClick}
                className="text-base text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-left md:text-right"
              >
                {personalInfo.linkedin}
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">이메일</span>
                  <a
                    href={`mailto:${personalInfo.email}`}
              className="text-base text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-left md:text-right"
            >
                    {personalInfo.email}
                  </a>
          </div>

                  {personalInfo.github && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Github</span>
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                className="text-base text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-left md:text-right"
              >
                {personalInfo.github.replace('https://github.com/', '@')}
                  </a>
                </div>
              )}
        </motion.div>

        {/* 전화/문자 선택 모달 */}
        {showPhoneOptions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                연락 방법 선택
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleCall}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  전화 걸기
                </button>
                <button
                  onClick={handleSMS}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  문자 보내기
                </button>
                <button
                  onClick={() => setShowPhoneOptions(false)}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  취소
                </button>
          </div>
        </motion.div>
      </div>
        )}
        </div>
    </section>
  );
}

