import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  DefaultValue,
  atom,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
} from "recoil";

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  categories: "ToDo" | "Doing" | "Done";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  //const value = useRecoilValue(toDoState);
  //const modFn = useSetRecoilState(toDoState);
  console.log(toDos);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    setToDos((old) => [
      { text: data.toDo, id: Date.now(), categories: "ToDo" },
      ...old,
    ]);
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: "please write to do" })}
          placeholder="Write to do"
        ></input>
        <button>Add</button>
      </form>
      <div>
        <ul>
          {toDos.map((toDo) => (
            <li key={toDo.id}>{toDo.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
