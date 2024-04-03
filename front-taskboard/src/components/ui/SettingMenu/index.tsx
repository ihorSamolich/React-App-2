import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import MenuIcon from '../../icons/MenuIcon.tsx';
import { classNames } from '../../../utils/classNames.ts';
import EditIcon from '../../icons/EditIcon.tsx';
import CreateIcon from '../../icons/CreateIcon.tsx';
import DeleteIcon from '../../icons/DeleteIcon.tsx';

interface ISettingsMenuProps {
  type: 'LIST' | 'TASK';
  onEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCreate?: () => void;
}

const SettingsMenu: React.FC<ISettingsMenuProps> = ({ type, onEdit, onCreate, onDelete }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          onClick={event => event.stopPropagation()}
          className="flex w-full rounded-full justify-center font-semibold opacity-65 hover:opacity-100 hover:scale-110"
        >
          <MenuIcon />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onEdit}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'flex w-full gap-2 items-center px-4 py-2 text-sm',
                  )}
                >
                  <EditIcon />
                  Edit
                </button>
              )}
            </Menu.Item>
            {type === 'LIST' && (
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={onCreate}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'flex gap-2 items-center  px-4 py-2 text-sm',
                    )}
                  >
                    <CreateIcon />
                    Add new card
                  </div>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onDelete}
                  className={classNames(
                    active ? 'bg-gray-100 text-red-600' : 'text-red-500',
                    'flex gap-2 items-center w-full px-4 py-2 text-sm',
                  )}
                >
                  <DeleteIcon />
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SettingsMenu;
