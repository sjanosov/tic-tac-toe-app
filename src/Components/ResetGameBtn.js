import React from "react";
import styled from "styled-components";

const Button = styled.button`
  justify-content: center;
  display: flex;
  background: transparent;
  cursor: pointer;
  border: 1px solid black;
  margin: 0px;
  font-size: 30px;

  &:hover {
    padding: 10px 20px;
    background: #efee81;
  }
`;

const ResetGameBtn = props => {
  return <Button onClick={props.onClick}>{props.value}</Button>;
};

export default ResetGameBtn;
