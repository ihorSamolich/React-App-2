import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import HistoryItem from '../components/HistoryItem';

const mockUpdateHistoryItem = {
  id: 1,
  action: 'updated',
  taskName: 'Task 1',
  field: 'status',
  oldValue: 'pending',
  newValue: 'completed',
  date: new Date(),
};

const mockCreateHistoryItem = {
  id: 1,
  action: 'created',
  taskName: 'Task 2',
  field: null,
  oldValue: null,
  newValue: null,
  date: new Date(),
};

const mockDeleteHistoryItem = {
  id: 1,
  action: 'deleted',
  taskName: 'Task 3',
  field: null,
  oldValue: null,
  newValue: null,
  date: new Date(),
};

describe('HistoryItem component', () => {
  test('renders history item for update operation', () => {
    const { getByText } = render(<HistoryItem item={mockUpdateHistoryItem} />);
    expect(getByText(/You updated ● Task 1 status from "pending" to "completed"/)).toBeInTheDocument();
    expect(getByText(/\d{1,2}:\d{2} [AP]M/)).toBeInTheDocument();
  });

  test('renders history item for create operation', () => {
    const { getByText } = render(<HistoryItem item={mockCreateHistoryItem} />);
    expect(getByText(/You created ● Task 2/)).toBeInTheDocument();
    expect(getByText(/\d{1,2}:\d{2} [AP]M/)).toBeInTheDocument();
  });

  test('renders history item for delete operation', () => {
    const { getByText } = render(<HistoryItem item={mockDeleteHistoryItem} />);
    expect(getByText(/You deleted ● Task 3/)).toBeInTheDocument();
    expect(getByText(/\d{1,2}:\d{2} [AP]M/)).toBeInTheDocument();
  });
});
