/**
 * 타입 체크를 완벽하게 수행하기 위한 유틸리티 함수입니다.
 * 주로 switch-case 문의 default 케이스에서 모든 가능한 값이 처리되었는지 확인하는 데 사용됩니다.
 *
 * 모든 케이스가 명시적으로 처리된 경우, TypeScript는 default 케이스에 'never' 타입만 도달할 수 있다고 판단합니다.
 * 만약 처리되지 않은 케이스가 있다면 컴파일 타임에 타입 에러가 발생합니다.
 *
 * @example
 * ```typescript
 * enum Direction { Up, Down, Left, Right }
 *
 * function move(direction: Direction): string {
 *   switch (direction) {
 *     case Direction.Up: return "위로 이동";
 *     case Direction.Down: return "아래로 이동";
 *     case Direction.Left: return "왼쪽으로 이동";
 *     case Direction.Right: return "오른쪽으로 이동";
 *     default:
 *       // 모든 케이스가 처리되었다면 이 코드는 실행되지 않아야 함
 *       // 만약 Direction enum에 새 값이 추가되면 컴파일 에러 발생
 *       throw exhaust(direction);
 *   }
 * }
 * ```
 *
 * @param _param 'never' 타입이어야 하는 파라미터. 모든 케이스가 처리되었다면 이 함수는 호출되지 않아야 함
 * @param error 발생시킬 에러 객체 (기본값: 'exhaust error' 메시지가 있는 Error 객체)
 * @returns 항상 에러 객체를 반환하지만, 이 함수는 일반적으로 에러를 throw하는 용도로 사용됨
 */
export function exhaust(_param: never, error: Error = new Error('exhaust error')) {
  return error;
}
