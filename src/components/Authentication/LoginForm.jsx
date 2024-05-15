import "./LoginForm.css";
import { useForm } from "react-hook-form";
useForm;
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../services/userServices";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const location = useLocation();

  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      const { data } = await login(formData);
      const { state } = location;
      window.location = state ? state.from : "/";
      localStorage.setItem("token", data.token);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={handleSubmit(onSubmit)}>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="email"
                  className="login__input"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <em className="form_error">{errors.email.message}</em>
              )}

              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <em className="form_error">{errors.password.message}</em>
                )}
              </div>
              {formError && <em className="form_error">{formError}</em>}

              <button className="button login__submit">
                <span className="button__text">Submit</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
