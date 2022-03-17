import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = (data: IForm) => {
    setToDos((old) => [
      { text: data.toDo, id: Date.now(), categories: "ToDo" },
      ...old,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", { required: "please write to do" })}
        placeholder="Write to do"
      ></input>
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
