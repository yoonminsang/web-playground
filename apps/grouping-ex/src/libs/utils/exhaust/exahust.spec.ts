import { exhaust } from './exhaust';

enum TestEnum {
  A = 'A',
  B = 'B',
  C = 'C',
}

type TestType = 'X' | 'Y' | 'Z';

describe('exhaust', () => {
  it('모든 enum 값이 처리되었는지 확인', () => {
    function handleEnum(param: TestEnum) {
      switch (param) {
        case TestEnum.A:
          return 'Handled A';
        case TestEnum.B:
          return 'Handled B';
        case TestEnum.C:
          return 'Handled C';
        default:
          throw exhaust(param);
      }
    }

    expect(handleEnum(TestEnum.A)).toBe('Handled A');
    expect(handleEnum(TestEnum.B)).toBe('Handled B');
    expect(handleEnum(TestEnum.C)).toBe('Handled C');
  });

  it('일부 값이 처리되지 않았을 때 에러 발생', () => {
    function handleType(param: TestType) {
      switch (param) {
        case 'X':
          return 'Handled X';
        case 'Y':
          return 'Handled Y';
        // 'Z' 케이스를 의도적으로 누락
        default:
          throw exhaust(param as never);
      }
    }

    expect(handleType('X')).toBe('Handled X');
    expect(handleType('Y')).toBe('Handled Y');

    // 컴파일 타임에는 에러가 발생하지만 런타임에는 실행됨
    // 이 테스트는 런타임 동작을 확인하기 위한 것
    expect(() => handleType('Z')).toThrow('exhaust error');
  });

  it('커스텀 에러 메시지 전달', () => {
    const customError = new Error('Custom exhaust error');

    function testCustomError(param: 'Only') {
      switch (param) {
        case 'Only':
          return 'Handled';
        default:
          throw exhaust(param as never, customError);
      }
    }

    expect(testCustomError('Only')).toBe('Handled');

    // Typescript 컴파일러에서는 이 코드에 도달할 수 없다고 판단하지만
    // 런타임에 특정 상황에서는 도달할 수 있음
    // @ts-ignore를 사용하여 타입스크립트 오류 무시
    // @ts-ignore
    expect(() => testCustomError('Unknown' as any)).toThrow('Custom exhaust error');
  });
});
