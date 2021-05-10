import { Badge, Col, Container, Image, Row } from "react-bootstrap";
import Game from "./Game";

import "./App.css";

export default function App() {
  return (
    <Container className="app">
      <Row>
        <Col className="app__header">
          <Image src="./images/connect-four-logo.png" />
          <div className="app__about">
            <Badge variant="dark">React</Badge>
            <Badge variant="dark">React-Bootstrap</Badge>
            <Badge variant="dark">React-Transition-Group</Badge>
            <Badge variant="dark">JavaScript</Badge>
            <Badge variant="dark">CSS</Badge>
            <Badge variant="dark">HTML</Badge>
          </div>
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <Game />
        </Col>
      </Row>
      <Row>
        <Col className="app__footer">
          <h2>Description</h2>
          <p>Connect-Four is a <a href="https://en.wikipedia.org/wiki/Tic-tac-toe" rel="noreferrer" target="_blank">tic-tac-toe</a>-like two-player game in which players alternately place pieces on a vertical board 7 columns across and 6 rows high. Each player uses pieces of a particular color (commonly black and red, or sometimes yellow and red), and the object is to be the first to obtain four pieces in a horizontal, vertical, or diagonal line. Because the board is vertical, pieces inserted in a given column always drop to the lowest unoccupied row of that column. As soon as a column contains 6 pieces, it is full and no other piece can be placed in the column.</p>
        </Col>
      </Row>
    </Container>
  );
}
