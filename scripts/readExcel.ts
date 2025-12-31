import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedin?: string;
  github?: string;
  resume?: string;
  profileImage?: string;
}

interface ExperienceItem {
  title: string; // F열: 상위 depth (프로젝트/업무 영역)
  details: string[]; // G열: 하위 depth (상세 설명)
}

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  startDate: string;
  endDate: string | null;
  items: ExperienceItem[]; // 계층 구조로 변경
  technologies: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  goal?: string | null;
  flow?: {
    before: string;
    after: string;
  };
  keyDecisions?: string[];
  solution: string;
  results: string;
  technologies: string[];
  period: string;
  role?: string;
  developmentPeriod?: string;
  teamSize?: string;
  image?: string;
  links?: {
    github?: string;
    demo?: string;
    website?: string;
  };
  deliverables?: {
    category: string;
    name: string;
    image: string;
  }[];
}

interface Skill {
  category: string;
  items: {
    name: string;
    level?: '상' | '중' | '하';
  }[];
}

interface Education {
  id: string;
  school: string;
  period: string;
  status: string;
  major: string;
  degree?: string;
}

function readExcelFile(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  
  // 개인 정보 읽기 (A열: 항목명, B열: 값)
  const personalInfoSheet = workbook.Sheets['개인정보'];
  if (!personalInfoSheet) {
    throw new Error('개인정보 시트를 찾을 수 없습니다.');
  }
  
  // 항목명으로 값을 찾는 함수
  const getPersonalInfoValue = (itemName: string): string => {
    let row = 2;
    while (personalInfoSheet[`A${row}`]) {
      if (personalInfoSheet[`A${row}`]?.v === itemName) {
        return personalInfoSheet[`B${row}`]?.v || '';
      }
      row++;
    }
    return '';
  };
  
  const personalInfo: PersonalInfo = {
    name: getPersonalInfoValue('이름'),
    title: getPersonalInfoValue('직책'),
    bio: getPersonalInfoValue('소개'),
    email: getPersonalInfoValue('이메일'),
    linkedin: getPersonalInfoValue('전화번호') || getPersonalInfoValue('연락처') || getPersonalInfoValue('LinkedIn'),
    github: getPersonalInfoValue('GitHub') || getPersonalInfoValue('깃허브'),
    resume: getPersonalInfoValue('이력서') || getPersonalInfoValue('Resume'),
    profileImage: getPersonalInfoValue('프로필사진') || getPersonalInfoValue('프로필이미지') || getPersonalInfoValue('Profile Image'),
  };

  // 경력 읽기 (병합된 셀 처리)
  const experienceSheet = workbook.Sheets['경력'];
  if (!experienceSheet) {
    throw new Error('경력 시트를 찾을 수 없습니다.');
  }
  
  // 병합된 셀 정보 가져오기
  const merges = experienceSheet['!merges'] || [];
  
  // 병합된 셀의 값을 찾는 함수
  const getMergedCellValue = (row: number, col: string): any => {
    const cellAddr = `${col}${row}`;
    const cell = experienceSheet[cellAddr];
    
    // 셀이 있으면 값 반환
    if (cell && cell.v !== undefined && cell.v !== null && cell.v !== '') {
      return cell.v;
    }
    
    // 병합된 셀에서 값 찾기
    const colIndex = col.charCodeAt(0) - 65; // A=0, B=1, ...
    for (const merge of merges) {
      const mergeStartRow = merge.s.r + 1; // 0-based to 1-based
      const mergeEndRow = merge.e.r + 1;
      const mergeStartCol = merge.s.c;
      const mergeEndCol = merge.e.c;
      
      // 현재 셀이 병합 범위 안에 있고, 열이 일치하면
      if (row >= mergeStartRow && row <= mergeEndRow && 
          colIndex >= mergeStartCol && colIndex <= mergeEndCol) {
        const startCol = String.fromCharCode(65 + mergeStartCol);
        const startCell = experienceSheet[`${startCol}${mergeStartRow}`];
        if (startCell && startCell.v !== undefined && startCell.v !== null && startCell.v !== '') {
          return startCell.v;
        }
      }
    }
    
    return null;
  };
  
  // 병합된 셀의 시작 행인지 확인하는 함수
  const isMergedCellStart = (row: number, col: string): boolean => {
    const colIndex = col.charCodeAt(0) - 65;
    for (const merge of merges) {
      const mergeStartRow = merge.s.r + 1;
      const mergeStartCol = merge.s.c;
      
      if (row === mergeStartRow && colIndex === mergeStartCol) {
        return true;
      }
    }
    return false;
  };
  
  const experiences: Experience[] = [];
  let row = 2;
  let currentExp: Experience | null = null;
  let currentItem: ExperienceItem | null = null;
  const range = XLSX.utils.decode_range(experienceSheet['!ref'] || 'A1');
  const maxRow = range.e.r + 1;
  
  while (row <= maxRow) {
    // 병합된 셀에서 값 가져오기
    const company = getMergedCellValue(row, 'A');
    const position = getMergedCellValue(row, 'B');
    const period = getMergedCellValue(row, 'C');
    const startDate = getMergedCellValue(row, 'D');
    const endDate = getMergedCellValue(row, 'E');
    const projectTitle = experienceSheet[`F${row}`]?.v || ''; // F열: 상위 depth
    const projectDetails = experienceSheet[`G${row}`]?.v || ''; // G열: 하위 depth
    
    // 회사명이 있고, 병합된 셀의 시작 행이거나 실제 셀에 값이 있는 경우에만 새로운 경력 항목 시작
    const isCompanyStartRow = isMergedCellStart(row, 'A') || (experienceSheet[`A${row}`]?.v !== undefined && experienceSheet[`A${row}`]?.v !== null && experienceSheet[`A${row}`]?.v !== '');
    
    if (company && typeof company === 'string' && company.trim() && isCompanyStartRow) {
      const companyStr = String(company).trim();
      
      // 이전 경력 항목이 있고 items가 있으면 저장
      if (currentExp && currentExp.items.length > 0) {
        experiences.push(currentExp);
      }
      
      // 새 회사이거나 이전 회사와 다른 경우에만 새 경력 항목 생성
      if (!currentExp || currentExp.company !== companyStr) {
        currentExp = {
          id: `exp-${experiences.length + 1}`,
          company: companyStr,
          position: position ? String(position).trim() : '',
          period: period ? String(period).trim() : '',
          startDate: startDate ? String(startDate).trim() : '',
          endDate: endDate ? (String(endDate).trim() || null) : null,
          items: [],
          technologies: [],
        };
        currentItem = null;
      }
    }
    
    // F열(프로젝트/업무 영역)이 있으면 새로운 ExperienceItem 시작
    if (projectTitle && typeof projectTitle === 'string' && projectTitle.trim() && currentExp) {
      const titleStr = projectTitle.trim();
      
      // 같은 제목이 이미 있으면 기존 항목 사용, 없으면 새로 생성
      const existingItem = currentExp.items.find(item => item.title === titleStr);
      if (existingItem) {
        currentItem = existingItem;
      } else {
        currentItem = {
          title: titleStr,
          details: [],
        };
        currentExp.items.push(currentItem);
      }
    }
    
    // G열(상세 설명)이 있으면 현재 ExperienceItem의 details에 추가
    if (projectDetails && typeof projectDetails === 'string' && projectDetails.trim() && currentItem) {
      const detailLines = projectDetails.split('\n')
        .map((d: string) => d.trim())
        .filter((d: string) => d && currentItem && !currentItem.details.includes(d));
      if (currentItem) {
        currentItem.details.push(...detailLines);
      }
    }
    
    // F나 G열에 데이터가 없고, A~E열도 비어있으면 루프 종료
    if (!projectTitle && !projectDetails && !company && row > 2) {
      // 더 이상 데이터가 없으면 종료
      const hasMoreData = Array.from({ length: 5 }, (_, i) => {
        const checkRow = row + i;
        if (checkRow > maxRow) return false;
        return experienceSheet[`F${checkRow}`]?.v || experienceSheet[`G${checkRow}`]?.v || getMergedCellValue(checkRow, 'A');
      }).some(Boolean);
      
      if (!hasMoreData) {
        // 마지막 경력 항목 저장
        if (currentExp && currentExp.items.length > 0) {
          experiences.push(currentExp);
        }
        break;
      }
    }
    
    row++;
  }
  
  // 마지막 경력 항목 저장 (items가 있는 경우만)
  if (currentExp && currentExp.items.length > 0) {
    experiences.push(currentExp);
  }

  // 프로젝트 읽기
  const projectSheet = workbook.Sheets['프로젝트'];
  if (!projectSheet) {
    throw new Error('프로젝트 시트를 찾을 수 없습니다.');
  }
  
  const projects: Project[] = [];
  row = 2;
  while (projectSheet[`A${row}`]) {
    const demo = projectSheet[`H${row}`]?.v || '';
    const website = projectSheet[`I${row}`]?.v || '';
    const image = projectSheet[`J${row}`]?.v || '';
    
    projects.push({
      id: `proj-${row - 1}`,
      title: projectSheet[`A${row}`]?.v || '',
      description: projectSheet[`B${row}`]?.v || '',
      problem: projectSheet[`C${row}`]?.v || '',
      solution: projectSheet[`D${row}`]?.v || '',
      results: projectSheet[`E${row}`]?.v || '',
      technologies: [], // 기술스택 열이 제거됨
      period: projectSheet[`F${row}`]?.v || '',
      role: projectSheet[`G${row}`]?.v || '',
      image: image ? String(image) : undefined,
      links: {
        ...(demo && { demo: String(demo) }),
        ...(website && { website: String(website) }),
      },
    });
    row++;
  }

  // 스킬 읽기
  const skillSheet = workbook.Sheets['스킬'];
  if (!skillSheet) {
    throw new Error('스킬 시트를 찾을 수 없습니다.');
  }
  
  const skills: Skill[] = [];
  let currentCategory = '';
  row = 2;
  while (skillSheet[`A${row}`] || skillSheet[`B${row}`]) {
    const category = skillSheet[`A${row}`]?.v;
    const name = skillSheet[`B${row}`]?.v;
    const level = skillSheet[`C${row}`]?.v as '상' | '중' | '하' | undefined;
    
    if (category) {
      currentCategory = String(category);
      skills.push({
        category: currentCategory,
        items: [],
      });
    }
    
    if (name && currentCategory) {
      const lastSkill = skills[skills.length - 1];
      lastSkill.items.push({
        name: String(name),
        ...(level && ['상', '중', '하'].includes(String(level)) && { level: level as '상' | '중' | '하' }),
      });
    }
    row++;
  }

  // 학력 읽기
  const educationSheet = workbook.Sheets['학력'];
  const educations: Education[] = [];
  if (educationSheet) {
    row = 2;
    while (educationSheet[`A${row}`]) {
      educations.push({
        id: `edu-${row - 1}`,
        school: educationSheet[`A${row}`]?.v || '',
        period: educationSheet[`B${row}`]?.v || '',
        status: educationSheet[`C${row}`]?.v || '',
        major: educationSheet[`D${row}`]?.v || '',
        degree: educationSheet[`E${row}`]?.v || undefined,
      });
      row++;
    }
  }

  return {
    personalInfo,
    experiences,
    projects,
    skills,
    educations,
  };
}

function generatePortfolioData() {
  const excelPath = path.join(process.cwd(), 'data', 'portfolio.xlsx');
  const outputPath = path.join(process.cwd(), 'data', 'portfolio-generated.ts');

  if (!fs.existsSync(excelPath)) {
    console.error(`엑셀 파일을 찾을 수 없습니다: ${excelPath}`);
    console.log('data/portfolio.xlsx 파일을 생성해주세요.');
    return;
  }

  try {
    const data = readExcelFile(excelPath);
    
    const output = `// 이 파일은 자동 생성됩니다. data/portfolio.xlsx 파일을 수정한 후 npm run build:data를 실행하세요.
// 직접 수정하지 마세요!

export interface ExperienceItem {
  title: string;
  details: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  startDate: string;
  endDate: string | null;
  items: ExperienceItem[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  goal?: string | null;
  flow?: {
    before: string;
    after: string;
  };
  keyDecisions?: string[];
  solution: string;
  results: string;
  technologies: string[];
  period: string;
  role?: string;
  developmentPeriod?: string;
  teamSize?: string;
  image?: string;
  links?: {
    github?: string;
    demo?: string;
    website?: string;
  };
  deliverables?: {
    category: string;
    name: string;
    image: string;
  }[];
}

export interface Skill {
  category: string;
  items: {
    name: string;
    level?: '상' | '중' | '하';
  }[];
}

export interface Education {
  id: string;
  school: string;
  period: string;
  status: string;
  major: string;
  degree?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedin?: string;
  github?: string;
  resume?: string;
  profileImage?: string;
}

export const personalInfo: PersonalInfo = ${JSON.stringify(data.personalInfo, null, 2)};

export const experiences: Experience[] = ${JSON.stringify(data.experiences, null, 2)};

export const projects: Project[] = ${JSON.stringify(data.projects, null, 2)};

export const skills: Skill[] = ${JSON.stringify(data.skills, null, 2)};

export const educations: Education[] = ${JSON.stringify(data.educations || [], null, 2)};
`;

    fs.writeFileSync(outputPath, output, 'utf-8');
    console.log('✅ 포트폴리오 데이터가 성공적으로 생성되었습니다!');
    console.log(`📄 파일 위치: ${outputPath}`);
  } catch (error) {
    console.error('❌ 에러 발생:', error);
  }
}

generatePortfolioData();

