import './../../../index.css';

import ActionButton from './index.tsx';
import ConfirmIcon from '../../icons/ConfirmIcon.tsx';
import CancelIcon from '../../icons/CancelIcon.tsx';
export default {
  title: 'ActionButton',
  component: ActionButton,
};

const Template = arg => <ActionButton {...arg} />;
export const OkButton = Template.bind({});
OkButton.args = {
  type: 'OK',
  children: <ConfirmIcon />,
};

export const CancelButton = Template.bind({});
CancelButton.args = {
  type: 'CANCEL',
  children: <CancelIcon />,
};
