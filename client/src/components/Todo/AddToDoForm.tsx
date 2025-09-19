import { useState, type ReactElement } from "react";
import { useAddTodoMutation } from "src/redux/todos/todosApi";

const AddToDoForm = (): ReactElement => {
  const [text, setText] = useState("");
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addTodo({ title: text }).unwrap();
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-veryLightGray flex items-center p-4 mt-10 mb-5 rounded-lg drop-shadow-lg shadow-lg relative z-[2] dark:bg-veryDarkDesaturatedBlue dark:text-lightGrayishBlueDark">
      <button
        type="submit"
        disabled={isLoading}
        className="cursor-pointer rounded-full bg-transparent w-8 h-8 text-[#fff] text-xl flex items-center justify-center font-extralight border-darkGrayishBlueLight border-2 duration-300 hover:bg-gradient-to-br hover:from-checkBackground1 hover:to-checkBackground2 hover:border-none me-6">
        +
      </button>
      <input
        type="text"
        placeholder="Добавить заметку"
        className="outline-none bg-[rgba(0,0,0,0)] text-l w-full placeholder:text-darkGrayishBlueLight dark:placeholder:text-darkGrayishBlueDark disabled:cursor-not-allowed disabled:opacity-50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />
    </form>
  );
};

export default AddToDoForm;
