import * as React from "react";
import styled from "styled-components";

const TicTacToeLayout = styled.div`
  min-height: 100vh;
  display: grid;
  place-content: center;
`;

const SquareLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 8px;
`;

const SquareCell = styled.div<{
  isWinningCell: boolean;
  gameOver: boolean;
}>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border: 1px solid #222;
  border-radius: 4px;
  cursor: pointer;
  font-size: 2rem;
  user-select: none;
  background-color: ${({ isWinningCell }) =>
    isWinningCell ? "#90ee90" : "transparent"};

  &:hover {
    background-color: ${({ isWinningCell, gameOver }) =>
      gameOver
        ? isWinningCell
          ? "#90ee90"
          : "transparent"
        : isWinningCell
        ? "#90ee90"
        : "#ddd"};
    transition: background-color 0.2s ease-in-out;
  }
`;

const Winner = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: center;
`;

interface SquareProps {
  index: number;
  value: string | null;
  onClick: () => void;
  isWinningCell: boolean;
  gameOver: boolean;
}

type Board = (string | null)[];

const Square: React.FC<SquareProps> = (props: SquareProps) => {
  const { value, onClick, isWinningCell, gameOver } = props;
  return (
    <SquareCell
      onClick={onClick}
      isWinningCell={isWinningCell}
      gameOver={gameOver}
    >
      {value}
    </SquareCell>
  );
};

export const TicTacToe: React.FC = () => {
  const [board, setBoard] = React.useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = React.useState("X");
  const [gameOver, setGameOver] = React.useState(false);
  const [winner, setWinner] = React.useState<string | null>("");
  const [winningCells, setWinningCells] = React.useState<number[]>([]);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  const handleWinner = (newBoard: Board) => {
    for (const [a, b, c] of winningCombinations) {
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return { winner: newBoard[a], cells: [a, b, c] };
      }
    }
    return { winner: null, cells: [] };
  };

  const isGameDrawn = (newBoard: Board) => {
    return newBoard.every((cell) => cell !== null);
  };

  const handleCellClick = (idx: number) => {
    if (board[idx] || gameOver) return;
    const newBoard = [...board];

    newBoard[idx] = currentPlayer;
    const { winner, cells } = handleWinner(newBoard);
    setBoard(newBoard);

    if (winner) {
      setGameOver(true);
      setWinningCells(cells);
      setWinner(`Player ${currentPlayer} won`);
      return;
    }

    if (isGameDrawn(newBoard)) {
      setGameOver(true);
      setWinner("Game Drawn...");
      return;
    }

    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  return (
    <TicTacToeLayout>
      <SquareLayout>
        {board.map((value, i) => (
          <Square
            key={i}
            index={i}
            value={value}
            onClick={() => handleCellClick(i)}
            isWinningCell={winningCells.includes(i)}
            gameOver={gameOver}
          />
        ))}
      </SquareLayout>
      {winner && <Winner>{winner}</Winner>}
    </TicTacToeLayout>
  );
};
