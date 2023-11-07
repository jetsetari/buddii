//libs
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Resetpass() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [verify, setVerify] = useState("")
  const [pasAnimatie, setPasAnimatie] = useState(true)

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/login");
  }

  // const container = useRef(null);
  // const container2 = useRef(null);

  return (
    <section className="wrapper registration">
      <div className="bg-clip"></div>
      <article className="registration-container">
        <h1>Choose password</h1>
        <p className="subtext">Your email: contact@mail.com</p>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <span for="name">Name</span>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="example" />
          </div>

          <div className="input">
            <label for="password">Password</label>
            <input type={pasAnimatie ? "password" : "text"} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="example" />
          </div>

          <div className="input">
            <label for="verpassword">Verify password</label>
            <input type={pasAnimatie ? "password" : "text"} name="verpassword" id="password" value={password} onChange={(e) => setVerify(e.target.value)} placeholder="example" />
          </div>

          <input type="submit" value="Sign Up" />
        </form>
      </article>
    </section>
  );
}

export default Resetpass;
