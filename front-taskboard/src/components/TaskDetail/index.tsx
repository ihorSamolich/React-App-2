import React, { useState } from 'react';
import { dateConvert } from '../../utils/dateConvert.ts';
import { ITask } from '../../interfaces/task.ts';
import StatusIcon from '../icons/StatusIcon.tsx';
import DateIcon from '../icons/DateIcon.tsx';
import PriorityIcon from '../icons/PriorityIcon.tsx';
import EditIcon from '../icons/EditIcon.tsx';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import TaskEdit from '../TaskEdit';
import { useFetchHistoryByTaskQuery } from '../../services/history.ts';
import TaskHistoryItem from '../TaskHistoryItem';

interface TaskDetailProps {
  task: ITask;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  const [isTaskEditOpen, setIsTaskEditOpen] = useState(false);
  const { data } = useFetchHistoryByTaskQuery(task.id);

  return (
    <>
      <div className=" sm:grid h-full grid-cols-3">
        <div className="col-span-2 p-4">
          <div className="max-w-2xl mx-auto p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{task.name}</h2>
              <Button title="Edit task" style="BLUE" onClick={() => setIsTaskEditOpen(true)}>
                <EditIcon />
              </Button>
            </div>
            <div className="flex-col mb-4">
              <div className="flex justify-between gap-5 pb-2">
                <div className="flex items-center gap-1">
                  <StatusIcon />
                  <h3 className="w-1/2 text-sm text-gray-600 text-nowrap">Status</h3>
                </div>
                <p className="w-1/2">{task.list.name}</p>
              </div>
              <div className="flex justify-between gap-5 pb-2">
                <div className="flex items-center gap-1">
                  <DateIcon />
                  <h3 className="w-1/2 text-sm text-gray-600 text-nowrap">Data due</h3>
                </div>
                <p className="w-1/2">{dateConvert(task.dueDate)}</p>
              </div>
              <div className="flex justify-between gap-5 pb-2">
                <div className="flex items-center gap-1">
                  <PriorityIcon />
                  <h3 className="w-1/2 text-sm text-gray-600">Priority</h3>
                </div>
                <p className="w-1/2">{task.priority.name}</p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Description</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
          </div>
        </div>
        <div className="hidden sm:block col-span-1 bg-gray-300 p-4">
          <h1 className="font-bold">Activity</h1>
          {data?.map(item => <TaskHistoryItem key={item.id} item={item} />)}
        </div>
      </div>

      {isTaskEditOpen && (
        <Modal isOpen={isTaskEditOpen} setIsOpen={setIsTaskEditOpen}>
          <TaskEdit task={task} setIsOpen={setIsTaskEditOpen} />
        </Modal>
      )}
    </>
  );
};

export default TaskDetail;
