import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useGetBoardListsQuery } from '../../services/list.ts';
import { useGetPrioritiesQuery } from '../../services/priority.ts';
import { ICreateTask } from '../../interfaces/task.ts';
import { useAddTaskMutation } from '../../services/task.ts';
import Notification from '../Notification';
import Button from '../ui/Button';
import CreateIcon from '../icons/CreateIcon.tsx';

interface ICreateTaskProps {
  onClose: () => void;
  boardId: number;
}

const CreateTask: React.FC<ICreateTaskProps> = ({ onClose, boardId }) => {
  const { data: lists } = useGetBoardListsQuery(boardId);
  const { data: priorities } = useGetPrioritiesQuery();
  const [formData, setFormData] = useState<ICreateTask>(initialFormData);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>('');
  const [resultNotification, setResultNotification] = useState<boolean>(false);

  const [createTask] = useAddTaskMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.dueDate || !formData.listId || !formData.priorityId) {
      onDisplayNotification('All fields must be filled!', false);
      return;
    }

    const result = await createTask({
      ...formData,
      priorityId: Number(formData.priorityId),
      listId: Number(formData.listId),
      dueDate: new Date(formData.dueDate),
    });

    if ('data' in result) {
      onDisplayNotification('Task created!', true);
      onClose();
    } else {
      onDisplayNotification('Error created task!', false);
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

      <form onSubmit={handleSubmit} className="max-w-md m-2 mt-0">
        <div className="mb-2">
          <label htmlFor="name" className="block text-xs font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 text-xs px-4 py-2 block w-full rounded-md border outline-0"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="block text-xs font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            className="mt-1 px-4 py-2 text-xs block w-full rounded-md border outline-0"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-2">
          <label htmlFor="dueDate" className="block text-xs font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            className="mt-1 px-4 py-2 text-xs block w-full rounded-md border outline-0"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="listId" className="block text-xs font-medium text-gray-700">
            List
          </label>
          <select
            id="listId"
            name="listId"
            className="mt-1 px-4 py-2 text-xs block w-full rounded-md border outline-0"
            onChange={handleChange}
            defaultValue="0"
          >
            <option value="0" disabled>
              Select list:
            </option>
            {lists?.map(list => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="priorityId" className="block text-xs font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priorityId"
            name="priorityId"
            className="mt-1 px-4 py-2 text-xs block w-full rounded-md border outline-0"
            onChange={handleChange}
            defaultValue="0"
          >
            <option value="0" disabled>
              Select priority:
            </option>
            {priorities?.map(priority => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex items-center justify-center">
          <Button title="Create Task" style="BLUE" type="submit">
            <CreateIcon />
          </Button>
        </div>
      </form>
    </>
  );
};

const initialFormData: ICreateTask = {
  name: '',
  description: '',
  dueDate: null,
  listId: 0,
  priorityId: 0,
};

export default CreateTask;
