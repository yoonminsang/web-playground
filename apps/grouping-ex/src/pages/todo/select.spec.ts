import type { Todo } from './api';
import { todoPageSelect, todoSelect } from './select';
import { TodoGroupingOption, TodoSortOption } from './types';

// NOTE: 실제로는 id가 createdAt과 동일할 확률이 높다. 또한 id도 uuid일 수 있다.
const mockTodos: Todo[] = [
  {
    id: '1',
    title: '첫 번째 할 일',
    content: '개발 관련 작업',
    createdAt: '2024-01-15T10:30:00',
    category: { id: '1', name: '개발' },
  },
  {
    id: '2',
    title: '두 번째 할 일',
    content: '일상 관련 작업',
    createdAt: '2024-01-14T14:20:00',
    category: { id: '2', name: '일상' },
  },
  {
    id: '3',
    title: '세 번째 할 일',
    content: '또 다른 개발 작업',
    createdAt: '2024-01-15T16:45:00',
    category: { id: '1', name: '개발' },
  },
  {
    id: '4',
    title: '네 번째 할 일',
    content: '음식 관련 작업',
    createdAt: '2024-01-13T12:00:00',
    category: { id: '3', name: '음식' },
  },
  {
    id: '5',
    title: '다섯 번째 할 일',
    content: '날짜 정렬 테스트',
    createdAt: '2024-01-08T09:00:00',
    category: { id: '1', name: '개발' },
  },
];

// NOTE: id를 테스트하는 건 필수가 아니다. 내부 순서까지 명확하게 검증해야한다면 추가하고 그렇지 않다면 굳이 추가하지 않아도 괜찮다.

describe('sortByCategory', () => {
  it('카테고리 오름차순으로 정렬한다.', () => {
    const result = todoSelect.sortByCategory(mockTodos, 'asc');
    expect(result.map((t) => t.category.name)).toEqual(['개발', '개발', '개발', '음식', '일상']);
    expect(result.map((t) => t.id)).toEqual(['1', '3', '5', '4', '2']);
  });
  it('카테고리 내림차순으로 정렬한다.', () => {
    const result = todoSelect.sortByCategory(mockTodos, 'desc');
    expect(result.map((t) => t.category.name)).toEqual(['일상', '음식', '개발', '개발', '개발']);
    expect(result.map((t) => t.id)).toEqual(['2', '4', '1', '3', '5']);
  });
});

describe('sortByCreatedAt', () => {
  it('생성일 오름차순으로 정렬한다.', () => {
    const result = todoSelect.sortByCreatedAt(mockTodos, 'asc');
    expect(result.map((t) => t.createdAt)).toEqual([
      '2024-01-08T09:00:00',
      '2024-01-13T12:00:00',
      '2024-01-14T14:20:00',
      '2024-01-15T10:30:00',
      '2024-01-15T16:45:00',
    ]);
    expect(result.map((t) => t.id)).toEqual(['5', '4', '2', '1', '3']);
  });

  it('생성일 내림차순으로 정렬한다.', () => {
    const result = todoSelect.sortByCreatedAt(mockTodos, 'desc');
    expect(result.map((t) => t.createdAt)).toEqual([
      '2024-01-15T16:45:00',
      '2024-01-15T10:30:00',
      '2024-01-14T14:20:00',
      '2024-01-13T12:00:00',
      '2024-01-08T09:00:00',
    ]);
    expect(result.map((t) => t.id)).toEqual(['3', '1', '2', '4', '5']);
  });
});

describe('groupByCategory', () => {
  it('카테고리별로 그룹핑한다.', () => {
    const result = todoSelect.groupByCategory(mockTodos);
    expect(Object.keys(result)).toEqual(['개발', '일상', '음식']);
    expect(result['개발'].map((t) => t.id)).toEqual(['1', '3', '5']);
    expect(result['일상'].map((t) => t.id)).toEqual(['2']);
    expect(result['음식'].map((t) => t.id)).toEqual(['4']);
  });
  it('날짜별로 그룹핑한다.', () => {
    const result = todoSelect.groupByCreatedAt(mockTodos);
    const keys = Object.keys(result).sort((a, b) => a.localeCompare(b));
    expect(keys).toEqual(['2024-01-08', '2024-01-13', '2024-01-14', '2024-01-15']);
    expect(result['2024-01-08'].map((t) => t.id)).toEqual(['5']);
    expect(result['2024-01-13'].map((t) => t.id)).toEqual(['4']);
    expect(result['2024-01-14'].map((t) => t.id)).toEqual(['2']);
    expect(result['2024-01-15'].map((t) => t.id)).toEqual(['1', '3']);
  });
});

describe('todoPageSelect', () => {
  describe('카테고리 그룹핑', () => {
    it('생성일 오름차순 정렬 + 카테고리 그룹핑: 1차 생성일 정렬, 2차 카테고리 그룹핑', () => {
      const { count, todosGroupingData } = todoPageSelect(
        mockTodos,
        TodoGroupingOption.category,
        TodoSortOption.createdAtAsc
      );

      expect(count).toBe(5);

      // 2차 정렬: 카테고리명 오름차순으로 그룹 정렬
      expect(Object.keys(todosGroupingData)).toEqual(['개발', '음식', '일상']);

      // 1차 정렬: 각 그룹 내에서 생성일 오름차순 정렬
      expect(todosGroupingData['개발'].map((t) => t.id)).toEqual(['5', '1', '3']);
      expect(todosGroupingData['개발'].map((t) => t.createdAt)).toEqual([
        '2024-01-08T09:00:00',
        '2024-01-15T10:30:00',
        '2024-01-15T16:45:00',
      ]);
      expect(todosGroupingData['일상'].map((t) => t.id)).toEqual(['2']);
      expect(todosGroupingData['음식'].map((t) => t.id)).toEqual(['4']);
    });

    it('생성일 내림차순 정렬 + 카테고리 그룹핑: 1차 생성일 정렬, 2차 카테고리 그룹핑', () => {
      const { count, todosGroupingData } = todoPageSelect(
        mockTodos,
        TodoGroupingOption.category,
        TodoSortOption.createdAtDesc
      );

      expect(count).toBe(5);

      // 2차 정렬: 카테고리명 오름차순으로 그룹 정렬 (그룹 간 정렬은 항상 오름차순)
      expect(Object.keys(todosGroupingData)).toEqual(['개발', '음식', '일상']);

      // 1차 정렬: 각 그룹 내에서 생성일 내림차순 정렬
      expect(todosGroupingData['개발'].map((t) => t.id)).toEqual(['3', '1', '5']);
      expect(todosGroupingData['개발'].map((t) => t.createdAt)).toEqual([
        '2024-01-15T16:45:00',
        '2024-01-15T10:30:00',
        '2024-01-08T09:00:00',
      ]);
      expect(todosGroupingData['일상'].map((t) => t.id)).toEqual(['2']);
      expect(todosGroupingData['음식'].map((t) => t.id)).toEqual(['4']);
    });
  });

  describe('생성일 그룹핑', () => {
    it('생성일 오름차순 정렬 + 생성일 그룹핑 시 날짜별로 오름차순 정렬된다', () => {
      const { count, todosGroupingData } = todoPageSelect(
        mockTodos,
        TodoGroupingOption.createdAt,
        TodoSortOption.createdAtAsc
      );

      expect(count).toBe(5);

      // 날짜 그룹이 오름차순으로 정렬되었는지 확인
      const groupKeys = Object.keys(todosGroupingData);
      expect(groupKeys).toEqual(['2024-01-08', '2024-01-13', '2024-01-14', '2024-01-15']);

      // 각 날짜별 그룹의 내용 확인
      expect(todosGroupingData['2024-01-08'].map((t) => t.id)).toEqual(['5']);
      expect(todosGroupingData['2024-01-13'].map((t) => t.id)).toEqual(['4']);
      expect(todosGroupingData['2024-01-14'].map((t) => t.id)).toEqual(['2']);
      expect(todosGroupingData['2024-01-15'].map((t) => t.id)).toEqual(['1', '3']);

      // 동일 날짜 내에서 시간 순 정렬 확인
      expect(todosGroupingData['2024-01-15'].map((t) => t.createdAt)).toEqual([
        '2024-01-15T10:30:00',
        '2024-01-15T16:45:00',
      ]);
    });

    it('생성일 내림차순 정렬 + 생성일 그룹핑 시 날짜별로 내림차순 정렬된다', () => {
      const { count, todosGroupingData } = todoPageSelect(
        mockTodos,
        TodoGroupingOption.createdAt,
        TodoSortOption.createdAtDesc
      );

      expect(count).toBe(5);

      // 날짜 그룹이 내림차순으로 정렬되었는지 확인
      const groupKeys = Object.keys(todosGroupingData);
      expect(groupKeys).toEqual(['2024-01-15', '2024-01-14', '2024-01-13', '2024-01-08']);

      // 각 날짜별 그룹의 내용 확인
      expect(todosGroupingData['2024-01-15'].map((t) => t.id)).toEqual(['3', '1']);
      expect(todosGroupingData['2024-01-14'].map((t) => t.id)).toEqual(['2']);
      expect(todosGroupingData['2024-01-13'].map((t) => t.id)).toEqual(['4']);
      expect(todosGroupingData['2024-01-08'].map((t) => t.id)).toEqual(['5']);

      // 동일 날짜 내에서 시간 역순 정렬 확인
      expect(todosGroupingData['2024-01-15'].map((t) => t.createdAt)).toEqual([
        '2024-01-15T16:45:00',
        '2024-01-15T10:30:00',
      ]);
    });
  });
});
