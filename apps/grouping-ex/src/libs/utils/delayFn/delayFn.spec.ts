import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { delayFn } from './delayFn';

describe('delayFn', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('지정된 딜레이 시간 후에 함수가 반환하는 값을 정상적으로 반환한다', async () => {
    const mockFn = vi.fn().mockResolvedValue('success');
    const delay = 1000;

    const promise = delayFn(mockFn, delay);

    // 타이머를 진행시키기 전에는 Promise가 아직 resolve되지 않아야 함
    expect(mockFn).toHaveBeenCalledTimes(1);

    // 타이머를 진행
    vi.advanceTimersByTime(delay);

    // Promise가 resolve되어야 함
    const result = await promise;
    expect(result).toBe('success');
  });

  it('함수가 에러를 던지면 딜레이 후에도 그 에러를 그대로 전파한다', async () => {
    const errorMessage = '함수 실행 중 오류 발생';
    const mockFn = vi.fn().mockRejectedValue(new Error(errorMessage));
    const delay = 1000;

    const promise = delayFn(mockFn, delay);

    // 타이머 진행
    vi.advanceTimersByTime(delay);

    // Promise가 reject되어야 함
    await expect(promise).rejects.toThrow(errorMessage);
  });

  it('함수의 실행 시간이 딜레이보다 길면 함수 실행이 완료된 후 결과를 반환한다', async () => {
    // 2초 후에 완료되는 함수 모의
    const mockFn = vi.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => resolve('delayed success'), 2000);
      });
    });

    const delay = 1000; // 딜레이는 1초

    const promise = delayFn(mockFn, delay);

    // 1초 진행 (딜레이는 끝났지만 함수는 아직 진행 중)
    vi.advanceTimersByTime(delay);

    // 아직 Promise는 resolve되지 않아야 함
    const immediateCheck = Promise.race([
      promise.then(() => 'resolved'),
      new Promise((resolve) => setTimeout(() => resolve('not resolved'), 10)),
    ]);
    vi.advanceTimersByTime(10);
    expect(await immediateCheck).toBe('not resolved');

    // 나머지 1초 진행 (함수 실행 완료)
    vi.advanceTimersByTime(1000);

    // 이제 Promise는 resolve되어야 함
    const result = await promise;
    expect(result).toBe('delayed success');
  });

  it('동기 함수를 처리할 수 있다', async () => {
    const mockFn = vi.fn().mockReturnValue('sync result');
    const delay = 1000;

    const promise = delayFn(mockFn, delay);

    // 타이머 진행
    vi.advanceTimersByTime(delay);

    // Promise가 resolve되어야 함
    const result = await promise;
    expect(result).toBe('sync result');
  });

  it('0ms 딜레이로 호출해도 정상 작동한다', async () => {
    const mockFn = vi.fn().mockResolvedValue('zero delay');
    const delay = 0;

    const promise = delayFn(mockFn, delay);

    // 타이머 진행
    vi.advanceTimersByTime(delay);

    // Promise가 resolve되어야 함
    const result = await promise;
    expect(result).toBe('zero delay');
  });
});
