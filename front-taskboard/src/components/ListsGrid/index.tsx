import React from 'react';
import { useGetBoardListsQuery } from '../../services/list.ts';
import ListItem from '../ListItem';

interface IListGridProps {
  boardId: number;
}

const ListGrid: React.FC<IListGridProps> = ({ boardId }) => {
  const { data } = useGetBoardListsQuery(boardId);

  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-16 sm:mt-16 lg:mx-0 lg:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.map(list => {
        console.log(list);
        return <ListItem key={list.id} {...list} />;
      })}
    </div>
  );
};

export default ListGrid;
