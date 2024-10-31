import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-container">
      <h1>Snake Game</h1>
      
      <div class="game-board" *ngIf="board.length > 0">
        <div *ngFor="let row of board; let i = index" class="row">
          <div 
            *ngFor="let cell of row; let j = index" 
            class="cell"
            [class.snake]="isSnake(j, i)"
            [class.food]="isFood(j, i)"
          ></div>
        </div>
      </div>

      <div class="controls">
        <div class="score">Score: {{ score }}</div>
        <button (click)="startGame()" *ngIf="!isGameActive">
          {{ gameOver ? 'Play Again' : 'Start Game' }}
        </button>
        <div *ngIf="gameOver" class="game-over">Game Over!</div>
      </div>
    </div>
  `,
  styles: [`
    .game-container {
      text-align: center;
      padding: 20px;
    }

    .game-board {
      display: inline-block;
      background: #34495e;
      padding: 10px;
      border-radius: 8px;
      margin: 20px 0;
    }

    .row {
      display: flex;
    }

    .cell {
      width: 20px;
      height: 20px;
      border: 1px solid #2c3e50;
      background: #34495e;
    }

    .snake {
      background: #2ecc71;
      border-radius: 4px;
    }

    .food {
      background: #e74c3c;
      border-radius: 50%;
    }

    .controls {
      margin-top: 20px;
    }

    .score {
      font-size: 24px;
      margin-bottom: 10px;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: #2980b9;
    }

    .game-over {
      color: #e74c3c;
      font-size: 24px;
      margin-top: 10px;
    }
  `]
})
export class App {
  readonly BOARD_SIZE = 20;
  board: number[][] = [];
  snake: Position[] = [];
  food: Position = { x: 0, y: 0 };
  direction: string = 'RIGHT';
  gameInterval: any;
  isGameActive = false;
  gameOver = false;
  score = 0;

  constructor() {
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }

  handleKeyPress(event: KeyboardEvent) {
    if (!this.isGameActive) return;

    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== 'DOWN') this.direction = 'UP';
        break;
      case 'ArrowDown':
        if (this.direction !== 'UP') this.direction = 'DOWN';
        break;
      case 'ArrowLeft':
        if (this.direction !== 'RIGHT') this.direction = 'LEFT';
        break;
      case 'ArrowRight':
        if (this.direction !== 'LEFT') this.direction = 'RIGHT';
        break;
    }
  }

  startGame() {
    this.board = Array(this.BOARD_SIZE).fill(0).map(() => Array(this.BOARD_SIZE).fill(0));
    this.snake = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 }
    ];
    this.direction = 'RIGHT';
    this.isGameActive = true;
    this.gameOver = false;
    this.score = 0;
    this.generateFood();
    
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }
    
    this.gameInterval = setInterval(() => this.gameLoop(), 150);
  }

  gameLoop() {
    const head = { ...this.snake[0] };

    switch (this.direction) {
      case 'UP':
        head.y--;
        break;
      case 'DOWN':
        head.y++;
        break;
      case 'LEFT':
        head.x--;
        break;
      case 'RIGHT':
        head.x++;
        break;
    }

    if (this.checkCollision(head)) {
      this.endGame();
      return;
    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  generateFood() {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * this.BOARD_SIZE),
        y: Math.floor(Math.random() * this.BOARD_SIZE)
      };
    } while (this.isSnake(newFood.x, newFood.y));
    
    this.food = newFood;
  }

  checkCollision(position: Position): boolean {
    return position.x < 0 || 
           position.x >= this.BOARD_SIZE || 
           position.y < 0 || 
           position.y >= this.BOARD_SIZE ||
           this.isSnake(position.x, position.y);
  }

  endGame() {
    this.isGameActive = false;
    this.gameOver = true;
    clearInterval(this.gameInterval);
  }

  isSnake(x: number, y: number): boolean {
    return this.snake.some(segment => segment.x === x && segment.y === y);
  }

  isFood(x: number, y: number): boolean {
    return this.food.x === x && this.food.y === y;
  }
}

bootstrapApplication(App);