import { TodoSortOption } from '../types';

export interface Props {
  value: TodoSortOption;
  onChange: (sortOption: TodoSortOption) => void;
}

export const TodoSortFilter = ({ value, onChange }: Props) => {
  return (
    <div>
      <div>정렬</div>
      <select value={value} onChange={(e) => onChange(e.target.value as TodoSortOption)}>
        <option value={TodoSortOption.createdAtAsc}>오래된순</option>
        <option value={TodoSortOption.createdAtDesc}>최신순</option>
      </select>
    </div>
  );
};
