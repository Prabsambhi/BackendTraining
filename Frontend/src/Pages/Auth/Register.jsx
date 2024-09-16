import React, { useState } from "react";
import axios from "axios";
import PasswordValidator from "password-validator";
import "../../App.css";
import validator from "validator";

const schema = new PasswordValidator();

schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(40) // Maximum length 40
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123", "12345678"]); // Blacklist these values

const Register = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!name.trim()) {
      formErrors.name = "Name is required";
    }
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
      formErrors.email = "Please write your email in correct format";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else {
      const passwordValidationErrors = schema.validate(password, {
        list: true,
      });

      if (passwordValidationErrors.length > 0) {
        formErrors.password = getPasswordErrorMessage(passwordValidationErrors);
      }
    }

    if (!phone) {
      formErrors.phone = "Phone number is required";
    } else if (!validator.isMobilePhone(phone, "any")) {
      formErrors.phone = "Phone number not valid";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const getPasswordErrorMessage = (validationErrors) => {
    const messages = {
      min: "Password should be atleast 8 characters",
      max: "Password should not exceed 40 characters",
      uppercase: "Password must contain atleast 1 uppercase letter",
      lowercase: "Password must contain atleast 1 lowercase letter",
      digits: "Password Must have at least 2 digits",
      spaces: "Password should not have spaces",
      oneOf: "Password is too common",
    };

    return validationErrors.map((error) => messages[error]).join(", ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        name,
        email,
        password,
        phone,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="form-register">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <label>Phone</label>
        <input
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
