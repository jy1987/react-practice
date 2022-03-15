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
  password1: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({ defaultValues: { email: "@naver.com" } });
  //console.log(watch());
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "password are not the same" },
        { shouldFocus: true }
      );
    }
  };
  console.log(errors);
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
            validate: (value) =>
              value.includes("@") ? true : "@ must be included",
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
          {...register("firstName", {
            required: "yaho",
            validate: {
              kim: (value) =>
                value.includes("kim") ? true : "must include kim",
              lee: (value) =>
                value.includes("lee") ? "must not include lee" : true,
            },
          })}
          placeholder="firstName"
        ></input>
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "write here" })}
          placeholder="lastName"
        ></input>
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("password", {
            required: true,
            minLength: { value: 4, message: "too short" },
          })}
          placeholder="password"
        ></input>
        <input
          {...register("password1", {
            required: true,
            minLength: { value: 4, message: "too short" },
          })}
          placeholder="password1"
        ></input>
        <span>{errors?.password1?.message}</span>

        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
