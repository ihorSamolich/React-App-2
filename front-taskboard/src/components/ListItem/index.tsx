import React, { Fragment, useEffect, useRef, useState } from 'react';
import TaskItem from '../TaskItem';
import { IList } from '../../interfaces/list.ts';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '../../utils/classNames.ts';
import {
  useDeleteListMutation,
  useUpdateListMutation,
} from '../../services/list.ts';
import Notification from '../Notification';
import CreateTask from '../TaskCreate';

const ListItem: React.FC<IList> = ({ id, name, tasks }) => {
  const [deleteList] = useDeleteListMutation();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isCreateTaskVisible, setIsCreateTaskVisible] = useState(false);

  const [updateList] = useUpdateListMutation();
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>('');
  const [resultNotification, setResultNotification] = useState<boolean>(false);

  const inputNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isInputVisible) {
      inputNameRef.current?.focus();
    }
  }, [isInputVisible]);

  const handleDeleteList = () => {
    deleteList({ id: id });
  };

  const handleUpdateList = async () => {
    if (inputNameRef.current?.value) {
      const result = await updateList({
        id,
        name: inputNameRef.current.value,
      });

      if ('data' in result) {
        setIsInputVisible(false);
        onDisplayNotification('List updated!', true);
      } else {
        onDisplayNotification(
          'Error updated list, name must be unique!',
          false,
        );
      }
    }
  };

  const onDisplayNotification = (text: string, result: boolean) => {
    setTextNotification(text);
    setResultNotification(result);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <div className="flex max-w-xl flex-col items-start justify-start gap-y-2">
      {showNotification && (
        <Notification content={textNotification} result={resultNotification} />
      )}
      <div className="flex items-center justify-between w-full border-y border-black py-2">
        {isInputVisible ? (
          <div className="flex items-center">
            <input
              ref={inputNameRef}
              defaultValue={name}
              className="border-none w-28 px-1 text-md text-gray-950 font-semibold"
            />
            <button onClick={handleUpdateList}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-green-500 hover:scale-125"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>
            <button onClick={() => setIsInputVisible(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-600 hover:scale-125"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <h1 className="text-md text-gray-950 font-semibold">{name}</h1>
        )}
        <div className="flex items-center gap-4">
          <h1 className="text-sm text-black font-bold">{tasks.length}</h1>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex w-full rounded-full justify-center font-semibold hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
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
                        onClick={() => setIsInputVisible(true)}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'flex w-full gap-2 items-center px-4 py-2 text-sm',
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => setIsCreateTaskVisible(true)}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'flex gap-2 items-center  px-4 py-2 text-sm',
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                        Add new card
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleDeleteList}
                        className={classNames(
                          active ? 'bg-gray-100 text-red-600' : 'text-red-500',
                          'flex gap-2 items-center w-full px-4 py-2 text-sm',
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <div className="w-full rounded-md border-black border border-dashed">
        {isCreateTaskVisible ? (
          <>
            <button
              onClick={() => setIsCreateTaskVisible(false)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <CreateTask onClose={() => setIsCreateTaskVisible(false)} />
          </>
        ) : (
          <button
            onClick={() => setIsCreateTaskVisible(true)}
            className="flex items-center gap-2 justify-center w-full py-2 text-gray-700 hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <p className="text-sm font-semibold">Add new card</p>
          </button>
        )}
      </div>

      {tasks?.map(task => <TaskItem key={task.id} {...task} />)}
    </div>
  );
};

export default ListItem;
