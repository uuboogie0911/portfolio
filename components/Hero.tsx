"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { personalInfo } from "@/data/portfolio";

export default function Hero() {
  const [isDownloadingResume, setIsDownloadingResume] = useState(false);

  const handleResumeDownload = async (e: React.MouseEvent) => {
    e.preventDefault();

    setIsDownloadingResume(true);
    
    try {
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
      
      const contentType = response.headers.get('content-type') || '';
      const blob = await response.blob();
      
      const pdfBlob = blob.type === 'application/pdf' 
        ? blob 
        : new Blob([blob], { type: 'application/pdf' });
      
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = '문진경_이력서.pdf';
      link.type = 'application/pdf';
      document.body.appendChild(link);
      link.click();
      
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

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          className="space-y-8"
          >
          {/* 프로필 이미지 */}
            <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
              {personalInfo.profileImage ? (
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-xl ring-4 ring-gray-100 dark:ring-gray-800">
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  quality={100}
                  priority
                  sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
                />
              </div>
              ) : (
              <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center shadow-xl ring-4 ring-gray-100 dark:ring-gray-800">
                <span className="text-5xl md:text-6xl lg:text-7xl text-white font-bold">
                    {personalInfo.name.charAt(0)}
                  </span>
                </div>
              )}
          </motion.div>

          {/* 이름 및 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[38px] md:text-[38px] lg:text-[38px] font-light text-gray-900 dark:text-white leading-tight"
          >
            서비스를 넓고 깊게 생각하는<br />
            <span className="font-semibold">{personalInfo.name}</span>입니다.
          </motion.h1>

          {/* Bio 텍스트 */}
              <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto space-y-3"
          >
            <p>
              신규 서비스 기획부터 운영·고도화까지 Full Life Cycle을 경험했으며, 명확한 기준으로 문제를 정의하고 서비스 개선을 수행해 왔습니다.
            </p>
            <p>
              회원/인증, 어드민 시스템 기획, CS효율화, AI자동화에 역량을 갖추고 있으며, 스프린트 협업과 유관부서 커뮤니케이션을 통해 실행력 높은 제품을 만들어 왔습니다.
            </p>
          </motion.div>

          {/* CTA 버튼들 */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
            {personalInfo.resume && (
          <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResumeDownload}
                disabled={isDownloadingResume}
                className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isDownloadingResume ? '다운로드 중...' : '이력서 다운로드'}
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-900 dark:border-white rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
            >
              연락하기
          </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

