import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function LeftButton({ name, onButtonClick }) {
  return (
    <button className="left-button" onClick={onButtonClick}>
      {name}
    </button>
  )
}

function Header(){
  function handleClick() {

  }

  return(
    <>
      <div className="header">
        <LeftButton value="Collage" onButtonClick={() => handleClick()}></LeftButton>
      </div>
    </>
  )
}

export default function Registration() {
  return (
    <Header/>
  );
}
