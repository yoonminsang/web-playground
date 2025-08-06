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

- 정렬과 그룹핑이 같이 사용되는 경우
- 정렬과 그룹핑은 같이 사용되는 경우를 고려하자. 특히 그룹핑
- string으로 그룹핑을 하게 되면 오름차순 정렬이 자연스럽다.
- 정렬 필터가 있는 경우 1차 정렬은 정렬 필터로, 2차 정렬은 그룹핑한 데이터의 정렬이 필요할 수 있다.

- 정렬과 그룹핑은 함께 사용되는 경우를 고려해야 한다. 특히 그룹핑 시에는 그룹의 순서도 중요하다.
- 문자열(string)로 그룹핑할 경우, 기본적으로 오름차순 정렬이 자연스럽게 적용된다.
- 정렬 필터가 있는 경우,
  1차 정렬은 정렬 필터 기준으로,
  2차 정렬은 그룹핑된 데이터 내에서의 정렬이 필요할 수 있다.
