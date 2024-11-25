export interface Task {
  id: number;
  name: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}
