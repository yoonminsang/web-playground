/**
 * 에러 로그의 심각도 레벨을 나타내는 타입입니다.
 * - fatal: 시스템이 더 이상 작동할 수 없는 치명적 오류
 * - error: 복구 가능한 일반적인 오류
 * - warning: 경고성 메시지
 * - info: 정보성 메시지
 * - debug: 디버깅 목적의 메시지
 */
type ErrorLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

/**
 * 에러 로깅 시 사용할 옵션 인터페이스입니다.
 */
interface ErrorLogOptions {
  /** 로그 레벨 (기본값: 'warning') */
  level?: ErrorLevel;
  /** 추가 메타데이터 (사용자 ID, 액션 등) */
  [key: string]: unknown;
}

/** 실제 로깅 시스템 연동 여부 (개발 환경에서는 false) */
const logging = false;

/**
 * 로깅 옵션을 정규화하는 내부 함수입니다.
 * 문자열로 전달된 레벨을 객체 형태로 변환하거나 기본값을 설정합니다.
 *
 * @param options - 정규화할 옵션 (문자열 또는 객체)
 * @returns 정규화된 ErrorLogOptions 객체
 */
const normalizeOptions = (options?: ErrorLogOptions | ErrorLevel): ErrorLogOptions => {
  if (typeof options === 'string') {
    return { level: options };
  }
  return options ?? { level: 'warning' };
};

/**
 * 애플리케이션의 에러를 로깅하는 중앙화된 함수입니다.
 *
 * 개발 환경에서는 콘솔에 출력하고, 프로덕션 환경에서는
 * Sentry, Bugsnag 등의 외부 로깅 서비스와 연동할 수 있습니다.
 *
 * @param error - 로깅할 에러 객체
 * @param options - 로깅 옵션 (레벨과 추가 메타데이터)
 *
 * @example
 * ```typescript
 * // 기본 에러 로깅
 * logError(new Error('API 호출 실패'));
 *
 * // 레벨과 메타데이터 포함
 * logError(error, {
 *   level: 'error',
 *   userId: user.id,
 *   endpoint: '/api/users'
 * });
 *
 * // 간단한 레벨 지정
 * logError(error, 'warning');
 * ```
 */
export const logError = (error: Error, options?: ErrorLogOptions | ErrorLevel) => {
  const { level: _level, ..._metadata } = normalizeOptions(options);
  const errorLevel = _level ?? 'warning';
  const metadata = Object.keys(_metadata).length > 0 ? _metadata : undefined;

  if (logging) {
    // sentry, bugsnag 등 실제 로깅 서비스와 연동
    // 예: Sentry.captureException(error, { level: errorLevel, extra: metadata });
  } else {
    console.error(`[${errorLevel.toUpperCase()}]`, error);
    if (metadata) {
      console.error('Error metadata:', metadata);
    }
  }
};
