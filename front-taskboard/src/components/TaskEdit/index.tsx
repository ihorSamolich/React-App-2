import React, { useState } from 'react';
import { ITask, IUpdateTask } from '../../interfaces/task.ts';
import { useGetBoardListsQuery } from '../../services/list.ts';
import { useGetPrioritiesQuery } from '../../services/priority.ts';
import { formatISODateForInput } from '../../utils/dateForInput.ts';
import { useUpdateTaskMutation } from '../../services/task.ts';
import Notification from '../Notification';
import Button from '../ui/Button';
import ConfirmIcon from '../icons/ConfirmIcon.tsx';
import CancelIcon from '../icons/CancelIcon.tsx';

interface TaskDetailProps {
  task: ITask;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskEdit: React.FC<TaskDetailProps> = ({ task, setIsOpen }) => {
  const { data: lists } = useGetBoardListsQuery(task.list.boardId);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedTask(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!updatedTask.name || !updatedTask.description || !updatedTask.dueDate || !updatedTask.listId || !updatedTask.priorityId) {
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
      {showNotification && <Notification content={textNotification} result={resultNotification} />}

      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="dueDate" className="block text-xs font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            className="mt-1 px-4 py-2 text-xs block w-full rounded-md border"
            value={formatISODateForInput(updatedTask.dueDate || new Date())}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="listId" className="block text-xs font-medium text-gray-700">
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
          <label htmlFor="priorityId" className="block text-xs font-medium text-gray-700">
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
        <div className="px-4 py-3 sm:px-6 gap-5 sm:flex sm:flex-row-reverse">
          <Button title="Save Changes" type="submit" style="BLUE">
            <ConfirmIcon />
          </Button>
          <Button title="Cancel" style="WHITE" onClick={() => setIsOpen(false)}>
            <CancelIcon />
          </Button>
        </div>
      </form>
    </>
  );
};

export default TaskEdit;
