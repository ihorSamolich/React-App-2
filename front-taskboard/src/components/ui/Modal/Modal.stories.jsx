import './../../../index.css';

import Modal from './index.tsx';
export default {
  title: 'Modal',
  component: Modal,
};

const Template = arg => <Modal {...arg} />;
export const Default = Template.bind({});
Default.args = {
  children: <h1>Content</h1>,
  isOpen: true,
  setIsOpen: () => console.log('Close'),
};
