import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ITask, IUpdateTask } from '../../interfaces/task.ts';
import { useGetListsQuery } from '../../services/list.ts';
import { useGetPrioritiesQuery } from '../../services/priority.ts';
import { formatISODateForInput } from '../../utils/dateForInput.ts';
import { useUpdateTaskMutation } from '../../services/task.ts';
import Notification from '../Notification';

interface TaskDetailProps {
  task: ITask;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskEdit: React.FC<TaskDetailProps> = ({ task, isOpen, setIsOpen }) => {
  const cancelButtonRef = useRef(null);
  const { data: lists } = useGetListsQuery();
  const { data: priorities } = useGetPrioritiesQuery();
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>('');
  const [resultNotification, setResultNotification] = useState<boolean>(false);

  const [updateTask] = useUpdateTaskMutation();

  const [updatedTask, setUpdatedTask] = useState<IUpdateTask>({
    description: task.description,
    dueDate: task.dueDate,
    id: task.id,
    listId: task.list.id,
    name: task.name,
    priorityId: task.priority.id,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setUpdatedTask(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !updatedTask.name ||
      !updatedTask.description ||
      !updatedTask.dueDate ||
      !updatedTask.listId ||
      !updatedTask.priorityId
    ) {
      onDisplayNotification('All fields must be filled!', false);
      return;
    }

    const result = await updateTask({
      ...updatedTask,
      priorityId: Number(updatedTask.priorityId),
      listId: Number(updatedTask.listId),
      dueDate: new Date(updatedTask.dueDate),
    });

    if ('data' in result) {
      setIsOpen(false);
    } else {
      onDisplayNotification('Error updated task!', false);
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
    <>
      {showNotification && (
        <Notification content={textNotification} result={resultNotification} />
      )}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:mx-20 sm:w-full sm:max-w-5xl">
                  <div className="bg-indigo-500 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <a
                      className="cursor-pointer text-sm font-semibold text-white"
                      onClick={() => setIsOpen(false)}
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
                    </a>
                  </div>

                  <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={updatedTask.name}
                        onChange={handleChange}
                        className="mt-1 px-4 py-2 text-xs block w-full rounded-md border"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        value={updatedTask.description}
                        onChange={handleChange}
                        rows={5}
                        className="mt-1 px-4 py-2 text-xs block w-full rounded-md border"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="dueDate"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Due Date
                      </label>
                      <input
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        className="mt-1 px-4 py-2 text-xs block w-full rounded-md border"
                        value={formatISODateForInput(
                          updatedTask.dueDate || new Date(),
                        )}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="listId"
                        className="block text-xs font-medium text-gray-700"
                      >
                        List
                      </label>
                      <select
                        id="listId"
                        name="listId"
                        className="mt-1 px-4 py-2 text-xs block w-full rounded-md border"
                        onChange={handleChange}
                        defaultValue={updatedTask.listId}
                      >
                        {lists?.map(list => (
                          <option key={list.id} value={list.id}>
                            {list.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="priorityId"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Priority
                      </label>
                      <select
                        id="priorityId"
                        name="priorityId"
                        className="mt-1 px-4 py-2 text-xs block w-full rounded-md border"
                        onChange={handleChange}
                        defaultValue={updatedTask.priorityId}
                      >
                        {priorities?.map(priority => (
                          <option key={priority.id} value={priority.id}>
                            {priority.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setIsOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default TaskEdit;
