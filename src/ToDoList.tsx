import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DefaultValue } from "recoil";

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

interface IForm {
  email: string;
  firstName: string;
  lastName?: string;
  password: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ defaultValues: { email: "@naver.com" } });
  //console.log(watch());
  const onValid = (data: any) => console.log(data);
  //console.log(errors);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          alignItems: "center",
          marginTop: "10px",
        }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "invalid email",
            },
          })}
        ></input>
        <span
          style={{
            color: "white",
            border: "1px solid tomato",
          }}
        >
          {errors?.email?.message}
        </span>
        <input
          {...register("firstName", { required: "yaho", minLength: 10 })}
          placeholder="firstName"
        ></input>
        <input
          {...register("lastName", { required: true, minLength: 10 })}
          placeholder="lastName"
        ></input>
        <input
          {...register("password", {
            required: true,
            minLength: { value: 10, message: "too short" },
          })}
          placeholder="password"
        ></input>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
