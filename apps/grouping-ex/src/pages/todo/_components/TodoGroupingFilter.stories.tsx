import { useState } from 'react';

import type { Meta } from '@storybook/react-vite';

import { TodoGroupingOption } from '../types';
import { TodoGroupingFilter } from './TodoGroupingFilter';

const meta = {
  title: 'Pages / todo / TodoGroupingFilter',
  component: TodoGroupingFilter,
} satisfies Meta<typeof TodoGroupingFilter>;

export default meta;
// type Story = StoryObj<typeof meta>;

export const Default = () => {
  const [filter, setFilter] = useState<TodoGroupingOption>(TodoGroupingOption.createdAt);

  return <TodoGroupingFilter value={filter} onChange={setFilter} />;
};
