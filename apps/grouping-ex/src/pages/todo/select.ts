import { groupBy } from 'es-toolkit';

import { compareAsc, compareDesc } from '@/utils/date';

import type { Todo } from './api';

type GroupedTodos = Record<string, Todo[]>;

const groupByCategory = (todosData: Todo[]): GroupedTodos => groupBy(todosData, (todo) => todo.category.name);

const groupByCreatedAt = (todosData: Todo[]): GroupedTodos =>
  groupBy(
    todosData.map((todo) => ({ ...todo, createdAtDay: new Date(todo.createdAt).toLocaleDateString() })),
    (todo) => todo.createdAtDay
  );

const sortByCategory = (data: GroupedTodos, order: 'asc' | 'desc') => {
  const sortedByGroup = Object.entries(data).sort((a, b) => {
    const [categoryA] = a;
    const [categoryB] = b;
    const result = categoryA.localeCompare(categoryB);
    return order === 'asc' ? result : -result;
  });
  const sortedByGroupInnerArr = sortedByGroup.map(([category, todos]) => {
    return [
      category,
      order === 'asc'
        ? [...todos].sort((a, b) => a.category.name.localeCompare(b.category.name))
        : [...todos].sort((a, b) => b.category.name.localeCompare(a.category.name)),
    ];
  });
  return sortedByGroupInnerArr;
};

const sortByCreatedAt = (data: GroupedTodos, order: 'asc' | 'desc') => {
  const sortedByGroup = Object.entries(data).sort((a, b) => {
    const [dateA] = a;
    const [dateB] = b;
    return order === 'asc' ? compareAsc(dateA, dateB) : compareDesc(dateA, dateB);
  });
  const sortedByGroupInnerArr = sortedByGroup.map(([createdAt, todos]) => {
    return [
      createdAt,
      order === 'asc'
        ? [...todos].sort((a, b) => compareAsc(a.createdAt, b.createdAt))
        : [...todos].sort((a, b) => compareDesc(a.createdAt, b.createdAt)),
    ] satisfies [string, Todo[]];
  });
  return sortedByGroupInnerArr;
};
export const todoSelect = {
  groupByCategory,
  groupByCreatedAt,
  sortByCategory,
  sortByCreatedAt,
};
