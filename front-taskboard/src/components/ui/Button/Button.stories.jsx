import './../../../index.css';

import Button from './index.tsx';
import EditIcon from '../../icons/EditIcon.tsx';
import HistoryIcon from '../../icons/HistoryIcon.tsx';
import CreateIcon from '../../icons/CreateIcon.tsx';
export default {
  title: 'Button',
  component: Button,
};

const Template = arg => <Button {...arg} />;
export const BlueButton = Template.bind({});
BlueButton.args = {
  children: <EditIcon />,
  title: 'Edit',
  style: 'BLUE',
};

export const WhiteButton = Template.bind({});
WhiteButton.args = {
  children: <HistoryIcon />,
  title: 'History',
  style: 'WHITE',
};

export const TransparentButton = Template.bind({});
TransparentButton.args = {
  children: <CreateIcon />,
  title: 'Add new card',
  style: 'TRANSPARENT',
};
