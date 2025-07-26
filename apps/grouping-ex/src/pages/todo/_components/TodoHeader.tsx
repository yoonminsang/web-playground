export interface Props {
  count: number;
}

export const TodoHeader = ({ count }: Props) => {
  return <h1>Todo 리스트 ({count}개)</h1>;
};
