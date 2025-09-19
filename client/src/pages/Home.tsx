import type { ReactElement } from "react";
import AddToDoForm from "src/components/Todo/AddToDoForm";
import TodoList from "src/components/Todo/TodoList";

const Home = (): ReactElement => (
  <>
    <AddToDoForm />
    <TodoList />
  </>
);

export default Home;
