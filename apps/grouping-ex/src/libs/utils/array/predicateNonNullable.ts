/**
 * 배열 필터링에 사용되는 술어(predicate) 함수의 타입입니다.
 * Array.prototype.filter() 메서드와 호환되는 시그니처를 가집니다.
 */
type ArrayPredicate = (value: unknown, index: number, array: unknown[]) => boolean;

/**
 * 배열의 요소가 null 또는 undefined가 아닌지 확인하는 타입 가드 함수입니다.
 *
 * Array.prototype.filter()와 함께 사용하면 null과 undefined를 제거한
 * 새로운 배열을 타입 안전하게 생성할 수 있습니다.
 *
 * @template T - 배열 요소의 타입
 * @param x - 확인할 배열 요소
 * @returns 요소가 null 또는 undefined가 아닌지 여부
 *
 * @example
 * ```typescript
 * const mixed = [1, null, 'hello', undefined, true, 0];
 * const filtered = mixed.filter(predicateNonNullable);
 * // filtered: (string | number | boolean)[] - null, undefined가 제거됨
 *
 * const users = await Promise.all(
 *   userIds.map(id => getUserById(id)) // 일부는 null을 반환할 수 있음
 * );
 * const validUsers = users.filter(predicateNonNullable);
 * // validUsers: User[] - null 사용자가 제거됨
 * ```
 *
 * @see {@link https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array | TypeScript에서 null 필터링 참고}
 */
export const predicateNonNullable = (<T>(x: T): x is NonNullable<T> =>
  x !== undefined && x !== null) satisfies ArrayPredicate;
