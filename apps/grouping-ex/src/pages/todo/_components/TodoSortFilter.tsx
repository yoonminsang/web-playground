import { TodoSortOption } from '../types';

export interface Props {
  value: TodoSortOption;
  onChange: (sortOption: TodoSortOption) => void;
}

export const TodoSortFilter = ({ value, onChange }: Props) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as TodoSortOption)}>
      <option value={TodoSortOption.asc}>오름차순</option>
      <option value={TodoSortOption.desc}>내림차순</option>
    </select>
  );
};
