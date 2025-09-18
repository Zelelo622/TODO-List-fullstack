import type { ReactElement } from "react";
import AddToDoForm from "src/components/AddToDoForm";
import Header from "src/components/Header";

const Home = (): ReactElement => (
  <div className="dark:bg-veryDarkBlue bg-veryLightGray min-h-screen">
    <div className="container pt-10 mx-auto">
      <Header />
      <AddToDoForm />
    </div>
  </div>
);

export default Home;
