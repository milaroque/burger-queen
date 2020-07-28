import React from "react";
import Button from "../button/Button";

const Menu = (props) => {
    return ( <Button>
      <div> { props.name } </div> 
      <div> { props.price } </div> 
      </Button>
    );
  }


export default Menu;
