import React, { ChangeEvent, Fragment, useState } from 'react';
import { dateConvert } from '../../utils/dateConvert.ts';
import { ITask } from '../../interfaces/task.ts';
import TaskDetail from '../TaskDetail';
import { useGetListsQuery } from '../../services/list.ts';
import {
  useDeleteTaskMutation,
  useMoveTaskMutation,
} from '../../services/task.ts';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '../../utils/classNames.ts';
import TaskEdit from '../TaskEdit';

const TaskItem: React.FC<ITask> = ({
  id,
  name,
  description,
  priority,
  dueDate,
  list,
}) => {
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [isTaskEditOpen, setIsTaskEditOpen] = useState(false);
  const [moveTask] = useMoveTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const { data } = useGetListsQuery();

  const handleDeleteTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteTask({ id });
  };
  const handleMoveToList = (event: ChangeEvent<HTMLSelectElement>) => {
    const listId = Number(event.target.value);
    moveTask({ id, listId });
  };

  const handleTaskEditOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsTaskEditOpen(true);
  };

  return (
    <>
      <article
        onClick={() => setIsTaskDetailOpen(true)}
        className="w-full rounded-md border-black border p-2 flex-col hover:bg-green-50 cursor-pointer"
      >
        <div className="w-full flex items-center justify-between">
          <h1 className="text-sm text-black font-bold">{name}</h1>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button
                onClick={event => event.stopPropagation()}
                className="flex w-full rounded-full justify-center font-semibold hover:bg-gray-100"
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
                        onClick={handleTaskEditOpen}
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
                      <button
                        onClick={handleDeleteTask}
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
        <div className="mt-2">
          <p className="text-xs text-justify text-gray-700">{description}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
          <p className="text-xs text-justify text-black font-semibold">
            {dateConvert(dueDate)}
          </p>
        </div>

        <div className="mt-2 flex">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2 py-0.5">
            <div
              className={`rounded-full h-2 w-2 ${priority.value === 1 ? 'bg-green-400' : priority.value === 2 ? 'bg-yellow-400' : 'bg-red-600'}`}
            ></div>
            <p className="text-xs text-justify text-black font-semibold">
              {priority.name}
            </p>
          </div>
        </div>

        <form className="mt-2" onClick={event => event.stopPropagation()}>
          <select
            id="lists"
            className="w-full rounded-md bg-gray-200 text-xs py-1"
            onChange={handleMoveToList}
            defaultValue="0"
          >
            <option value="0" disabled>
              Move to:
            </option>
            {data
              ?.filter(item => item.id !== list.id)
              .map(list => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
          </select>
        </form>
      </article>
      {isTaskDetailOpen && (
        <TaskDetail
          isOpen={isTaskDetailOpen}
          setIsOpen={setIsTaskDetailOpen}
          task={{
            id,
            name,
            description,
            priority,
            list,
            dueDate,
          }}
        />
      )}
      {isTaskEditOpen && (
        <TaskEdit
          isOpen={isTaskEditOpen}
          setIsOpen={setIsTaskEditOpen}
          task={{
            id,
            name,
            description,
            priority,
            list,
            dueDate,
          }}
        />
      )}
    </>
  );
};

export default TaskItem;
