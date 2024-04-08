import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../store/store.ts';
import BoardItem from '../components/BoardItem';

const mockBoard = { id: 1, name: 'Test Board' };

describe('BoardItem component', () => {
  test('renders board name when not in edit mode', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BoardItem board={mockBoard} setCurrentBoard={() => {}} />
      </Provider>,
    );
    const boardNameElement = getByText('TEST BOARD');
    expect(boardNameElement).toBeInTheDocument();
  });
});
