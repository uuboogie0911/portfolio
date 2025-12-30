import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // data 폴더의 이력서 파일 경로
    const filePath = path.join(process.cwd(), 'data', '문진경 이력서.pdf');
    
    console.log('파일 경로:', filePath);
    console.log('파일 존재 여부:', fs.existsSync(filePath));
    
    // 파일 존재 여부 확인
    if (!fs.existsSync(filePath)) {
      // data 폴더의 모든 파일 확인
      const dataDir = path.join(process.cwd(), 'data');
      const files = fs.readdirSync(dataDir);
      console.log('data 폴더의 파일들:', files);
      
      return NextResponse.json(
        { error: `파일을 찾을 수 없습니다. 경로: ${filePath}` },
        { status: 404 }
      );
    }

    // 파일 읽기
    const fileBuffer = fs.readFileSync(filePath);
    
    // 파일명을 URL 인코딩 (RFC 5987 형식)
    const filename = '문진경_이력서.pdf';
    const encodedFilename = encodeURIComponent(filename);
    
    // PDF 파일로 응답
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodedFilename}"; filename*=UTF-8''${encodedFilename}`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('이력서 다운로드 오류:', error);
    return NextResponse.json(
      { error: '파일을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

