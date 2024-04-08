import React, { useEffect, useRef, useState } from 'react';
import TaskItem from '../TaskItem';
import { IList } from '../../interfaces/list.ts';
import { useDeleteListMutation, useGetBoardListsQuery, useUpdateListMutation } from '../../services/list.ts';
import Notification from '../Notification';
import CreateTask from '../TaskCreate';
import TextInput from '../ui/TextInput';
import ActionButton from '../ui/ActionButton';
import ConfirmIcon from '../icons/ConfirmIcon.tsx';
import CancelIcon from '../icons/CancelIcon.tsx';
import SettingMenu from '../ui/SettingMenu';
import Button from '../ui/Button';
import CreateIcon from '../icons/CreateIcon.tsx';

const ListItem: React.FC<IList> = ({ id, boardId, name, tasks }) => {
  const { data } = useGetBoardListsQuery(boardId);
  const [deleteList] = useDeleteListMutation();
  const [updateList] = useUpdateListMutation();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isCreateTaskVisible, setIsCreateTaskVisible] = useState(false);

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>('');
  const [resultNotification, setResultNotification] = useState<boolean>(false);

  const inputNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isInputVisible) {
      inputNameRef.current?.focus();
    }
  }, [isInputVisible]);

  const handleDeleteList = () => {
    deleteList({ id });
  };

  const handleUpdateList = async () => {
    if (inputNameRef.current?.value) {
      const result = await updateList({
        id,
        name: inputNameRef.current.value,
      });

      if ('data' in result) {
        setIsInputVisible(false);
        onDisplayNotification('List updated!', true);
      } else {
        onDisplayNotification('Error updated list, name must be unique!', false);
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
    <div className="flex max-w-xl flex-col items-start justify-start gap-y-2">
      {showNotification && <Notification content={textNotification} result={resultNotification} />}
      <div className="flex items-center justify-between w-full border-y border-black py-2">
        {isInputVisible ? (
          <div className="flex items-center">
            <TextInput ref={inputNameRef} value={name} placeholder={'Enter new list name...'} />
            <ActionButton onClick={handleUpdateList} type={'OK'}>
              <ConfirmIcon />
            </ActionButton>
            <ActionButton onClick={() => setIsInputVisible(false)} type={'CANCEL'}>
              <CancelIcon />
            </ActionButton>
          </div>
        ) : (
          <h1 className="text-md text-gray-950 font-semibold">{name}</h1>
        )}
        <div className="flex items-center gap-1">
          <h1 className="text-sm text-black font-bold">{tasks.length}</h1>
          <SettingMenu
            type={'LIST'}
            onDelete={handleDeleteList}
            onCreate={() => setIsCreateTaskVisible(true)}
            onEdit={() => setIsInputVisible(true)}
          />
        </div>
      </div>
      <div className="w-full rounded-md border-black border border-dashed">
        {isCreateTaskVisible ? (
          <>
            <ActionButton onClick={() => setIsCreateTaskVisible(false)} type="CANCEL">
              <CancelIcon />
            </ActionButton>
            <CreateTask boardId={boardId} onClose={() => setIsCreateTaskVisible(false)} />
          </>
        ) : (
          <div className="w-full flex items-center justify-center">
            <Button onClick={() => setIsCreateTaskVisible(true)} title="Add new card" style="TRANSPARENT">
              <CreateIcon />
            </Button>
          </div>
        )}
      </div>
      <div className="w-full">{tasks?.map(task => <TaskItem key={task.id} task={task} lists={data} />)}</div>
    </div>
  );
};

export default ListItem;
