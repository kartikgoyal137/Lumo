import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChannelPage(props){
    const navigate = useNavigate()






    return (
        <>
<nav className="navbar navbar-expand-lg" style={{background: '#ff7f50'}}>
  <div className="container-fluid" >
    <a className="navbar-brand ms-3" href="#" style={{color: "white", fontSize: "1.6em"}}><b>LUMO</b></a>
    <a className="nav-link active mx-auto" style={{color: "white"}} href="#">Your space to connect, effortlessly!</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item me-2">
          <a className="nav-link active btn btn-light me-4" style={{background: "white"}} href="https://github.com/kartikgoyal137/">github/kartikgoyal137</a>
        </li>
        
      </ul>
    </div>
  </div>
</nav>



WELCOME to {props.id}
<input value={}/>








<div className="container-fluid text-center" style={{position:'fixed', bottom: '0px', background: '#ff7f50', minHeight: '7vh', color: 'white', zIndex: '10'}}>
      <b>Made with ❤️</b>
</div>
        </>
    )
}