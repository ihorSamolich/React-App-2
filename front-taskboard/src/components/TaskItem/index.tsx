import React, { ChangeEvent, useState } from 'react';
import { ITask } from '../../interfaces/task.ts';
import { useGetListsQuery } from '../../services/list.ts';
import { useDeleteTaskMutation, useMoveTaskMutation } from '../../services/task.ts';
import TaskEdit from '../TaskEdit';
import SettingMenu from '../ui/SettingMenu';
import CalendarIcon from '../icons/CalendarIcon.tsx';
import TaskDetail from '../TaskDetail';
import { dateConvert } from '../../utils/dateConvert.ts';
import Modal from '../ui/Modal';

const TaskItem: React.FC<ITask> = task => {
  const { id, name, description, priority, list, dueDate } = task;
  const { data } = useGetListsQuery();
  const [moveTask] = useMoveTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [isTaskEditOpen, setIsTaskEditOpen] = useState(false);

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
        className="w-full rounded-md border-gray-700 border p-2 flex-col hover:border-blue-600 cursor-pointer"
      >
        <div className="w-full flex items-center justify-between">
          <h1 className="text-sm text-black font-bold">{name}</h1>
          <SettingMenu type="TASK" onEdit={handleTaskEditOpen} onDelete={handleDeleteTask} />
        </div>
        <div className="mt-2">
          <p className="text-xs text-justify text-gray-700">{description}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <CalendarIcon />
          <p className="text-xs text-justify text-black font-semibold">{dateConvert(dueDate)}</p>
        </div>

        <div className="mt-2 flex">
          <div className="flex items-center gap-2  rounded-xl py-0.5">
            <div
              className={`rounded-full h-2 w-2 ${priority.value === 1 ? 'bg-green-400' : priority.value === 2 ? 'bg-yellow-400' : 'bg-red-600'}`}
            ></div>
            <p className="text-xs text-justify text-black font-semibold">{priority.name}</p>
          </div>
        </div>

        <form className="mt-2" onClick={event => event.stopPropagation()}>
          <select
            id="lists"
            className="w-full rounded-md bg-blue-300 text-xs py-1 outline-0"
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
        <Modal isOpen={isTaskDetailOpen} setIsOpen={setIsTaskDetailOpen}>
          <TaskDetail task={task} />
        </Modal>
      )}

      {isTaskEditOpen && (
        <Modal isOpen={isTaskEditOpen} setIsOpen={setIsTaskEditOpen}>
          <TaskEdit task={task} setIsOpen={setIsTaskEditOpen} />
        </Modal>
      )}
    </>
  );
};

export default TaskItem;
