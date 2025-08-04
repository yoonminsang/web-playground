import { TodoGroupingOption } from '../types';

export interface Props {
  value: TodoGroupingOption;
  onChange: (filter: TodoGroupingOption) => void;
}

export const TodoGroupingFilter = ({ value, onChange }: Props) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as TodoGroupingOption)}>
      <option value={TodoGroupingOption.createdAt}>날짜</option>
      <option value={TodoGroupingOption.category}>카테고리</option>
    </select>
  );
};
