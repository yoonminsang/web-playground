import { delay } from 'es-toolkit';

export type ISODate = string;

export interface Category {
  id: string;
  name: string;
}

export interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: ISODate;
  category: Category;
}

export const getTodos = async (): Promise<Todo[]> => {
  await delay(300);

  return [
    {
      id: '1',
      title: '첫 번째 포스트',
      content: '오늘 처음으로 블로그를 시작했습니다.',
      createdAt: '2024-01-15T10:30:00',
      category: {
        id: '1',
        name: '일상',
      },
    },
    {
      id: '2',
      title: '리액트 공부',
      content: 'useState와 useEffect에 대해 학습했습니다.',
      createdAt: '2024-01-15T14:20:00',
      category: {
        id: '2',
        name: '개발',
      },
    },
    {
      id: '3',
      title: '점심 메뉴 추천',
      content: '오늘은 파스타를 먹었는데 정말 맛있었어요.',
      createdAt: '2024-01-14T12:15:00',
      category: {
        id: '3',
        name: '음식',
      },
    },
    {
      id: '4',
      title: '주말 계획',
      content: '이번 주말에는 영화를 보러 갈 예정입니다.',
      createdAt: '2024-01-14T19:45:00',
      category: {
        id: '1',
        name: '일상',
      },
    },
    {
      id: '5',
      title: 'TypeScript 팁',
      content: '유용한 TypeScript 패턴들을 정리해봤습니다.',
      createdAt: '2024-01-13T09:00:00',
      category: {
        id: '2',
        name: '개발',
      },
    },
    {
      id: '6',
      title: '운동 루틴',
      content: '새로운 운동 계획을 세웠습니다.',
      createdAt: '2024-01-13T18:30:00',
      category: {
        id: '4',
        name: '건강',
      },
    },
    {
      id: '7',
      title: 'ESLint 설정하기',
      content: 'monorepo에서 ESLint와 Prettier를 설정했습니다.',
      createdAt: '2024-01-12T16:00:00',
      category: {
        id: '2',
        name: '개발',
      },
    },
    {
      id: '8',
      title: '새로운 카페 발견',
      content: '집 근처에 분위기 좋은 카페를 발견했어요.',
      createdAt: '2024-01-12T11:30:00',
      category: {
        id: '1',
        name: '일상',
      },
    },
    {
      id: '9',
      title: '레시피 공유',
      content: '간단하면서도 맛있는 토마토 파스타 레시피입니다.',
      createdAt: '2024-01-11T20:15:00',
      category: {
        id: '3',
        name: '음식',
      },
    },
    {
      id: '10',
      title: '요가 클래스 후기',
      content: '처음 참여한 요가 클래스가 생각보다 좋았습니다.',
      createdAt: '2024-01-11T08:45:00',
      category: {
        id: '4',
        name: '건강',
      },
    },
    {
      id: '11',
      title: '독서 목록',
      content: '올해 읽고 싶은 책들을 정리해봤습니다.',
      createdAt: '2024-01-10T21:00:00',
      category: {
        id: '5',
        name: '독서',
      },
    },
    {
      id: '12',
      title: 'Git 워크플로우',
      content: '팀에서 사용할 Git 브랜치 전략을 정했습니다.',
      createdAt: '2024-01-10T14:30:00',
      category: {
        id: '2',
        name: '개발',
      },
    },
    {
      id: '13',
      title: '홈 카페 만들기',
      content: '집에서 맛있는 커피를 내리는 방법을 배웠어요.',
      createdAt: '2024-01-09T07:20:00',
      category: {
        id: '3',
        name: '음식',
      },
    },
    {
      id: '14',
      title: '산책로 추천',
      content: '한강 공원의 숨겨진 산책로를 발견했습니다.',
      createdAt: '2024-01-09T17:45:00',
      category: {
        id: '4',
        name: '건강',
      },
    },
    {
      id: '15',
      title: '새해 계획',
      content: '2024년 목표와 계획을 세워봤습니다.',
      createdAt: '2024-01-08T23:59:00',
      category: {
        id: '1',
        name: '일상',
      },
    },
  ];
};
