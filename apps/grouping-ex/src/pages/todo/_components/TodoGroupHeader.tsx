export interface Props {
  header: string;
}

export const TodoGroupHeader = ({ header }: Props) => {
  return <h2>{header}</h2>;
};
