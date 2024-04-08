import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TaskDetail from '../components/TaskDetail';
import { ITask } from '../interfaces/task.ts';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';

test('renders TaskDetail component', () => {
  const mockTask = {
    id: 1,
    name: 'Sample Task',
    description: 'This is a test task',
    dueDate: new Date('2024-04-06'),
    priority: { name: 'High', id: 1, value: 1 },
    list: { name: 'To-Do', tasks: [], id: 1, boardId: 1 },
  } as ITask;

  const { getByText } = render(
    <Provider store={store}>
      <TaskDetail task={mockTask} />
    </Provider>,
  );

  expect(getByText('Sample Task')).toBeInTheDocument();
  expect(getByText('Status')).toBeInTheDocument();
  expect(getByText('To-Do')).toBeInTheDocument();
  expect(getByText('Sat, Apr 06')).toBeInTheDocument();
  expect(getByText('Priority')).toBeInTheDocument();
  expect(getByText('High')).toBeInTheDocument();
});
