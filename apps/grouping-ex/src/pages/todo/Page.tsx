import { useState } from 'react';

import { TodoGroupingFilter } from './_components/TodoGroupingFilter';
import { TodoHeader } from './_components/TodoHeader';
import { TodoList } from './_components/TodoList';
import { TodoSortFilter } from './_components/TodoSortFilter';
import { useSuspenseTodosQuery } from './query';
import { todoPageSelect, todoSelect } from './select';
import { TodoGroupingOption, TodoSortOption } from './types';

export const TodoPage = () => {
  const [grouping, setGrouping] = useState<TodoGroupingOption>(TodoGroupingOption.createdAt);
  const [sort, setSort] = useState<TodoSortOption>(TodoSortOption.createdAtAsc);

  const {
    data: { count, todosGroupingData },
  } = useSuspenseTodosQuery({
    select: (data) => todoPageSelect(data, grouping, sort),
  });

  return (
    <div>
      <TodoHeader count={count} />
      <div style={{ display: 'flex', gap: '8px' }}>
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
      </div>
      {Object.entries(todosGroupingData).map(([groupingName, data]) => {
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
