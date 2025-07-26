import { render, screen } from '@testing-library/react';

import { EmptyChildrenFallback } from './EmptyChildrenFallback';

describe('EmptyChildrenFallback', () => {
  it('자식 컴포넌트가 있으면 자식 컴포넌트를 렌더링한다', () => {
    render(
      <EmptyChildrenFallback fallback={<div>대체 컨텐츠</div>}>
        <div>자식 컴포넌트</div>
      </EmptyChildrenFallback>
    );

    expect(screen.getByText('자식 컴포넌트')).toBeInTheDocument();
    expect(screen.queryByText('대체 컨텐츠')).not.toBeInTheDocument();
  });

  it('자식 컴포넌트가 없으면 fallback을 렌더링한다', () => {
    render(<EmptyChildrenFallback fallback={<div>대체 컨텐츠</div>}>{[]}</EmptyChildrenFallback>);

    expect(screen.getByText('대체 컨텐츠')).toBeInTheDocument();
  });

  it('조건부 렌더링으로 자식 컴포넌트가 null이면 fallback을 렌더링한다', () => {
    const items: string[] = [];

    render(
      <EmptyChildrenFallback fallback={<div>데이터가 없습니다</div>}>
        {items.length > 0 && items.map((item, index) => <div key={index}>{item}</div>)}
      </EmptyChildrenFallback>
    );

    expect(screen.getByText('데이터가 없습니다')).toBeInTheDocument();
  });

  it('조건부 렌더링으로 자식 컴포넌트가 있으면 자식 컴포넌트를 렌더링한다', () => {
    const items = ['항목 1', '항목 2', '항목 3'];

    render(
      <EmptyChildrenFallback fallback={<div>데이터가 없습니다</div>}>
        {items.length > 0 && items.map((item, index) => <div key={index}>{item}</div>)}
      </EmptyChildrenFallback>
    );

    expect(screen.getByText('항목 1')).toBeInTheDocument();
    expect(screen.getByText('항목 2')).toBeInTheDocument();
    expect(screen.getByText('항목 3')).toBeInTheDocument();
    expect(screen.queryByText('데이터가 없습니다')).not.toBeInTheDocument();
  });

  it('복수의 자식 컴포넌트가 있을 때도 자식 컴포넌트를 렌더링한다', () => {
    render(
      <EmptyChildrenFallback fallback={<div>대체 컨텐츠</div>}>
        <div>첫 번째 자식</div>
        <div>두 번째 자식</div>
      </EmptyChildrenFallback>
    );

    expect(screen.getByText('첫 번째 자식')).toBeInTheDocument();
    expect(screen.getByText('두 번째 자식')).toBeInTheDocument();
    expect(screen.queryByText('대체 컨텐츠')).not.toBeInTheDocument();
  });
});
