import type { Meta, StoryObj } from '@storybook/react-vite';

import { TodoGroupHeader } from './TodoGroupHeader';

const meta = {
  title: 'Pages / todo / TodoGroupHeader',
  component: TodoGroupHeader,
} satisfies Meta<typeof TodoGroupHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: '개발',
  },
};

export const Korean: Story = {
  args: {
    header: '일상',
  },
};

export const LongText: Story = {
  args: {
    header: '매우 긴 카테고리 이름이 포함된 그룹 헤더',
  },
};

export const Date: Story = {
  args: {
    header: '2024-1-15',
  },
};

export const WithSpecialCharacters: Story = {
  args: {
    header: '개발 & 디자인 (2024)',
  },
};
