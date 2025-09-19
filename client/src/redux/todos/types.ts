export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export interface ITodosState {
  items: ITodo[];
}
