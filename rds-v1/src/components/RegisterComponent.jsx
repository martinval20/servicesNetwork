import React, { useState, useRef } from "react";
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import { postUserData, createUserChats } from "../api/FirestoreAPI";
import snLogo from "../assets/snLogo.png";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../helpers/getUniqueId";
import { toast } from "react-toastify";
import "../Sass/RegisterComponent.scss";

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const password = useRef();
  const passwordAgain = useRef();

  const register = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      toast.error("Las contraseñas no coinciden");
    } else {
      try {
        let res = await RegisterAPI(credentials.email, credentials.password);
        toast.success("¡Tu cuenta se ha registrado exitosamente!");
        const unique= getUniqueID();
        postUserData({
          userID: unique,
          name: credentials.name,
          lastname: credentials.lastname,
          email: credentials.email,
          imageLink:
            "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280-768x768.jpg",
        });
        navigate("/home");
        localStorage.setItem("userEmail", res.user.email);
        createUserChats(unique);//REVISAR
      } catch (err) {
        console.log(err);
        toast.error("Algo salió mal, intente más tarde :(");
      }
    }
  };

  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    navigate("/home");
  };
  return (
    <div className="login-wrapper">
      <img src={snLogo} className="snLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Conecta con quienes te necesiten</h1>
        <p className="sub-heading">
          Mantente conectado con quienes te requieran
        </p>

        <div className="auth-inputs">
          <div className="auth-inputs">
            <input
              onChange={(event) =>
                setCredentials({ ...credentials, name: event.target.value })
              }
              className="common-input"
              required
              autoComplete="off"
              type="text"
              id="name"
            />
            <label className="label" htmlFor="name">
              Nombre
            </label>
          </div>
          <div className="auth-inputs">
            <input
              onChange={(event) =>
                setCredentials({ ...credentials, lastname: event.target.value })
              }
              className="common-input"
              required
              autoComplete="off"
              type="text"
              id="lastname"
            />
            <label className="label" htmlFor="lastname">
              Apellido
            </label>
          </div>

          <div className="auth-inputs">
            <input
              onChange={(event) =>
                setCredentials({ ...credentials, email: event.target.value })
              }
              className="common-input"
              required
              autoComplete="off"
              type="email"
              id="email"
            />
            <label className="label" htmlFor="email">
              E-mail
            </label>
          </div>
          <div className="auth-inputs">
            <input
              onChange={(event) =>
                setCredentials({ ...credentials, password: event.target.value })
              }
              className="common-input"
              required
              ref={password}
              autoComplete="off"
              type="password"
              minLength="6"
              id="password"
            />
            <label className="label" htmlFor="password">
              Contraseña
            </label>
          </div>
          <div className="auth-inputs">
            <input
              className="common-input"
              required
              ref={passwordAgain}
              autoComplete="off"
              type="password"
              id="confirmPassword"
            />
            <label className="label" htmlFor="confirmPassword">
              Confirmar contraseña
            </label>
          </div>
        </div>
        <button onClick={register} className="login-btn">
          Aceptar & Unirse
        </button>
      </div>
      <hr className="hr-text" data-content="O también " />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn} />
        <p className="go-to-signup">
          ¿Ya estás registrado?{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Accede
          </span>
        </p>
      </div>
    </div>
  );
}
