import type { ExtractValue } from '@/libs';

export const TodoGroupingOption = {
  createdAt: 'createdAt',
  category: 'category',
} as const;
export type TodoGroupingOption = ExtractValue<typeof TodoGroupingOption>;

export const TodoSortOption = {
  asc: 'asc',
  desc: 'desc',
} as const;
export type TodoSortOption = ExtractValue<typeof TodoSortOption>;
