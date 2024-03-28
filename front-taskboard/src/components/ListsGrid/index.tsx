import React from 'react';
import { useGetListsQuery } from '../../services/list.ts';
import ListItem from '../ListItem';

const ListGrid: React.FC = () => {
  const { data } = useGetListsQuery();

  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-16 sm:mt-16 lg:mx-0 lg:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.map(list => <ListItem key={list.id} {...list} />)}
    </div>
  );
};

export default ListGrid;
