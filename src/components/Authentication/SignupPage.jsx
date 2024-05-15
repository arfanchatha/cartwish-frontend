import "./SignupPage.css";

import user from "../../assets/user.webp";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signup } from "../../services/userServices";
zodResolver;

const SignupPage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formError, setFormError] = useState("");

  const schema = z
    .object({
      email: z.string().email({ message: "Enter the valid email" }),
      name: z.string().min(3, { message: "Minimum 3 characters" }),
      password: z.string().min(8),
      confirmPassword: z.string(),
      deliveryAddress: z.string().min(10),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Confirm password does not match the Password",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      const { data } = await signup(formData, profilePic);
      localStorage.setItem("toke", data.token);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>

        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])}
            id="file-ip-1"
            className="image_input"
          />
        </div>

        {/* Form Inputs */}
        <div className="form_inputs signup_form_input">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form_text_input"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <em className="form_error">{errors.name.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form_text_input"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form_text_input"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              className="form_text_input"
              type="password"
              placeholder="Enter confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <em className="form_error">{errors.confirmPassword.message}</em>
            )}
          </div>

          <div className="signup_textares_section">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              className="input_textarea"
              placeholder="Enter delivery address"
              {...register("deliveryAddress")}
            />
            {errors.address && (
              <em className="form_error">{errors.address.message}</em>
            )}
          </div>
          {formError && <em className="form_error">{formError}</em>}
        </div>

        <button className="search_button form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupPage;

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// deliveryAddress - Address must be at least 15 characters.
