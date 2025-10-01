import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStyles as styles } from "../assets/dummystyle.js";
import { UserContext } from "../context/userContext.jsx";
import { validateEmail } from "../utlis/helper.js";
import axiosInstance from "../utlis/axiosInstance.js";
import { API_PATHS } from "../utlis/apiPaths.js";
import Inputs from "./Inputs.jsx";

const SignUp = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName) {
      setError("Please enter Full Name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter valid Email");
      return;
    }
    if (!password) {
      setError("Please enter password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}> Create Account </h3>
        <p className={styles.signupSubtitle}>Join thousand of professional today</p>
      </div>
      {/* {Form} */}
      <form onSubmit={handleSignUp} className={styles.signupForm}>
        <Inputs value={fullName} onChange={({ target }) => setFullName(target.value)} label="Full Name" placeholder="John Doe" type="text" />
        <Inputs value={email} onChange={({ target }) => setEmail(target.value)} label="Email" placeholder="email@expample.com" type="email" />
        <Inputs value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 characters" type="password" />

        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit" className={styles.signupSubmit}>
          Create Account
        </button>
        <p>
          Already have an account?{""}
          <button onClick={() => setCurrentPage("login")} type="submit" className={styles.signupSwitchButton}>
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
