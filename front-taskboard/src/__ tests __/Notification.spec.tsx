import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Notification from '../components/Notification';

describe('Notification component', () => {
  test('renders with success result', () => {
    const { getByText } = render(<Notification content="Success notification" result={true} />);
    expect(getByText(/Success notification/)).toBeInTheDocument();
  });

  test('renders with error result', () => {
    const { getByText } = render(<Notification content="Error notification" result={false} />);
    const contentElement = getByText('Error notification');
    expect(contentElement).toBeInTheDocument();
  });
});
