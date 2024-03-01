import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/UserContext";
import { ClipLoader } from "react-spinners";

type FormValues = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { setCurrentUser, isSubmitting, setIsSubmitting } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const pendingToastId = toast.loading("Logging in...");
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const credentials = await response.json();
        const user = {
          username: credentials.username,
          highscore: credentials.highscore,
        };

        localStorage.setItem("user", JSON.stringify(user));
        // @ts-ignore
        setCurrentUser(user);
        toast.dismiss(pendingToastId);
        toast.success("Login successful!");
        // parent component will handle the closing of the modal
        onSuccess();
      } else {
        toast.dismiss(pendingToastId);
        toast.error("Invalid email or password");
      }
    } catch (error: any) {
      toast.dismiss(pendingToastId);
      toast.error(`An error occurred during login: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
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

      {!isSubmitting ? (
        <input
          type="submit"
          className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
        />
      ) : (
        <button
          className="px-3 text-xs bg-gray-300 rounded-md cursor-not-allowed"
          disabled>
          {" "}
          <ClipLoader />{" "}
        </button>
      )}
    </form>
  );
};

export default LoginForm;
