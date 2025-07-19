import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('버튼이 렌더링되는지 확인', () => {
    render(<Button>클릭하세요</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('클릭하세요');
  });

  it('disabled 상태가 적용되는지 확인', () => {
    render(<Button disabled>비활성 버튼</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
