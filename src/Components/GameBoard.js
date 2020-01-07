import React from "react";
import styled from "styled-components";
import Square from "./Square";
import {PLAYER_1_ID,
  EMPTY_FIELD_ID,
  PLAYER_1_DRAW,
  PLAYER_2_DRAW,
  EMPTY_FIELD_DRAW} from "../constants";

const GameBoardStyled = styled.section`
  justify-content: center;
  display: flex;
  padding: 40px;
`;
const GameBoard = props => {
  return (
    <GameBoardStyled>
      <table>
        <tbody>
          {props.state.board.map((row, indexRow) => (
            <tr key={indexRow}>
              {row.map((col, indexCol) => (
                <td key={indexCol}>
                  <Square
                    onClick={() => props.handleClick(indexRow, indexCol)}
                    objectName={col.occupiedBy === EMPTY_FIELD_ID ? EMPTY_FIELD_DRAW : col.occupiedBy === PLAYER_1_ID ? PLAYER_1_DRAW : PLAYER_2_DRAW}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </GameBoardStyled>
  );
};

export default GameBoard;
