import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormField = {
  email: string;
  password: string;
};

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors,isSubmitting }
  } = useForm<FormField>({
    defaultValues: {
      email: '',
      password:''
    }
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      await new Promise((res => setTimeout(res, 2000)))
      throw new Error();
    } catch (e) {
      setError("root", {
        message: "email is already taken"
      })
    }
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center p-3 mt-20 overflow-hidden">
      <form className="gap-4 border p-5 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center items-center p-3 gap-4">
          <input
            {...register("email", {
              required: "Email is required",
              validate: (value) => {
                if (!value.includes("@")) {
                  return("Email must include @")
                }
              },
            })}
            type="text"
            placeholder="Email"
          />
          {errors.email && <div className="text-red-500">{errors.email.message}</div>}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message:"Password must be atleast 8 characters"
              }
            })}
            type="text"
            placeholder="Password"
          />
          {errors.password && <div className="text-red-500">{errors.password.message}</div>}
          {errors.root && <div className="text-red-500">{errors.root.message}</div>}
          <button disabled={ isSubmitting } type="submit">
            {isSubmitting ? 'Loading...':'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
