import { enumIncludes, getValidEnumValue } from './enum';

// 경로는 실제 파일 위치에 맞게 조정하세요

describe('enumIncludes', () => {
  const TestEnum = {
    A: 'a',
    B: 'b',
    C: 'c',
  } as const;

  it('enum에 포함된 값을 올바르게 식별한다', () => {
    expect(enumIncludes(TestEnum, 'a')).toBe(true);
    expect(enumIncludes(TestEnum, 'b')).toBe(true);
    expect(enumIncludes(TestEnum, 'c')).toBe(true);
  });

  it('enum에 포함되지 않은 값을 올바르게 식별한다', () => {
    expect(enumIncludes(TestEnum, 'd')).toBe(false);
    expect(enumIncludes(TestEnum, '')).toBe(false);
    expect(enumIncludes(TestEnum, null)).toBe(false);
    expect(enumIncludes(TestEnum, undefined)).toBe(false);
    expect(enumIncludes(TestEnum, 123)).toBe(false);
    expect(enumIncludes(TestEnum, {})).toBe(false);
  });

  it('타입 가드 기능이 올바르게 동작한다', () => {
    const value: unknown = 'a';

    if (enumIncludes(TestEnum, value)) {
      // 타입 추론이 됐다면, TestEnum의 메서드나 속성을 사용할 수 있어야 함
      expect(value).toBe(TestEnum.A);

      // 이 함수는 런타임에는 의미가 없지만, 타입스크립트 컴파일 시점에 타입 체크를 확인합니다
      const testTypeGuard = (val: (typeof TestEnum)[keyof typeof TestEnum]) => val;
      testTypeGuard(value); // 컴파일 오류가 발생하지 않아야 함
    }
  });
});

describe('getValidEnumValue', () => {
  const TestEnum = {
    A: 'a',
    B: 'b',
    C: 'c',
  } as const;

  it('enum에 포함된 값을 그대로 반환한다', () => {
    expect(getValidEnumValue(TestEnum, 'a')).toBe('a');
    expect(getValidEnumValue(TestEnum, 'b')).toBe('b');
    expect(getValidEnumValue(TestEnum, 'c')).toBe('c');
  });

  it('enum에 포함되지 않은 값은 기본값(undefined)을 반환한다', () => {
    expect(getValidEnumValue(TestEnum, 'd')).toBeUndefined();
    expect(getValidEnumValue(TestEnum, '')).toBeUndefined();
    expect(getValidEnumValue(TestEnum, null)).toBeUndefined();
    expect(getValidEnumValue(TestEnum, undefined)).toBeUndefined();
    expect(getValidEnumValue(TestEnum, 123)).toBeUndefined();
  });

  it('enum에 포함되지 않은 값이 주어졌을 때 지정된 기본값을 반환한다', () => {
    expect(getValidEnumValue(TestEnum, 'd', 'default')).toBe('default');
    expect(getValidEnumValue(TestEnum, null, TestEnum.A)).toBe(TestEnum.A);
    expect(getValidEnumValue(TestEnum, undefined, TestEnum.B)).toBe(TestEnum.B);
  });

  it('다양한 타입의 기본값을 처리할 수 있다', () => {
    expect(getValidEnumValue(TestEnum, 'invalid', 123)).toBe(123);
    expect(getValidEnumValue(TestEnum, 'invalid', null)).toBeNull();
    expect(getValidEnumValue(TestEnum, 'invalid', { id: 1 })).toEqual({ id: 1 });
  });
});
