export interface IHistory {
  id: number;
  action: string;
  field: string | null;
  date: Date;
  taskName: string;
  newValue: string | null;
  oldValue: string | null;
}
