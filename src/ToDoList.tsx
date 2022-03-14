import React, { useState } from "react";
import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    //console.log(event.currentTarget.value);
    setToDo(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          placeholder="Write to do"
        ></input>
        <button>Add</button>
      </form>
    </div>
  );
} */

function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());

  return (
    <div>
      <form>
        <input {...register("email")} placeholder="email"></input>
        <input {...register("firstName")} placeholder="firstName"></input>
        <input {...register("lastName")} placeholder="lastName"></input>
        <input {...register("password")} placeholder="password"></input>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
