import React, { useState } from 'react';
import ListGrid from '../components/ListsGrid';
import PageHeader from '../components/PageHeader';

const TaskBoardPage: React.FC = () => {
  const [currentBoard, setCurrentBoard] = useState<number>(Number(localStorage.getItem('currentBoard')) || 0);

  return (
    <>
      <header className="shadow">
        <PageHeader currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />
      </header>
      <main>
        <ListGrid boardId={currentBoard} />
      </main>
    </>
  );
};

export default TaskBoardPage;
