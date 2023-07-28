import validateAndSanitizeLoginForm from "../../utils/validator/login";
import s from "./LoginForm.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { getPreviewRedirectUrl } from "../../utils/redirects";
import { isEmpty } from "lodash";
export default function LoginForm() {
  const router = useRouter();
  const [loginFields, setLoginFields] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFormSubmit = (event: any) => {
    event.preventDefault();
    setErrorMessage(null);
    const { postType, previewPostId } = router?.query ?? {};

    // Validation and Sanitization.
    const validationResult = validateAndSanitizeLoginForm({
      username: loginFields?.username ?? "",
      password: loginFields?.password ?? "",
    });

    if (validationResult.isValid) {
      setLoading(true);
      fetch("/api/login", {
        body: JSON.stringify({
          username: validationResult?.sanitizedData?.username ?? "",
          password: validationResult?.sanitizedData?.password ?? "",
        }),
        method: "POST",
      })
        .then((data: any) => {
          // If its a preview request
          if (data?.ok && postType && previewPostId) {
            const previewUrl = getPreviewRedirectUrl(postType, previewPostId);
            router.push(previewUrl);
            return;
          }
          if (data?.status === 403)
            setErrorMessage("Username or password wrong");
          if (!postType) setErrorMessage("no postType provided");
          if (!previewPostId) setErrorMessage("no previewPostId provided");
          setLoading(false);
          return data?.data?.success;
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setLoading(false);
          return false;
        });
    } else {
      setClientSideError(validationResult);
    }
  };

  /**
   * Sets client side error.
   *
   * Sets error data to result received from our client side validation function,
   * and statusbar to true so that its visible to show the error.
   *
   * @param {Object} validationResult Validation Data result.
   */
  const setClientSideError = (validationResult: any) => {
    if (validationResult.errors.password) {
      setErrorMessage(validationResult.errors.password);
    }

    if (validationResult.errors.username) {
      setErrorMessage(validationResult.errors.username);
    }
  };

  const handleOnChange = (event: any) => {
    setLoginFields({ ...loginFields, [event.target.name]: event.target.value });
  };

  const { username, password } = loginFields;
  return (
    <div>
      <div className={s.wrapper}>
        <div className={s.loginContainer}>
          <h4 className={s.title}>Login</h4>
          {!isEmpty(errorMessage) && (
            <div
              className="text-red-600"
              dangerouslySetInnerHTML={{ __html: errorMessage ?? "" }}
            />
          )}
          <form onSubmit={onFormSubmit} className="mb-4">
            <label className={s.label}>
              Username:
              <input
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "
                name="username"
                value={username}
                onChange={handleOnChange}
              />
            </label>
            <label className={s.label}>
              Password:
              <input
                type="password"
                className="mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                name="password"
                value={password}
                onChange={handleOnChange}
              />
            </label>
            <button
              className={`${s.button} ${loading && s.loading}`}
              type="submit"
            >
              <span>Login</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
