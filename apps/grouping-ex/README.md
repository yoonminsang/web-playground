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

### 정렬과 그룹핑의 조합

정렬과 그룹핑이 함께 사용되는 경우 다음 사항들을 고려해야 한다:

#### 그룹 간 정렬

- 문자열(string)로 그룹핑할 경우, 그룹 간 정렬은 기본적으로 오름차순이 자연스럽다
- 예: 카테고리로 그룹핑 시 "개발", "음식", "일상" 순으로 정렬
- UX상 그룹 간 정렬 옵션을 제공하지 않는 경우가 많음

#### 그룹 내 정렬

- 정렬 필터가 있는 경우:
  - 1차 정렬: 정렬 필터 기준 (예: 생성일 오름차순/내림차순)
  - 2차 정렬: 그룹핑 기준 (카테고리 그룹핑 시 카테고리명 오름차순)
  - **정렬 범위 선택**: 그룹 간 정렬만 할지, 그룹 내부까지 정렬할지 결정이 필요함
- 그룹 내부에서는 사용자가 선택한 정렬 옵션에 따라 데이터 정렬

#### 구현 시 고려사항

- 그룹핑 먼저 수행 후 각 그룹 내에서 정렬 적용
- 카테고리 그룹핑의 경우 추가적인 카테고리별 정렬 필요
- 날짜 그룹핑의 경우 그룹 키 자체가 정렬 기준이 됨
