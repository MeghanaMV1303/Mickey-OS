'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

type Player = 'X' | 'O';
type SquareValue = Player | null;

function calculateWinner(squares: SquareValue[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }: { value: SquareValue; onSquareClick: () => void }) {
    const renderIcon = () => {
        if (value === 'X') {
            return <svg className="w-12 h-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
        }
        if (value === 'O') {
            return <svg className="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>;
        }
        return null;
    }
  return (
    <button
      className="flex items-center justify-center w-24 h-24 text-4xl font-bold transition-colors border-2 rounded-lg bg-card hover:bg-accent"
      onClick={onSquareClick}
    >
      {renderIcon()}
    </button>
  );
}

export function TicTacToe() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("Next player: X");

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (squares.every(Boolean)) {
      setStatus('Draw!');
    } else {
      setStatus(`Next player: ${xIsNext ? 'X' : 'O'}`);
    }
  }, [squares, xIsNext]);

  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onSquareClick={() => handleClick(i)} />;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-background">
        <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Tic-Tac-Toe</h1>
            <p className={cn("text-xl text-muted-foreground", calculateWinner(squares) && "text-primary font-semibold")}>{status}</p>
        </div>
      <Card className="p-4 shadow-lg">
        <CardContent className="p-0">
          <div className="grid grid-cols-3 gap-2">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </CardContent>
      </Card>
      <Button onClick={handleReset} className="mt-6">
        <RotateCcw className="mr-2" />
        New Game
      </Button>
    </div>
  );
}
