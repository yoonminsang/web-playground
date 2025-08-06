import { useSuspenseQuery } from '@tanstack/react-query';

import { type Todo, getTodos } from './api';

export const useSuspenseTodosQuery = <TData = Todo[]>(options?: { select?: (data: Todo[]) => TData }) => {
  return useSuspenseQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    ...options,
  });
};
