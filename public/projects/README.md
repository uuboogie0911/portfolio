# 프로젝트 이미지

각 프로젝트의 이미지를 저장하는 폴더입니다.

## 사용 방법

1. 프로젝트 ID로 폴더를 만듭니다 (예: `proj-1/`)
2. 해당 폴더에 이미지 파일을 넣습니다
3. 지원 형식: JPG, JPEG, PNG, GIF, WEBP

## 예시

```
public/projects/
  ├── proj-1/
  │   ├── image1.jpg
  │   ├── image2.png
  │   └── screenshot.png
  ├── proj-2/
  │   └── main-image.jpg
  └── README.md
```

## 프로젝트 ID 확인

프로젝트 ID는 `data/portfolio-generated.ts` 파일에서 확인할 수 있습니다.
각 프로젝트의 `id` 필드 값이 프로젝트 ID입니다.


















