import React, { useState } from 'react';
import ListGrid from '../components/ListsGrid';

const TaskBoardPage: React.FC = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);

  return (
    <>
      <header className="shadow">
        <div className="sm:flex items-center justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2 sm:mb-0 text-gray-900">
            My Task Board
          </h1>
          <div className="sm:flex justify-center sm:w-auto gap-2 ">
            <button className="flex items-center mb-2 sm:mb-0 justify-center w-full gap-1 sm:w-auto border border-gray-200 rounded-sm bg-white px-3.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-200  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              History
            </button>

            {isInputVisible ? (
              <div className=" flex items-center">
                <input
                  placeholder="Enter list name..."
                  className="bg-white px-2 rounded-lg border border-gray-200"
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-green-500 hover:scale-125"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </button>
                <button onClick={() => setIsInputVisible(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-red-600 hover:scale-125"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsInputVisible(true)}
                className="flex items-center justify-center w-full sm:w-auto gap-1 border border-gray-200  rounded-sm bg-indigo-500 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Create new list
              </button>
            )}
          </div>
        </div>
      </header>
      <main>
        <ListGrid />
      </main>
      {/*<CreateList*/}
      {/*  isOpen={isCreateListOpen}*/}
      {/*  onClose={() => setIsCreateListOpen(false)}*/}
      {/*/>*/}
    </>
  );
};

export default TaskBoardPage;
