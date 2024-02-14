import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <input
          {...register("username", { required: true })}
          placeholder="Username"
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.username && (
          <span className="text-red-500 text-xs">This field is required</span>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">This field is required</span>
        )}
      </div>

      <input
        type="submit"
        className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
      />
    </form>
  );
};

export default LoginForm;
