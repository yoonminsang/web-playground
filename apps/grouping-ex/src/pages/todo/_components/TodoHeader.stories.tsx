import type { Meta, StoryObj } from '@storybook/react-vite';

import { TodoHeader } from './TodoHeader';

const meta = {
  title: 'Pages / todo / TodoHeader',
  component: TodoHeader,
} satisfies Meta<typeof TodoHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 5,
  },
};

export const Empty: Story = {
  args: {
    count: 0,
  },
};

export const LargeNumber: Story = {
  args: {
    count: 999,
  },
};
