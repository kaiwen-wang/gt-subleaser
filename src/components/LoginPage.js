import { useState } from "react";

export default function LoginPage({ props }) {
  const [modalSubmit, setModalSubmit] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setModalSubmit(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      email: document.getElementById("email").value,
      // options: {
      //   emailRedirectTo: "https://example.com/welcome",
      // },
    });
    if (error) {
      alert(error);
      setModalSubmit(false);
    } else {
      setTimeout(() => {
        setModalSubmit(false);
        alert("You have been sent a magic link! It expires in 1 hour.");
      }, 100);
    }
  };

  return (
    <>
      <div className="isolate fixed inset-0 bg-black bg-opacity-25" />

      <div className="absolute inset-0 flex items-center justify-center min-h-full p-4 text-center">
        <div className="rounded-2xl w-full max-w-sm p-6 text-left align-middle bg-white shadow-xl">
          <h1 className="text-lg font-medium leading-6 text-gray-900">
            Log In
          </h1>
          <div className="mt-2">
            <h2 className="text-sm text-gray-500">
              You will be emailed a magic link to log in.
            </h2>
          </div>

          <form id="loginForm" className="mt-4" onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="@gatech.edu emails only"
                  pattern=".+@gatech\.edu"
                  required
                  size="75"
                  className=" w-full border border-black rounded-sm"
                />
              </div>
            </div>

            <div className="mt-8 mb-1 text-center">
              <button
                type="submit"
                className="hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md"
              >
                {modalSubmit ? "Loading..." : "Send Magic Link"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
