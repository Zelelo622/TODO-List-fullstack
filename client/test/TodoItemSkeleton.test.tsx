import { render, screen } from "@testing-library/react";
import TodoItemSkeleton from "src/components/Todo/TodoItemSkeleton";

describe("TodoItemSkeleton", () => {
  it("рендерит скелетон задачи", () => {
    render(<TodoItemSkeleton />);
    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveClass("animate-pulse");
  });
});
