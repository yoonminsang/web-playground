# grouping-ex

## Goal

- 프론트엔드, 백엔드와 상관없이 배열을 grouping해서 보여줘야하는 요구사항은 꽤 자주 등장합니다.
- 특히 grouping, sort, filter 등이 같이 존재하는 경우도 있습니다.
- 다양한 요구사항을 구현하면서 실무에서 grouping 해야하는 상황에 마주쳤을 때 빠르게 구조화해서 구현하는 것이 목표입니다.

## 기억하기

- groupBy 추상화 함수 사용하기
  - ex) es-toolkit

  ```ts
  export function groupBy<T, K extends PropertyKey>(arr: readonly T[], getKeyFromItem: (item: T) => K): Record<K, T[]> {
    const result = {} as Record<K, T[]>;

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const key = getKeyFromItem(item);

      if (!Object.hasOwn(result, key)) {
        result[key] = [];
      }

      result[key].push(item);
    }

    return result;
  }
  ```

- 정렬과 글
