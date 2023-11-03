import React, { useState } from "react";
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import snLogo from "../assets/snLogo.png";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Sass/LoginComponent.scss";
//On this component Im gonna put all that I will see on my login page

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});

  const login = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success("Ingresó a Services Network");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Por favor, revise su email y contraseña");
    }
  };

  const googleSignIn = async () => {
    let response = await GoogleSignInAPI();
    navigate("/home");
  };
  return (
    <div className="login-wrapper">
      <img src={snLogo} className="snLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Ingresar</h1>
        <p className="sub-heading">
          Mantente conectado con quienes necesiten tu ayuda
        </p>

        <div className="auth-inputs-l">
          <div className="auth-inputs-l">
            <input
              onChange={(event) =>
                setCredentials({ ...credentials, email: event.target.value })
              }
              type="email"
              required
              autoComplete="off"
              className="common-input"
              id="email"
            />
            <label className="label" htmlFor="email">
              E-mail
            </label>
          </div>
          <div className="auth-inputs-l">
            <input
              onChange={(event) =>
                setCredentials({ ...credentials, password: event.target.value })
              }
              required
              autoComplete="off"
              type="password"
              className="common-input"
              id="password"
            />
            <label className="label" htmlFor="password">
              Contraseña
            </label>
          </div>
        </div>
        <button onClick={login} className="login-btn">
          Ingresar
        </button>
      </div>
      <hr className="hr-text" data-content="O también " />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn} />
        <p className="go-to-signup">
          ¿Nuevo en Services Network?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Únete ahora y accede a más oportunidades
          </span>
        </p>
      </div>
    </div>
  );
}
