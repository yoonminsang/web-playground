// import type { Todo } from './api';
// import {
//   groupByCategory,
//   groupByCategoryAsc,
//   groupByCategoryDesc,
//   groupByCreatedAt,
//   groupByCreatedAtAsc,
//   groupByCreatedAtDesc,
// } from './select';

// const mockTodos: Todo[] = [
//   {
//     id: '1',
//     title: '첫 번째 할 일',
//     content: '개발 관련 작업',
//     createdAt: '2024-01-15T10:30:00',
//     category: { id: '1', name: '개발' },
//   },
//   {
//     id: '2',
//     title: '두 번째 할 일',
//     content: '일상 관련 작업',
//     createdAt: '2024-01-14T14:20:00',
//     category: { id: '2', name: '일상' },
//   },
//   {
//     id: '3',
//     title: '세 번째 할 일',
//     content: '또 다른 개발 작업',
//     createdAt: '2024-01-15T16:45:00',
//     category: { id: '1', name: '개발' },
//   },
//   {
//     id: '4',
//     title: '네 번째 할 일',
//     content: '음식 관련 작업',
//     createdAt: '2024-01-13T12:00:00',
//     category: { id: '3', name: '음식' },
//   },
//   {
//     id: '5',
//     title: '다섯 번째 할 일',
//     content: '날짜 정렬 테스트',
//     createdAt: '2024-01-08T09:00:00',
//     category: { id: '1', name: '개발' },
//   },
// ];

// describe('groupByCategory', () => {
//   it('카테고리별로 todos를 그룹화한다', () => {
//     const result = groupByCategory(mockTodos);

//     expect(result).toEqual({
//       개발: [mockTodos[0], mockTodos[2], mockTodos[4]], // 3개 항목
//       일상: [mockTodos[1]],
//       음식: [mockTodos[3]],
//     });
//   });

//   it('빈 배열을 전달하면 빈 객체를 반환한다', () => {
//     const result = groupByCategory([]);
//     expect(result).toEqual({});
//   });

//   it('같은 카테고리의 todos가 배열로 묶인다', () => {
//     const result = groupByCategory(mockTodos);
//     expect(result['개발']).toHaveLength(3); // 3개로 변경
//     expect(result['일상']).toHaveLength(1);
//     expect(result['음식']).toHaveLength(1);
//   });
// });

// describe('groupByCategoryAsc', () => {
//   it('카테고리명을 오름차순으로 정렬한다', () => {
//     const result = groupByCategoryAsc(mockTodos);
//     const categories = result.map(([category]) => category);

//     expect(categories).toEqual(['개발', '음식', '일상']);
//   });

//   it('각 그룹의 데이터가 올바르게 포함된다', () => {
//     const result = groupByCategoryAsc(mockTodos);

//     expect(result[0][1]).toEqual([mockTodos[0], mockTodos[2], mockTodos[4]]); // 개발 (3개)
//     expect(result[1][1]).toEqual([mockTodos[3]]); // 음식
//     expect(result[2][1]).toEqual([mockTodos[1]]); // 일상
//   });
// });

// describe('groupByCategoryDesc', () => {
//   it('카테고리명을 내림차순으로 정렬한다', () => {
//     const result = groupByCategoryDesc(mockTodos);
//     const categories = result.map(([category]) => category);

//     expect(categories).toEqual(['일상', '음식', '개발']);
//   });

//   it('각 그룹의 데이터가 올바르게 포함된다', () => {
//     const result = groupByCategoryDesc(mockTodos);

//     expect(result[0][1]).toEqual([mockTodos[1]]); // 일상
//     expect(result[1][1]).toEqual([mockTodos[3]]); // 음식
//     expect(result[2][1]).toEqual([mockTodos[0], mockTodos[2], mockTodos[4]]); // 개발 (3개)
//   });
// });

// describe('groupByCreatedAt', () => {
//   it('생성일별로 todos를 그룹화한다', () => {
//     const result = groupByCreatedAt(mockTodos);

//     expect(result['2024-01-15']).toHaveLength(2); // 같은 날짜 2개
//     expect(result['2024-01-14']).toHaveLength(1);
//     expect(result['2024-01-13']).toHaveLength(1);
//     expect(result['2024-01-08']).toHaveLength(1);
//   });

//   it('그룹화된 todos에 createdAtDay 속성이 추가된다', () => {
//     const result = groupByCreatedAt(mockTodos);
//     const jan15Todos = result['2024-01-15'];

//     jan15Todos.forEach((todo) => {
//       expect(todo).toHaveProperty('createdAtDay', '2024-01-15');
//     });
//   });

//   it('빈 배열을 전달하면 빈 객체를 반환한다', () => {
//     const result = groupByCreatedAt([]);
//     expect(result).toEqual({});
//   });
// });

// describe('groupByCreatedAtAsc', () => {
//   it('생성일을 오름차순으로 정렬한다', () => {
//     const result = groupByCreatedAtAsc(mockTodos);
//     const dates = result.map(([date]) => date);

//     // 이제 올바른 순서가 나올 것임
//     expect(dates).toEqual(['2024-01-08', '2024-01-13', '2024-01-14', '2024-01-15']);
//   });

//   it('각 날짜 그룹의 데이터가 올바르게 포함된다', () => {
//     const result = groupByCreatedAtAsc(mockTodos);

//     expect(result.find(([date]) => date === '2024-01-15')?.[1]).toHaveLength(2);
//     expect(result.find(([date]) => date === '2024-01-14')?.[1]).toHaveLength(1);
//     expect(result.find(([date]) => date === '2024-01-13')?.[1]).toHaveLength(1);
//     expect(result.find(([date]) => date === '2024-01-08')?.[1]).toHaveLength(1);
//   });
// });

// describe('groupByCreatedAtDesc', () => {
//   it('생성일을 내림차순으로 정렬한다', () => {
//     const result = groupByCreatedAtDesc(mockTodos);
//     const dates = result.map(([date]) => date);

//     // 이제 올바른 순서가 나올 것임
//     expect(dates).toEqual(['2024-01-15', '2024-01-14', '2024-01-13', '2024-01-08']);
//   });

//   it('각 날짜 그룹의 데이터가 올바르게 포함된다', () => {
//     const result = groupByCreatedAtDesc(mockTodos);

//     expect(result.find(([date]) => date === '2024-01-15')?.[1]).toHaveLength(2);
//     expect(result.find(([date]) => date === '2024-01-14')?.[1]).toHaveLength(1);
//     expect(result.find(([date]) => date === '2024-01-13')?.[1]).toHaveLength(1);
//     expect(result.find(([date]) => date === '2024-01-08')?.[1]).toHaveLength(1);
//   });
// });
