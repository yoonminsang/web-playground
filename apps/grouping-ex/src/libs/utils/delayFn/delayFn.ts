/**
 * @description 함수에 의도적으로 delay를 주고 싶은 경우 사용합니다.
 * @param fn 실행할 함수
 * @param delay 최소 로딩시간
 * @returns fn
 * 
 * @example
 * ```ts
 * export const useSuspenseGetMe = () =>
     useSuspenseQuery({
       queryKey: ['me'],
       queryFn: () => delayFn(() => api.getMe()),
    });
 * ```
 */
export const delayFn = async <T>(fn: () => Promise<T> | T, delay: number) => {
  const [data] = await Promise.all([fn(), new Promise((resolve) => setTimeout(resolve, delay))]);
  return data;
};
