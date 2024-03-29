import React from 'react';
import ListGrid from '../components/ListsGrid';
import PageHeader from '../components/PageHeader';

const TaskBoardPage: React.FC = () => {
  return (
    <>
      <header className="shadow">
        <PageHeader />
      </header>
      <main>
        <ListGrid />
      </main>
    </>
  );
};

export default TaskBoardPage;
