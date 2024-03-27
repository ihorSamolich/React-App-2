import { IPriority } from './priority.ts';

export interface ITask {
  id: number;
  name: string;
  description: string;
  dueDate: Date;
  priority: IPriority;
}
