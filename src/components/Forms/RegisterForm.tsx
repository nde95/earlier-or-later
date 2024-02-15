import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/UserContext";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  highScore: number;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { userScore } = useUserContext();

  const onSubmit: SubmitHandler<FormValues> = async ({
    confirmPassword,
    ...data
  }) => {
    if (userScore > 0) {
      data.highScore = userScore;
    } else {
      data.highScore = 0;
    }
    const pendingToastId = toast.loading("Submitting...");
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear pending toast
        toast.dismiss(pendingToastId);

        // Show success toast
        toast.success("Registration successful!");
      } else if (response.status === 409) {
        toast.dismiss(pendingToastId);
        toast.error(`Username or email already exists.`);
      } else {
        toast.dismiss(pendingToastId);
        toast.error(
          `An error occurred during registration: ${response.statusText}`
        );
      }
    } catch (error: any) {
      toast.dismiss(pendingToastId);
      toast.error(`An error occurred during registration: ${error}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4"
      noValidate>
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
          type="email"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          placeholder="Email"
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">
            This field is required and should be a valid email
          </span>
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

      <div className="flex flex-col space-y-1">
        <input
          {...register("confirmPassword", {
            required: true,
            validate: value => value === watch("password"),
          })}
          type="password"
          placeholder="Confirm Password"
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">Passwords must match</span>
        )}
      </div>

      <input
        type="submit"
        className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
      />
    </form>
  );
};

export default RegisterForm;
