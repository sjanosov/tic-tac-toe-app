import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: red;
  border: 1px solid grey;
  margin: -1px -1px;
  padding: 0;
  width: 40px;
  height: 40px;
  text-align: center;
`;

const Square = props => (
  <Button onClick={props.onClick}>
    <span>
      <b>{props.objectName}</b>
    </span>
  </Button>
);

export default Square;
