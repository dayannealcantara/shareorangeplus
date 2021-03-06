import React, {useState} from "react";
import "./style.css";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import  LogoFCamara  from "../../assets/logoFcamara.png";


const Login = () =>{
  let error = document.getElementsByClassName("error")[0]
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email('Email Invalido').required("O campo é obrigatório"),
      password: yup.string().required("O campo é obrigatório"),
    }),
    onSubmit: async (values) => { 
      // alert(JSON.stringify(values, null, 2))
      const email = values.email
      const senha = values.password
      const item = {email,senha}
      error.innerText = 'Carregando ....'
      let result = await fetch("https://backend-technicalshare.herokuapp.com/users/auth/login",{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify(item)
      });


      if(result.status === 200) {
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result))
        navigate("/perfil")
      }
      else {
        error.innerText = 'Login invalido'
      }
      
    },
  });

  
  return (
    <div className="container">      
      <main className="main__login">  
        <div className="wrapper">
        <h2 className="title">Share<br/><span className="segundoNome">Orange+</span></h2>    
           <form onSubmit={formik.handleSubmit} noValidate >
                                      
            <div className="input">
            <label className="tituloInput" htmlFor="">E-mail</label>
              <input 
              type="email"
              id="email"
              label="email"
              errors={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="alerta">{formik.errors.email}</span>
              ) : null }
            </div>
              <div className="input">
                <label className="tituloInput"
                htmlFor="">Senha</label>
              <input 
              type="password"
              id="password"
              label="password"
              errors={formik.touched.password && formik.errors.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <span className="alerta">{formik.errors.password}</span>
              ) : null }             
            </div>
            <div className="buttons">
              <button type="submit" className="buttonLogin">Entrar</button>
              <p className="esqueceSenha">Esqueceu sua senha??</p>   
            </div>               
          </form>
            <p className="error"></p>
        </div>
      
      </main>
        <div className="rodape">
          <img  className="logoFCamara"src={LogoFCamara} alt="" />
        </div>      
    </div>
  )
}

export default Login;