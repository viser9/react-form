import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormField = {
  email: string;
  password: string;
};

function App() {
  const { register, handleSubmit, formState:{errors} } = useForm<FormField>();

  const onSubmit: SubmitHandler<FormField> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center p-3">
      <form className="gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center items-center p-3 gap-4">
          <input
            {...register("email", {
              required: "Email is required",
              validate: (value) => value.includes("@"),
            })}
            type="text"
            placeholder="Email"
          ></input>
          {errors.email && <div>{errors.email.message}</div>}
          <input
            {...register("password")}
            type="text"
            placeholder="Password"
          ></input>
          <button type="submit" className="bg-white p-3 hover:bg-slate-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
