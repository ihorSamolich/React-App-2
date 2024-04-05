import './../../../index.css';

import SettingsMenu from './index.tsx';
export default {
  title: 'SettingsMenu',
  component: SettingsMenu,
};

const Template = arg => <SettingsMenu {...arg} />;
export const ListMenu = Template.bind({});
ListMenu.args = {
  type: 'LIST',
};

export const TaskMenu = Template.bind({});
TaskMenu.args = {
  type: 'TASK',
};
