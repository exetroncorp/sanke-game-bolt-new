import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Position } from '../types/game.types';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-board">
      <div
        *ngFor="let row of board; let i = index"
        class="board-row"
      >
        <div
          *ngFor="let cell of row; let j = index"
          class="cell"
          [class.snake]="isSnake(j, i)"
          [class.snake-head]="isSnakeHead(j, i)"
          [class.food]="isFood(j, i)"
          [class.pulse]="isFood(j, i)"
        ></div>
      </div>
    </div>
  `,
  styles: [`
    .game-board {
      display: grid;
      grid-template-columns: repeat(20, 25px);
      grid-template-rows: repeat(20, 25px);
      border: 3px solid #34495e;
      background-color: #2c3e50;
      gap: 1px;
      margin: 20px auto;
      box-shadow: 0 0 20px rgba(0,0,0,0.3);
      border-radius: 8px;
      overflow: hidden;
      width: fit-content;
    }

    .board-row {
      display: contents;
    }

    .cell {
      width: 25px;
      height: 25px;
      background-color: #34495e;
      transition: all 0.1s ease;
    }

    .snake {
      background-color: #2ecc71;
      border-radius: 4px;
      box-shadow: 0 0 5px rgba(46, 204, 113, 0.5);
    }

    .snake-head {
      background-color: #27ae60;
      border-radius: 6px;
      transform: scale(1.1);
    }

    .food {
      background-color: #e74c3c;
      border-radius: 50%;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }

    .pulse {
      animation: pulse 1s infinite;
    }
  `]
})
export class GameBoardComponent {
  @Input() board: number[][] = [];
  @Input() snake: Position[] = [];
  @Input() food: Position = { x: 0, y: 0 };

  isSnake(x: number, y: number): boolean {
    return this.snake.some(segment => segment.x === x && segment.y === y);
  }

  isSnakeHead(x: number, y: number): boolean {
    return this.snake[0]?.x === x && this.snake[0]?.y === y;
  }

  isFood(x: number, y: number): boolean {
    return this.food.x === x && this.food.y === y;
  }
}