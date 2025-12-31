// 포트폴리오 데이터는 엑셀 파일에서 자동 생성됩니다
// 엑셀 파일을 수정한 후 npm run build:data를 실행하세요

// 엑셀에서 생성된 파일을 직접 re-export
export {
  personalInfo,
  experiences,
  projects,
  skills,
  educations,
} from './portfolio-generated';

// 타입 및 인터페이스 re-export
export type {
  PersonalInfo,
  Experience,
  ExperienceItem,
  Skill,
  Education,
} from './portfolio-generated';

// Project 타입은 별도 파일에서 가져옴
export type { Project } from './ProjectTypes';
