import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface Props {
  /** 지연 후 렌더링할 자식 컴포넌트 */
  children: ReactNode;
  /** 렌더링을 지연시킬 시간(밀리초) */
  time: number;
}

/**
 * 지정된 시간 이후에 자식 컴포넌트를 렌더링하는 컴포넌트입니다.
 *
 * 로딩 시간이 짧은 경우 UI가 깜빡이는 현상을 방지하는 데 사용됩니다.
 * 예를 들어, API 응답이 매우 빠른 경우 로딩 스피너가 잠깐 나타났다가
 * 바로 사라지는 것을 막을 수 있습니다.
 *
 * @param props - 컴포넌트 속성
 * @param props.children - 지연 후 렌더링할 자식 컴포넌트
 * @param props.time - 렌더링을 지연시킬 시간(밀리초)
 * @returns 지연 시간 후 children을 렌더링하거나 null
 *
 * @example
 * ```tsx
 * // 300ms 후에 로딩 스피너를 표시
 * <DeferredComponent time={300}>
 *   <LoadingSpinner />
 * </DeferredComponent>
 *
 * // 500ms 후에 에러 메시지를 표시
 * <DeferredComponent time={500}>
 *   <ErrorMessage message="데이터를 불러올 수 없습니다" />
 * </DeferredComponent>
 * ```
 */
export const DeferredComponent = ({ children, time }: Props) => {
  const [isDeferred, setIsDeferred] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, time);
    return () => clearTimeout(timeoutId);
  }, [time]);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
};
