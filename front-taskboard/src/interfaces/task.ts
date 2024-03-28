import { IPriority } from './priority.ts';
import { IList } from './list.ts';

export interface ITask {
  id: number;
  name: string;
  description: string;
  dueDate: Date;
  priority: IPriority;
  list: IList;
}

export interface ICreateTask {
  name: string;
  description: string;
  dueDate: Date | null;
  priorityId: number;
  listId: number;
}

export interface IUpdateTask {
  id: number;
  name: string;
  description: string;
  dueDate: Date | null;
  priorityId: number;
  listId: number;
}
