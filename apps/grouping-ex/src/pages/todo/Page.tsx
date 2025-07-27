import { useState } from 'react';

import { TodoGroupingFilter } from './_components/TodoGroupingFilter';
import { TodoHeader } from './_components/TodoHeader';
import { TodoList } from './_components/TodoList';
import { TodoSortFilter } from './_components/TodoSortFilter';
import { useSuspenseTodosQuery } from './query';
import { todoSelect } from './select';
import { TodoGroupingOption, TodoSortOption } from './types';

export const TodoPage = () => {
  const [grouping, setGrouping] = useState<TodoGroupingOption>(TodoGroupingOption.createdAt);
  const [sort, setSort] = useState<TodoSortOption>(TodoSortOption.asc);

  const {
    data: { count, todosGroupingData },
  } = useSuspenseTodosQuery({
    select: (todosData) => {
      const count = todosData.length;
      const todosGroupingData =
        grouping === TodoGroupingOption.createdAt
          ? todoSelect.sortByCreatedAt(todoSelect.groupByCreatedAt(todosData), sort)
          : todoSelect.sortByCategory(todoSelect.groupByCategory(todosData), sort);
      return { count, todosGroupingData };
    },
  });

  return (
    <div>
      <TodoHeader count={count} />
      <TodoGroupingFilter
        value={grouping}
        onChange={(newFilter) => {
          setGrouping(newFilter);
        }}
      />
      <TodoSortFilter
        value={sort}
        onChange={(newSort) => {
          setSort(newSort);
        }}
      />
      {todosGroupingData.map(([groupingName, data]) => {
        return (
          <div key={groupingName}>
            <h2>{groupingName}</h2>
            <TodoList todosData={data} />
          </div>
        );
      })}
    </div>
  );
};
