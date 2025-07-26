/**
 * 주어진 enum 객체에 특정 값이 포함되어 있는지 확인합니다.
 * 타입 가드로 사용되어 item의 타입을 TEnumValue로 좁혀줍니다.
 *
 * @param enumVariable - 검사할 enum 객체
 * @param item - enum 값에 포함되어 있는지 확인할 값
 * @returns item이 enum 값 중 하나인지 여부 (타입 가드)
 *
 * @example
 * enum Color { Red = 'red', Blue = 'blue' }
 * const value = 'red';
 * if (enumIncludes(Color, value)) {
 *   // 이 블록 안에서 value는 Color 타입으로 취급됨
 * }
 */
export function enumIncludes<T extends string, TEnumValue extends string>(
  enumVariable: { [key in T]: TEnumValue },
  item: unknown
): item is TEnumValue {
  return Object.values(enumVariable).includes(item);
}

/**
 * 주어진 값이 enum에 포함된 유효한 값인지 확인하고,
 * 유효한 경우 해당 값을 반환하고, 그렇지 않은 경우 기본값을 반환합니다.
 *
 * @param enumVariable - 검사할 enum 객체
 * @param item - 검증할 값
 * @param placeholder - item이 유효하지 않을 경우 반환할 기본값
 * @returns 유효한 enum 값 또는 기본값
 *
 * @example
 * const order = getValidEnumValue(ORDERS_MAP, searchParams.get(SEARCH_PARAMS_ORDER));
 * // order: OrderType | undefined
 * const order = getValidEnumValue(ORDERS_MAP, searchParams.get(SEARCH_PARAMS_ORDER), 'asc');
 * // order: OrderType | undefined
 */
export function getValidEnumValue<T extends string, TEnumValue extends string, P = undefined>(
  enumVariable: { [key in T]: TEnumValue },
  item: unknown,
  placeholder: P = undefined as unknown as P
): TEnumValue | P {
  return enumIncludes(enumVariable, item) ? (item as TEnumValue) : placeholder;
}
