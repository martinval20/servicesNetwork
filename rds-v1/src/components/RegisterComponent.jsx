import React, { useState } from "react";
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import snLogo from "../assets/snLogo.png";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const register = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("¡Tu cuenta se ha registrado exitosamente!");
      postUserData({name: credentials.name, lastname: credentials.lastname, email: credentials.email})
      navigate("/home");
      localStorage.setItem('userEmail',res.user.email);
    } catch (err) {
      console.log(err);
      toast.error("Algo salió mal, intente más tarde :(");
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
        <input
            onChange={(event) =>
              setCredentials({ ...credentials, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Nombre"
          />
           <input
            onChange={(event) =>
              setCredentials({ ...credentials, lastname: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Apellido"
          />

          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Ingrese su Email o Teléfono"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Ingrese su contraseña"
          />
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
