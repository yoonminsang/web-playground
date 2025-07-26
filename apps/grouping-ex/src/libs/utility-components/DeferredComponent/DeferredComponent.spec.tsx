import { act, render, screen } from '@testing-library/react';

import { DeferredComponent } from './DeferredComponent';

describe('DeferredComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('지정된 시간이 지나기 전에는 자식 컴포넌트를 렌더링하지 않는다', () => {
    render(
      <DeferredComponent time={1000}>
        <div data-testid="test-child">테스트 컨텐츠</div>
      </DeferredComponent>
    );

    expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
  });

  it('지정된 시간이 지나면 자식 컴포넌트를 렌더링한다', async () => {
    render(
      <DeferredComponent time={1000}>
        <div data-testid="test-child">테스트 컨텐츠</div>
      </DeferredComponent>
    );

    // 지정된 시간이 지나기 전에는 자식 컴포넌트가 렌더링되지 않음
    expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();

    // 지정된 시간만큼 타이머 진행
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // 상태 업데이트가 반영될 수 있도록 플러시 (React 18+에서 필요할 수 있음)
    await vi.runAllTimersAsync();

    // 지정된 시간이 지난 후에는 자식 컴포넌트가 렌더링됨
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('테스트 컨텐츠')).toBeInTheDocument();
  });

  it('시간이 0으로 설정되어도 다음 렌더 사이클에서 자식 컴포넌트를 렌더링한다', () => {
    render(
      <DeferredComponent time={0}>
        <div data-testid="test-child">테스트 컨텐츠</div>
      </DeferredComponent>
    );

    // 최초 렌더링에서는 자식 컴포넌트가 렌더링되지 않음
    expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();

    // 타이머 진행 (다음 렌더 사이클)
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // 다음 렌더 사이클에서 자식 컴포넌트가 렌더링됨
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('컴포넌트가 언마운트되면 타이머가 정리된다', () => {
    const { unmount } = render(
      <DeferredComponent time={1000}>
        <div>테스트 컨텐츠</div>
      </DeferredComponent>
    );

    // clearTimeout이 호출되는지 확인하기 위한 스파이
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

    // 컴포넌트 언마운트
    unmount();

    // clearTimeout이 호출되었는지 확인
    expect(clearTimeoutSpy).toHaveBeenCalled();

    // 스파이 복원
    clearTimeoutSpy.mockRestore();
  });
});
