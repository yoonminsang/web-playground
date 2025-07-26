/**
 * 객체 타입에서 값들의 유니온 타입을 추출하는 유틸리티 타입입니다.
 *
 * @template T - 값을 추출할 객체 타입
 * @returns T의 모든 속성 값들의 유니온 타입
 *
 * @example
 * ```typescript
 * const STATUS = {
 *   PENDING: 'pending',
 *   SUCCESS: 'success',
 *   ERROR: 'error'
 * } as const;
 *
 * type StatusValue = ExtractValue<typeof STATUS>; // 'pending' | 'success' | 'error'
 * ```
 */
export type ExtractValue<T> = T[keyof T];
