// UI
import { uselogin } from "../hooks/use-login";
import { Input } from "../../services/Input.tsx";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { mutate, isPending, isError } = uselogin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    mutate(
      {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-md w-80 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Admin Login</h2>

      <Input name="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Password" required />

      {isError && <p className="text-red-500 text-sm">Invalid LogIn</p>}

      <button
        disabled={isPending}
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Loading..." : "Login"}
      </button>
    </form>
  );
};
