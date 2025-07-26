import { predicateNonNullable } from './predicateNonNullable';

describe('predicateNonNullable', () => {
  it('null 값에 대해 false를 반환한다', () => {
    expect(predicateNonNullable(null)).toBe(false);
  });

  it('undefined 값에 대해 false를 반환한다', () => {
    expect(predicateNonNullable(undefined)).toBe(false);
  });

  it('숫자 0에 대해 true를 반환한다', () => {
    expect(predicateNonNullable(0)).toBe(true);
  });

  it('빈 문자열에 대해 true를 반환한다', () => {
    expect(predicateNonNullable('')).toBe(true);
  });

  it('false 값에 대해 true를 반환한다', () => {
    expect(predicateNonNullable(false)).toBe(true);
  });

  it('객체에 대해 true를 반환한다', () => {
    expect(predicateNonNullable({})).toBe(true);
  });

  it('배열에 대해 true를 반환한다', () => {
    expect(predicateNonNullable([])).toBe(true);
  });

  it('NaN에 대해 true를 반환한다', () => {
    expect(predicateNonNullable(NaN)).toBe(true);
  });

  it('배열 필터 메서드에서 타입 가드로 사용할 수 있다', () => {
    const array = [1, null, 2, undefined, 3];
    const filtered = array.filter(predicateNonNullable);

    expect(filtered).toEqual([1, 2, 3]);

    // TypeScript 타입 체크: filtered는 number[] 타입이어야 함
    // 이 테스트는 컴파일 시간에 타입 체크를 수행
    const typeCheck = (arr: number[]) => arr;
    typeCheck(filtered); // 컴파일 오류가 없어야 함
  });

  it('배열에서 index와 array 매개변수가 올바르게 전달된다', () => {
    const mockPredicate = vi.fn(predicateNonNullable);
    const array = [1, null, 2];

    array.filter(mockPredicate);

    expect(mockPredicate).toHaveBeenCalledTimes(3);
    expect(mockPredicate).toHaveBeenNthCalledWith(1, 1, 0, array);
    expect(mockPredicate).toHaveBeenNthCalledWith(2, null, 1, array);
    expect(mockPredicate).toHaveBeenNthCalledWith(3, 2, 2, array);
  });
});
