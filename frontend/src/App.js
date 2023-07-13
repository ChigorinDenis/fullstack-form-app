import "./App.scss";
import React, { useState } from "react";
import Loader from "./components/Loader/Loader";
import Form from "./components/Form/Form";
import List from "./components/List/List";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  return (
    <div className="container">
      <Form
        setUsers={setUsers}
        setIsLoading={setIsLoading}
        setIsSubmited={setIsSubmited}
      />
      {isLoading ? <Loader /> : isSubmited && <List data={users} />}
    </div>
  );
}

export default App;
