import { ITask } from './task.ts';

export interface IList {
  id: number;
  name: string;
  tasks: ITask[];
}
