import React, { useEffect, useRef, useState } from 'react';
import { useAddListMutation } from '../../services/list.ts';
import Notification from '../Notification';
import History from '../History';
import Button from '../ui/Button';
import CreateIcon from '../icons/CreateIcon.tsx';
import HistoryIcon from '../icons/HistoryIcon.tsx';
import ActionButton from '../ui/ActionButton';
import ConfirmIcon from '../icons/ConfirmIcon.tsx';
import CancelIcon from '../icons/CancelIcon.tsx';
import TextInput from '../ui/TextInput';
import { useGetBoardsQuery } from '../../services/board.ts';
import BoardItem from '../BoardItem';

interface IPageHeaderProps {
  currentBoard: number;
  setCurrentBoard: React.Dispatch<React.SetStateAction<number>>;
}

const PageHeader: React.FC<IPageHeaderProps> = ({ currentBoard, setCurrentBoard }) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>('');
  const [resultNotification, setResultNotification] = useState<boolean>(false);

  const [addList] = useAddListMutation();
  const inputNameRef = useRef<HTMLInputElement>(null);

  const { data } = useGetBoardsQuery();

  useEffect(() => {
    if (isInputVisible) {
      inputNameRef.current?.focus();
    }
  }, [isInputVisible]);

  useEffect(() => {
    if (currentBoard === 0 && data && data.length > 0) {
      setCurrentBoard(data[0].id);
    }
  }, [data, setCurrentBoard]);
  const handleBoardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentBoard(Number(event.target.value));
    localStorage.setItem('currentBoard', event.target.value);
  };

  const handleCreateList = async () => {
    if (inputNameRef.current?.value) {
      console.log(inputNameRef.current.value);

      const result = await addList({
        name: inputNameRef.current.value,
        boardId: currentBoard,
      });

      if ('data' in result) {
        setIsInputVisible(false);
        onDisplayNotification('List created!', true);
      } else {
        onDisplayNotification('Error created list, name must be unique!', false);
      }
    }
  };

  const onDisplayNotification = (text: string, result: boolean) => {
    setTextNotification(text);
    setResultNotification(result);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <div className="sm:flex items-center justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <BoardItem board={data?.find(board => board.id === currentBoard)} setCurrentBoard={setCurrentBoard} />
      <div className="sm:flex justify-center sm:w-auto gap-2 ">
        <div>
          <div className="relative">
            <select
              onChange={handleBoardChange}
              value="0"
              className=" flex items-center outline-0 bg-orange-500 mb-2 sm:mb-0 justify-center w-full gap-1 sm:w-auto text-black rounded-sm px-3.5 py-1.5 text-sm font-semibold"
            >
              <option value="0" disabled>
                &#9660; Change board
              </option>
              {data?.map(item => (
                <option key={item.id} value={item.id}>
                  {`${item.name} `}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button title="History" onClick={() => setIsHistoryOpen(true)}>
          <HistoryIcon />
        </Button>

        {isInputVisible ? (
          <div className=" flex items-center">
            <TextInput ref={inputNameRef} placeholder="Enter list name..." />
            <ActionButton onClick={handleCreateList} type={'OK'}>
              <ConfirmIcon />
            </ActionButton>
            <ActionButton onClick={() => setIsInputVisible(false)} type={'CANCEL'}>
              <CancelIcon />
            </ActionButton>
          </div>
        ) : (
          <Button title="Create new list" style="BLUE" onClick={() => setIsInputVisible(true)}>
            <CreateIcon />
          </Button>
        )}
      </div>
      {isHistoryOpen && <History isOpen={isHistoryOpen} setIsOpen={setIsHistoryOpen} boardId={currentBoard} />}
      {showNotification && <Notification content={textNotification} result={resultNotification} />}
    </div>
  );
};

export default PageHeader;
