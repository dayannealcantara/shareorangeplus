import React from "react";
import { Link } from "react-router-dom";


function Page1() {
  return(
    <>
     <header className="cabecalho">
      <div>
        <Link className="conect" to="/">Tela inicial</Link>  
      </div> 
    </header>    
     <h1> Essa será a segunda tela</h1>
    </>
  )
}

export default Page1