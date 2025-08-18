import { compareAsc, compareDesc } from './date';

describe('compareAsc', () => {
  it('첫 번째 날짜가 더 이른 경우 -1을 반환한다', () => {
    expect(compareAsc('2024-01-10', '2024-01-15')).toBe(-1);
    expect(compareAsc(new Date('2024-01-10'), new Date('2024-01-15'))).toBe(-1);
  });

  it('첫 번째 날짜가 더 늦은 경우 1을 반환한다', () => {
    expect(compareAsc('2024-01-15', '2024-01-10')).toBe(1);
    expect(compareAsc(new Date('2024-01-15'), new Date('2024-01-10'))).toBe(1);
  });

  it('같은 날짜인 경우 0을 반환한다', () => {
    expect(compareAsc('2024-01-15', '2024-01-15')).toBe(0);
    expect(compareAsc(new Date('2024-01-15'), new Date('2024-01-15'))).toBe(0);
  });
});

describe('compareDesc', () => {
  it('첫 번째 날짜가 더 늦은 경우 -1을 반환한다', () => {
    expect(compareDesc('2024-01-15', '2024-01-10')).toBe(-1);
    expect(compareDesc(new Date('2024-01-15'), new Date('2024-01-10'))).toBe(-1);
  });

  it('첫 번째 날짜가 더 이른 경우 1을 반환한다', () => {
    expect(compareDesc('2024-01-10', '2024-01-15')).toBe(1);
    expect(compareDesc(new Date('2024-01-10'), new Date('2024-01-15'))).toBe(1);
  });

  it('같은 날짜인 경우 0을 반환한다', () => {
    expect(compareDesc('2024-01-15', '2024-01-15')).toBe(0);
    expect(compareDesc(new Date('2024-01-15'), new Date('2024-01-15'))).toBe(0);
  });
});
