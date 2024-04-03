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

const PageHeader: React.FC = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>('');
  const [resultNotification, setResultNotification] = useState<boolean>(false);

  const [addList] = useAddListMutation();
  const inputNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isInputVisible) {
      inputNameRef.current?.focus();
    }
  }, [isInputVisible]);

  const handleCreateList = async () => {
    if (inputNameRef.current?.value) {
      console.log(inputNameRef.current.value);

      const result = await addList({
        name: inputNameRef.current.value,
        boardId: 1,
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
      <h1 className="text-2xl font-bold tracking-tight mb-2 sm:mb-0 text-gray-900">My Task Board</h1>
      <div className="sm:flex justify-center sm:w-auto gap-2 ">
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
      {isHistoryOpen && <History isOpen={isHistoryOpen} setIsOpen={setIsHistoryOpen} />}
      {showNotification && <Notification content={textNotification} result={resultNotification} />}
    </div>
  );
};

export default PageHeader;
