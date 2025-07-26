import { Children } from 'react';
import type { ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

/**
 * 자식 컴포넌트가 없을 경우 대체 컨텐츠를 렌더링하는 컴포넌트입니다.
 *
 * @param fallback - 자식 컴포넌트가 없을 때 표시할 대체 컨텐츠
 * @param children - 렌더링할 자식 컴포넌트
 * @returns 자식 컴포넌트가 있으면 children을, 없으면 fallback을 렌더링합니다
 *
 * @example
 * <EmptyChildrenFallback fallback={<p>데이터가 없습니다.</p>}>
 *   {items.length > 0 && items.map(item => <Item key={item.id} {...item} />)}
 * </EmptyChildrenFallback>
 */
export const EmptyChildrenFallback = ({ fallback, children }: Props) => {
  const hasChildren = Children.toArray(children).length > 0;

  if (!hasChildren) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
