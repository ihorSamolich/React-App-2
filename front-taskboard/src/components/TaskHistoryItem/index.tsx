import React from 'react';
import { dateConvertWithTime } from '../../utils/dateConvertWithTime.ts';
import { IHistory } from '../../interfaces/history.ts';
interface ITaskHistoryItemProps {
  item: IHistory;
}

const TaskHistoryItem: React.FC<ITaskHistoryItemProps> = ({ item }) => {
  return (
    <li className="py-1 grid grid-cols-8">
      <p className="col-span-5 tracking-wide text-xs text-gray-500 font-semibold">
        {`You ${item.action} ● ${item.taskName} ${item.field ? item.field : ''} ${item.oldValue ? ` from "${item.oldValue}"` : ''}${item.newValue ? ` to "${item.newValue}"` : ''}`}
      </p>
      <p className="ps-5 col-span-3 text-xs text-gray-500">{dateConvertWithTime(item.date)}</p>
    </li>
  );
};

export default TaskHistoryItem;
