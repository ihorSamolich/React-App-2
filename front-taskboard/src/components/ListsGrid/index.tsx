import React from 'react';
import { useGetListsQuery } from '../../services/list.ts';
import { dateConvert } from '../../utils/dateConvert.ts';

const ListGrid: React.FC = () => {
  const { data } = useGetListsQuery();

  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-16 sm:mt-16 lg:mx-0 lg:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.map(list => (
        <div
          key={list.id}
          className="flex max-w-xl flex-col items-start justify-start gap-y-2"
        >
          <div className="flex items-center justify-between w-full border-y border-black py-2">
            <h1 className="text-md text-gray-950 font-semibold">{list.name}</h1>
            <div className="flex items-center gap-4">
              <h1 className="text-sm text-black font-bold">
                {list.tasks.length}
              </h1>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-full rounded-md border-black border border-dashed">
            <button className="flex items-center gap-2 justify-center w-full py-2 text-gray-700 hover:text-black">
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
              <p className="text-sm font-semibold">Add new card</p>
            </button>
          </div>

          {/*TASKS BLOK*/}
          <>
            {list.tasks?.map(task => (
              <div
                key={task.id}
                className="w-full rounded-md border-black border p-2 flex-col"
              >
                <div className="w-full flex items-center justify-between">
                  <h1 className="text-sm text-black font-bold">{task.name}</h1>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-justify text-gray-700">
                    {task.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>
                  <p className="text-xs text-justify text-black font-semibold">
                    {dateConvert(task.dueDate)}
                  </p>
                </div>

                <div className="mt-2 flex">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2 py-0.5">
                    <div
                      className={`rounded-full h-2 w-2 ${task.priority.value === 1 ? 'bg-green-400' : task.priority.value === 2 ? 'bg-yellow-400' : 'bg-red-600'}`}
                    ></div>
                    <p className="text-xs text-justify text-black font-semibold">
                      {task.priority.name}
                    </p>
                  </div>
                </div>

                <form className="mt-2">
                  <select
                    id="lists"
                    className="w-full rounded-md bg-gray-200 text-xs py-1"
                    defaultValue="DEF"
                  >
                    <option value="DEF" disabled>
                      Move to:
                    </option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </form>
              </div>
            ))}
          </>
        </div>
      ))}
    </div>
  );
};

export default ListGrid;
