import { vi } from 'vitest';

import { logError } from '../logError/logError';
import { assert } from './assert';

// logError 모듈 모킹
vi.mock('../logError/logError', () => ({
  logError: vi.fn(),
}));

describe('assert', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('조건이 true면 아무 동작도 하지 않는다', () => {
    expect(() => assert(true, new Error('에러 발생'))).not.toThrow();
    expect(logError).not.toHaveBeenCalled();
  });

  it('조건이 false면 주어진 에러를 throw한다', () => {
    const errorMessage = '값이 유효하지 않습니다';
    const testError = new Error(errorMessage);

    expect(() => assert(false, testError)).toThrow(errorMessage);
    expect(logError).toHaveBeenCalledTimes(1);
    expect(logError).toHaveBeenCalledWith(testError, { level: 'error' });
  });

  it('enableLog 옵션이 false면 로깅하지 않는다', () => {
    const testError = new Error('로깅 비활성화 테스트');

    expect(() => assert(false, testError, { enableLog: false })).toThrow();
    expect(logError).not.toHaveBeenCalled();
  });

  it('level 옵션이 제공되면 로그에 포함된다', () => {
    const testError = new Error('레벨 테스트');

    expect(() => assert(false, testError, { level: 'warning' })).toThrow();
    expect(logError).toHaveBeenCalledWith(testError, { level: 'warning' });
  });

  it('metadata 옵션이 제공되면 로그에 포함된다', () => {
    const testError = new Error('메타데이터 테스트');
    const metadata = { userId: '123', action: 'login' };

    expect(() => assert(false, testError, { metadata })).toThrow();
    expect(logError).toHaveBeenCalledWith(
      testError,
      expect.objectContaining({
        level: 'error',
        userId: '123',
        action: 'login',
      })
    );
  });

  it('level과 metadata가 모두 제공되면 로그에 포함된다', () => {
    const testError = new Error('레벨과 메타데이터 테스트');
    const metadata = { component: 'auth', method: 'validate' };

    expect(() =>
      assert(false, testError, {
        level: 'warning',
        metadata,
      })
    ).toThrow();

    expect(logError).toHaveBeenCalledWith(
      testError,
      expect.objectContaining({
        level: 'warning',
        component: 'auth',
        method: 'validate',
      })
    );
  });

  it('타입 가드 역할을 제대로 수행한다', () => {
    // 이 테스트는 실제로 런타임에 확인할 수 없지만, 타입스크립트 컴파일러에 의해 체크됩니다
    function testTypeGuard(value: string | null) {
      assert(value !== null, new Error('값이 null입니다'));

      // 이 시점에서 value는 string 타입으로 좁혀져야 합니다
      // 따라서 string 메소드를 호출할 수 있어야 합니다
      expect(value.length).toBeGreaterThanOrEqual(0);
    }

    testTypeGuard('test');
    // testTypeGuard(null); // 런타임에 에러가 발생하므로 주석 처리
  });
});
