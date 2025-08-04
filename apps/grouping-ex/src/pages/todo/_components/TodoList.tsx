import { type Todo } from '../api';

export interface Props {
  todosData: Todo[];
}

export const TodoList = ({ todosData }: Props) => {
  return (
    <div>
      {todosData.map((todo) => (
        <div
          key={todo.id}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            margin: '5px 0',
            borderRadius: '4px',
          }}
        >
          <h3>{todo.title}</h3>
          <p>{todo.content}</p>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <span>카테고리: {todo.category.name}</span> |
            <span> 작성일: {new Date(todo.createdAt).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
