// NOTE: 실무에서는 date-fns, dayjs같은 라이브러리를 사용합니다.

/**
 * 두 날짜를 비교하여 오름차순 정렬을 위한 값을 반환합니다.
 * date-fns의 compareAsc와 동일한 방식
 * @param dateA 첫 번째 날짜
 * @param dateB 두 번째 날짜
 * @returns -1 (dateA < dateB), 0 (같음), 1 (dateA > dateB)
 */
export const compareAsc = (dateA: Date | string, dateB: Date | string): number => {
  const timeA = new Date(dateA).getTime();
  const timeB = new Date(dateB).getTime();

  if (timeA < timeB) return -1;
  if (timeA > timeB) return 1;
  return 0;
};

/**
 * 두 날짜를 비교하여 내림차순 정렬을 위한 값을 반환합니다.
 * date-fns의 compareDesc와 동일한 방식
 * @param dateA 첫 번째 날짜
 * @param dateB 두 번째 날짜
 * @returns -1 (dateA > dateB), 0 (같음), 1 (dateA < dateB)
 */
export const compareDesc = (dateA: Date | string, dateB: Date | string): number => {
  return compareAsc(dateB, dateA); // 순서만 바꿔서 내림차순
};
