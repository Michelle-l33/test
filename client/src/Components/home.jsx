import React, { useState } from "react";

const HomePage = () => {
  // State to manage form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [isReviewer, setIsReviewer] = useState(false);

  // State to handle success or error messages
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      isAuthor,
      isEditor,
      isReviewer,
    };

    try {
      const response = await fetch("http://localhost:8082/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User registered successfully!");
      } else {
        setMessage(data.error || "Something went wrong!");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div>
      <h2>Test User Registration</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="radio"
              checked={isAuthor}
              onChange={() => setIsAuthor(!isAuthor)}
            />
            Is Author
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              checked={isEditor}
              onChange={() => setIsEditor(!isEditor)}
            />
            Is Editor
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              checked={isReviewer}
              onChange={() => setIsReviewer(!isReviewer)}
            />
            Is Reviewer
          </label>
        </div>

        <button type="submit">Register</button>
      </form>

      <div>{message && <p>{message}</p>}</div>
    </div>
  );
};

export default HomePage;
