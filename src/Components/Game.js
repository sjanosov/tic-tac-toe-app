import React from "react";
import GameBoard from "./GameBoard";
import styled from "styled-components";
import ResetGameBtn from "./ResetGameBtn";
import { onSquareClick } from "./GameLogic";
import { BOARD_SIZE, EMPTY_FIELD_ID, PLAYER_1_ID } from "../constants";

const Container = styled.section`
  display: flex;
  justify-content: center;
`;

const H1Styled = styled.h1`
  color: ${prop => (prop.winner ? "green" : "black")};
  font-size: ${prop => (prop.winner ? "55px" : "30px")};
`;

class Game extends React.Component {
  state = {
    board: Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, () => ({ occupiedBy: 0 }))
    ),
    turnPlayerId: 1,
    winner: null,
    turnCount: 0
  };

  startNewGame = () => {
    this.setState({
      board: Array.from({ length: BOARD_SIZE }, () =>
        Array.from({ length: BOARD_SIZE }, () => ({ occupiedBy: 0 }))
      ),
      turnPlayerId: 1,
      winner: null,
      turnCount: 0
    });
  };

  handleClick = (indexRow, indexCol) => {
    this.setState(onSquareClick(this.state, indexRow, indexCol));
  };

  render() {
    return (
      <div>
        <Container>
          <H1Styled winner={this.state.winner}>
            {this.state.winner === null
              ? this.state.turnPlayerId === PLAYER_1_ID
                ? "Player 1 turn"
                : "Player 2 turn"
              : this.state.winner === EMPTY_FIELD_ID
              ? "It is draw!"
              : this.state.winner === PLAYER_1_ID
              ? "Player 1 wins!"
              : "Player 2 wins!"}
          </H1Styled>
        </Container>
        <Container>
          <ResetGameBtn
            value="New Game"
            onClick={() => this.startNewGame()}
          ></ResetGameBtn>
        </Container>
        <Container>
          <GameBoard handleClick={this.handleClick} state={this.state} />
        </Container>
      </div>
    );
  }
}
export default Game;
