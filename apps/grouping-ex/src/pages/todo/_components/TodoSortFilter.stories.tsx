import { useState } from 'react';

import type { Meta } from '@storybook/react-vite';

import { TodoSortOption } from '../types';
import { TodoSortFilter } from './TodoSortFilter';

const meta = {
  title: 'Pages / todo / TodoSortFilter',
  component: TodoSortFilter,
} satisfies Meta<typeof TodoSortFilter>;

export default meta;
// type Story = StoryObj<typeof meta>;

export const Default = () => {
  const [sortOption, setSortOption] = useState<TodoSortOption>(TodoSortOption.createdAtAsc);

  return <TodoSortFilter value={sortOption} onChange={setSortOption} />;
};
