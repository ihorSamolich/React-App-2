import React, { useEffect, useRef, useState } from 'react';
import { IBoard } from '../../interfaces/board.ts';
import BoardIcon from '../icons/BoardIcon.tsx';
import SettingMenu from '../ui/SettingMenu';
import { useAddBoardMutation, useDeleteBoardMutation, useGetBoardsQuery, useUpdateBoardMutation } from '../../services/board.ts';
import TextInput from '../ui/TextInput';
import ActionButton from '../ui/ActionButton';
import ConfirmIcon from '../icons/ConfirmIcon.tsx';
import CancelIcon from '../icons/CancelIcon.tsx';

interface IBoardItemProps {
  board: IBoard | undefined;
  setCurrentBoard: React.Dispatch<React.SetStateAction<number>>;
}

const BoardItem: React.FC<IBoardItemProps> = ({ board, setCurrentBoard }) => {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const [isCreateVisible, setIsCreateVisible] = useState(false);

  const inputNameRef = useRef<HTMLInputElement>(null);

  const [createBoard] = useAddBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();
  const { data } = useGetBoardsQuery();

  useEffect(() => {
    setIsInputVisible(false);
  }, [board]);

  const handleDeleteBoard = () => {
    deleteBoard({ id: board?.id });

    if (data) {
      const prevBoard = data.filter(item => item.id !== board?.id);
      const newCurrentBoard = prevBoard.length > 0 ? prevBoard[0].id : 0;

      localStorage.setItem('currentBoard', String(newCurrentBoard));
      setCurrentBoard(newCurrentBoard);
    }
  };

  const handleUpdateBoard = async () => {
    if (board) {
      if (inputNameRef.current?.value) {
        const result = await updateBoard({
          id: board.id,
          name: inputNameRef.current.value,
        });

        if ('data' in result) {
          setIsInputVisible(false);
        }
      }
    }
  };

  const handleCreateBoard = async () => {
    if (inputNameRef.current?.value) {
      console.log(inputNameRef.current.value);

      const result = await createBoard({
        name: inputNameRef.current.value,
      });

      if ('data' in result) {
        setIsCreateVisible(false);
        setCurrentBoard(result.data.id);
      }
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <BoardIcon />

      {isInputVisible ? (
        <div className="flex items-center">
          <TextInput ref={inputNameRef} value={board?.name} placeholder={'Enter new board name...'} />
          <ActionButton onClick={handleUpdateBoard} type={'OK'}>
            <ConfirmIcon />
          </ActionButton>
          <ActionButton onClick={() => setIsInputVisible(false)} type={'CANCEL'}>
            <CancelIcon />
          </ActionButton>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{board?.name.toUpperCase()}</h1>
          <SettingMenu
            type={'LIST'}
            onDelete={handleDeleteBoard}
            onCreate={() => setIsCreateVisible(true)}
            onEdit={() => setIsInputVisible(true)}
          />

          {isCreateVisible && (
            <div className=" flex items-center">
              <TextInput ref={inputNameRef} placeholder="Enter board name..." />
              <ActionButton onClick={handleCreateBoard} type={'OK'}>
                <ConfirmIcon />
              </ActionButton>
              <ActionButton onClick={() => setIsCreateVisible(false)} type={'CANCEL'}>
                <CancelIcon />
              </ActionButton>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BoardItem;
