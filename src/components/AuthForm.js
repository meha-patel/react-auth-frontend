import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {data && data.error && (
          <ul>
            {Object.values(data.errors.map((err) => <li key={err}>{err}</li>))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <button disabled={isSubmitting}>
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </div>
        <div style={{ float: "right", fontSize: "16px" }}>
          <p>
            {isLogin ? "Don't have an account? " : "Already registered? "}
            <Link
              to={`?mode=${isLogin ? "signup" : "login"}`}
              style={{ color: "var(--color-primary-400)", fontSize: "16px" }}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </Link>
          </p>
        </div>
      </Form>
    </>
  );
};

export default AuthForm;
