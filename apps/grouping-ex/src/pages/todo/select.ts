import { groupBy } from 'es-toolkit';

import { compareAsc } from '@/utils/date';

import type { Todo } from './api';
import { TodoGroupingOption, TodoSortOption } from './types';

const sortByCategory = (data: Todo[], order: 'asc' | 'desc' = 'asc') => {
  const sortMultiplier = order === 'asc' ? 1 : -1;
  return [...data].sort((a, b) => {
    return a.category.name.localeCompare(b.category.name) * sortMultiplier;
  });
};

const sortByCreatedAt = (data: Todo[], order: 'asc' | 'desc' = 'asc') => {
  const sortMultiplier = order === 'asc' ? 1 : -1;
  return [...data].sort((a, b) => {
    return compareAsc(a.createdAt, b.createdAt) * sortMultiplier;
  });
};

const groupByCategory = (data: Todo[]) => {
  return groupBy(data, (item) => item.category.name);
};

const groupByCreatedAt = (data: Todo[]) => {
  // NOTE: 실무에서는 date 관련 라이브러리로 date 뽑아내기.
  return groupBy(
    data.map((todo) => ({ ...todo, createdAtDate: new Date(todo.createdAt).toISOString().slice(0, 10) })),
    (item) => item.createdAtDate
  );
};

export const todoSelect = {
  sortByCategory,
  sortByCreatedAt,
  groupByCategory,
  groupByCreatedAt,
};

export const todoPageSelect = (data: Todo[], grouping: TodoGroupingOption, sort: TodoSortOption) => {
  const count = data.length;
  // NOTE: 이 때 다른 정렬이 필요해진다면 아래 코드가 복잡해지지는 않을까? 그때는 다음과 같이 개선할 수 있다.
  // const sortedTodosData = (() => {
  //   switch (sort) {
  //     case TodoSortOption.createdAtAsc:
  //       return todoSelect.sortByCreatedAt(todosData, 'asc');
  //     case TodoSortOption.createdAtDesc:
  //       return todoSelect.sortByCreatedAt(todosData, 'desc');
  //     case TodoSortOption.sortByFoo(todosData):
  //       return todoSelect.sortByFoo(todosData);
  //     default:
  //       exhaust(sort, new Error('~~'));
  //   }
  // })();
  let sortedTodosData = todoSelect.sortByCreatedAt(data, sort === TodoSortOption.createdAtAsc ? 'asc' : 'desc');

  // NOTE: 이 때 그룹핑이 많아진다면 switch case로 개선할 수 있다.
  const groupingOption =
    grouping === TodoGroupingOption.category ? todoSelect.groupByCategory : todoSelect.groupByCreatedAt;
  // NOTE: 그룹핑이 category인 경우 category로도 정렬이 필요하다. 데이터적으로 봤을 때는 그룹핑을 한다고 해서 정렬이 필요하지는 않지만 ui ux도 같이 봐야한다. + 스쿼드 소속 팀원과도 공유하자.
  if (grouping === TodoGroupingOption.category) {
    sortedTodosData = todoSelect.sortByCategory(sortedTodosData);
  }
  const todosGroupingData = groupingOption(sortedTodosData);

  return { count, todosGroupingData };
};
