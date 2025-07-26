import { logError } from '../logError/logError';

/**
 * 입력받은 condition을 단언합니다. TypeScript의 [Asserts](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions) 함수로 사용합니다.
 * 옵션에 따라 자동으로 로깅됩니다.
 *
 * @param condition 검증할 불리언 조건
 * @param error 조건이 거짓일 경우 발생시킬 오류 객체 (기본값: new Error('assert error'))
 * @param logOptions 에러 로깅 옵션
 * @param logOptions.enableLog 로깅 활성화 여부 (기본값: true)
 * @param logOptions.level 로그 레벨 (기본값: 'error')
 * @param logOptions.metadata 로깅할 추가 메타데이터
 *
 * @example
 * assert(user.hasPermission, new Error('권한이 없습니다'), {
 *   level: 'warning',
 *   metadata: { userId: user.id, action: 'delete' }
 * });
 */
export function assert(
  condition: boolean,
  error: Error = new Error('assert error'),
  logOptions: {
    enableLog?: boolean;
    level?: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
    metadata?: Record<string, unknown>;
  } = {}
): asserts condition {
  if (condition) return;

  // 옵션 기본값 설정
  const { level = 'error', enableLog = true, metadata } = logOptions;

  // 로깅 활성화된 경우 로그 기록
  if (enableLog) {
    logError(error, {
      level,
      ...metadata,
    });
  }
  throw error;
}
