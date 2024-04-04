import React from 'react';
import { IHistory } from '../../interfaces/history.ts';
import { dateConvertWithTime } from '../../utils/dateConvertWithTime.ts';

interface IHistoryItemProps {
  item: IHistory;
}

const HistoryItem: React.FC<IHistoryItemProps> = ({ item }) => {
  return (
    <li className="list-none pb-4">
      <p className="tracking-wide text-xs text-gray-950 font-semibold pb-1.5">
        {`You ${item.action} ● ${item.taskName} ${item.field ? item.field : ''} ${item.oldValue ? ` from "${item.oldValue}"` : ''}${item.newValue ? ` to "${item.newValue}"` : ''}`}
      </p>
      <p className="italic text-xs text-gray-500">{dateConvertWithTime(item.date)}</p>
    </li>
  );
};

export default HistoryItem;
