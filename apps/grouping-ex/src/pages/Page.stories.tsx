import type { Meta, StoryObj } from '@storybook/react-vite';

import { TodoPage } from './todo/Page';

const meta = {
  title: 'Pages / todo / Page',
  component: TodoPage,
} satisfies Meta<typeof TodoPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: '개발',
  },
};
