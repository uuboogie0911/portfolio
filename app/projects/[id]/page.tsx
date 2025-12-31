import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";
import Link from "next/link";
import fs from "fs";
import path from "path";
import ProjectHighlights from "./ProjectHighlights";
import DeliverablesSection from "./DeliverablesSection";

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  // 프로젝트별 추가 콘텐츠 파일 경로
  const projectContentPath = path.join(
    process.cwd(),
    "content",
    "projects",
    `${project.id}.md`
  );
  
  let additionalContent = "";

  // 추가 콘텐츠 파일 읽기 (있는 경우)
  if (fs.existsSync(projectContentPath)) {
    additionalContent = fs.readFileSync(projectContentPath, "utf-8");
  }

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

  // 추가 콘텐츠 파싱 및 필터링
  const parseAdditionalContent = (content: string, results: string): { title: string; content: string[] }[] | null => {
    if (!content) return null;
    
    // 성과 섹션의 내용을 추출하여 중복 체크용으로 사용
    const resultsLines = results.split('\n').map(line => line.trim().toLowerCase()).filter(line => line);
    const resultsKeywords = resultsLines.flatMap(line => {
      // 숫자와 함께 나오는 키워드 추출
      const matches = line.match(/\d+%?|증가|감소|개선|향상|절감|상승|감소/gi);
      return matches || [];
    });
    
    const lines = content.split('\n').filter(line => line.trim());
    const sections: { title: string; content: string[] }[] = [];
    let currentSection: { title: string; content: string[] } | null = null;
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('#')) {
        if (currentSection !== null && currentSection.content.length > 0) {
          sections.push(currentSection);
        }
        const title = trimmedLine.replace(/^#+\s*/, '').trim();
        currentSection = { title, content: [] };
      } else if (trimmedLine) {
        if (currentSection !== null) {
          const cleanLine = trimmedLine.replace(/^[-*]\s*/, '').trim();
          if (cleanLine) {
            currentSection.content.push(cleanLine);
          }
        }
      }
    });
    
    if (currentSection !== null) {
      const section: { title: string; content: string[] } = currentSection;
      if (section.content.length > 0) {
        sections.push(section);
      }
    }
    
    // 중복 제거: 이미 표시된 섹션과 성과 섹션과 중복되는 내용 제거
    const filteredSections = sections
      .filter(section => {
        const sectionLower = section.title.toLowerCase();
        // 이미 메인 섹션에 표시되는 내용 제외
        return !sectionLower.includes('문제') && 
               !sectionLower.includes('목표') && 
               !sectionLower.includes('해결') && 
               !sectionLower.includes('결과') && 
               !sectionLower.includes('성과') &&
               !sectionLower.includes('프로젝트 성과') &&
               !sectionLower.includes('추가 정보');
      })
      .map(section => {
        // 성과 섹션과 중복되는 내용 제거
        const filteredContent = section.content.filter(item => {
          const itemLower = item.toLowerCase();
          // 성과 섹션에 이미 포함된 숫자나 키워드가 있으면 제외
          const hasResultsKeyword = resultsKeywords.some(keyword => 
            itemLower.includes(keyword.toLowerCase())
          );
          
          // 성과 섹션의 전체 문구와 유사한 내용 제외
          const isSimilarToResults = resultsLines.some(resultLine => {
            // 주요 키워드가 3개 이상 겹치면 중복으로 간주
            const itemWords = itemLower.split(/\s+/);
            const resultWords = resultLine.split(/\s+/);
            const commonWords = itemWords.filter(word => 
              resultWords.includes(word) && word.length > 2
            );
            return commonWords.length >= 3;
          });
          
          return !hasResultsKeyword && !isSimilarToResults;
        });
        
        return { ...section, content: filteredContent };
      })
      .filter(section => section.content.length > 0); // 내용이 있는 섹션만 유지
    
    return filteredSections.length > 0 ? filteredSections : null;
  };

  const parsedSections = parseAdditionalContent(additionalContent, project.results);

  // public/projects/ 폴더에서 이미지 자동 로드
  let projectDeliverables: { category: string; name: string; image: string }[] = [];
  
  // proj-5는 proj-4 폴더의 이미지를 사용
  const actualProjectId = project.id === 'proj-5' ? 'proj-4' : project.id;
  const projectsImagePath = path.join(process.cwd(), "public", "projects", actualProjectId);
  
  if (fs.existsSync(projectsImagePath)) {
    const imageFiles = fs.readdirSync(projectsImagePath)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext);
      })
      .sort(); // 파일명 순서대로 정렬
    
    projectDeliverables = imageFiles.map((file, index) => {
      // 파일명에서 확장자 제거하여 이름 생성
      const nameWithoutExt = path.basename(file, path.extname(file));
      let displayName = nameWithoutExt;
      
      // 프로젝트별 커스텀 이름 매핑
      if (project.id === 'proj-3') {
        // [타이드스퀘어] Luna 프로젝트
        if (nameWithoutExt === 'fe-1') {
          displayName = '기획서 1';
        } else if (nameWithoutExt === 'fe-2') {
          displayName = '기획서 2';
        } else if (nameWithoutExt === 'fe-3') {
          displayName = '기획서 3';
        } else if (nameWithoutExt === 'spec-1') {
          displayName = '기능명세서 1';
        } else if (nameWithoutExt === 'spec-2') {
          displayName = '기능명세서 2';
        } else if (nameWithoutExt === 'spec-3') {
          displayName = 'FE개발용 ELEMENT 정의';
        } else if (nameWithoutExt === 'spec-4') {
          displayName = '유저가이드 작성';
        } else if (nameWithoutExt === 'userflow') {
          displayName = '사용자 플로우';
        } else if (nameWithoutExt === 'ia') {
          displayName = 'IA';
        }
      } else if (project.id === 'proj-2') {
        // [투어비스] AI 기반 항공 환불 수수료 조회 자동화
        if (nameWithoutExt === 'spec') {
          displayName = '기획서';
        } else if (nameWithoutExt === 'operation') {
          displayName = '실제 운영 화면';
        } else if (nameWithoutExt === 'dashboard') {
          displayName = '대시보드';
        } else if (nameWithoutExt === 'userflow') {
          displayName = '사용자 플로우';
        }
      } else if (project.id === 'proj-5') {
        // [키위블랙] B2B 원단 플랫폼 기획 - proj-4 폴더의 이미지 사용
        if (nameWithoutExt.startsWith('spec-')) {
          displayName = `기획서 ${nameWithoutExt.replace('spec-', '')}`;
        } else if (nameWithoutExt.startsWith('fe-')) {
          displayName = `FE 화면 ${nameWithoutExt.replace('fe-', '')}`;
        } else if (nameWithoutExt.startsWith('admin-')) {
          displayName = `관리자 화면 ${nameWithoutExt.replace('admin-', '')}`;
        } else if (nameWithoutExt.startsWith('policy-')) {
          displayName = `정책 ${nameWithoutExt.replace('policy-', '')}`;
        } else if (nameWithoutExt === 'ia') {
          displayName = 'IA';
        }
      } else {
        // 기본 매핑 (다른 프로젝트)
        if (nameWithoutExt.startsWith('spec-')) {
          displayName = `기획서 ${nameWithoutExt.replace('spec-', '')}`;
        } else if (nameWithoutExt.startsWith('fe-')) {
          displayName = `FE 화면 ${nameWithoutExt.replace('fe-', '')}`;
        } else if (nameWithoutExt.startsWith('admin-')) {
          displayName = `관리자 화면 ${nameWithoutExt.replace('admin-', '')}`;
        } else if (nameWithoutExt === 'flowchart') {
          displayName = '플로우차트';
        } else if (nameWithoutExt === 'overview') {
          displayName = '개요';
        } else if (nameWithoutExt === 'policy') {
          displayName = '정책';
        } else if (nameWithoutExt === 'dashboard') {
          displayName = '대시보드';
        } else if (nameWithoutExt === 'operation') {
          displayName = '운영';
        } else if (nameWithoutExt === 'userflow') {
          displayName = '사용자 플로우';
        } else if (nameWithoutExt === 'ia') {
          displayName = 'IA';
        }
      }
      
      return {
        category: "산출물",
        name: displayName,
        image: `/projects/${actualProjectId}/${file}`
      };
    });
  }

  // project.deliverables가 있으면 우선 사용, 없으면 자동 로드한 것 사용
  const deliverables = project.deliverables && project.deliverables.length > 0 
    ? project.deliverables 
    : projectDeliverables;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 네비게이션 바 */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/#projects"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              프로젝트 목록으로
            </Link>
            {project.links && (
              <div className="flex items-center gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    GitHub
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    데모 보기
                  </a>
                )}
                {project.links.website && (
                  <a
                    href={project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    웹사이트
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* 프로젝트 헤더 */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            {project.title.includes('[') ? (
              <>
                <span className="block">{project.title.match(/\[([^\]]+)\]/)?.[0]}</span>
                <span className="block">{project.title.replace(/\[([^\]]+)\]\s*/, '')}</span>
              </>
            ) : (
              project.title
            )}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {project.description}
          </p>
          {(project.developmentPeriod || project.teamSize) && (
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {project.developmentPeriod && (
                <div className="p-4">
                  <div className="text-gray-500 dark:text-gray-400 mb-1">개발기간</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{project.developmentPeriod}</div>
                </div>
              )}
              {project.teamSize && (
                <div className="p-4">
                  <div className="text-gray-500 dark:text-gray-400 mb-1">투입인원</div>
                  <div className="font-semibold text-gray-900 dark:text-white">{project.teamSize}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 프로젝트 내용 섹션 */}
        <div className="space-y-12">
          {/* 문제 정의 */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              문제 정의
            </h2>
            <div className="p-6">
              <p 
                className="text-base leading-relaxed text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(project.problem) }}
              />
            </div>
          </section>

          {/* 목표 */}
          {project.goal && (
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                목표
              </h2>
              <div className="p-6">
                <p 
                  className="text-base leading-relaxed text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(project.goal) }}
                />
              </div>
            </section>
          )}

          {/* FLOW */}
          {project.flow && (
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                FLOW
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-2 border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-red-600 dark:text-red-400">Before</span>
                  </div>
                  <p 
                    className="text-base leading-relaxed text-gray-700 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(project.flow.before) }}
                  />
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-2 border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">After</span>
                  </div>
                  <p 
                    className="text-base leading-relaxed text-gray-700 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(project.flow.after) }}
                  />
                </div>
              </div>
            </section>
          )}

          {/* 핵심 결정 */}
          {project.keyDecisions && project.keyDecisions.length > 0 && (
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                핵심 결정
              </h2>
              <div className="p-6">
                <ul className="space-y-2">
                  {project.keyDecisions.map((decision, index) => (
                    <li key={index} className="flex items-start text-base leading-relaxed text-gray-700 dark:text-gray-300">
                      <span className="text-indigo-600 dark:text-indigo-400 mr-3 mt-1 flex-shrink-0">•</span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* 성과 및 주요 내용 */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                성과 및 주요 내용
              </h2>
              {parsedSections && parsedSections.length > 0 && (
                <div id="highlights-toggle-container"></div>
              )}
            </div>
            <div className="space-y-4">
              {/* 성과 섹션 */}
              <div className="p-6 border-l-4 border-indigo-500 dark:border-indigo-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">성과</h3>
                <p 
                  className="text-base leading-relaxed text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(project.results) }}
                />
              </div>

              {/* 추가 콘텐츠 - 아코디언 형태로 표시 */}
              {parsedSections && parsedSections.length > 0 && (
                <ProjectHighlights sections={parsedSections} />
              )}
            </div>
          </section>

          {/* 산출물 예시 */}
          {deliverables && deliverables.length > 0 && (
            <DeliverablesSection deliverables={deliverables} projectId={project.id} />
          )}
        </div>

        {/* 하단 네비게이션 */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/#projects"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              프로젝트 목록으로 돌아가기
            </Link>
            {project.links && (
              <div className="flex items-center gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    GitHub 보기
                  </a>
                )}
                {(project.links.demo || project.links.website) && (
                  <a
                    href={project.links.demo || project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    {project.links.demo ? "데모 보기" : "웹사이트 보기"}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
