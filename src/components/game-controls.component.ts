import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameState } from '../types/game.types';

@Component({
  selector: 'app-game-controls',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="controls">
      <div class="score-container">
        <div class="score current">Score: {{ gameState.score }}</div>
        <div class="score high">High Score: {{ highScore }}</div>
      </div>

      <div class="difficulty-controls" *ngIf="!gameState.isActive">
        <button
          *ngFor="let level of ['easy', 'medium', 'hard']"
          (click)="setDifficulty.emit(level)"
          [class.selected]="gameState.difficulty === level"
          class="difficulty-btn"
        >
          {{ level | titlecase }}
        </button>
      </div>

      <button
        (click)="startGame.emit()"
        *ngIf="!gameState.isActive"
        class="start-btn"
      >
        {{ gameState.isOver ? 'Play Again' : 'Start Game' }}
      </button>

      <div *ngIf="gameState.isOver" class="game-over">
        Game Over!
      </div>
    </div>
  `,
  styles: [`
    .controls {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    .score-container {
      display: flex;
      gap: 20px;
      margin-bottom: 10px;
    }

    .score {
      font-size: 24px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .high {
      color: #f1c40f;
    }

    .difficulty-controls {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
    }

    .difficulty-btn {
      background-color: #34495e;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .difficulty-btn:hover {
      background-color: #2c3e50;
    }

    .difficulty-btn.selected {
      background-color: #2980b9;
      transform: scale(1.1);
    }

    .start-btn {
      background-color: #27ae60;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 18px;
      font-weight: bold;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .start-btn:hover {
      background-color: #219a52;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .game-over {
      color: #e74c3c;
      font-size: 32px;
      font-weight: bold;
      text-transform: uppercase;
      animation: fadeIn 0.5s ease;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class GameControlsComponent {
  @Input() gameState!: GameState;
  @Input() highScore: number = 0;
  @Output() startGame = new EventEmitter<void>();
  @Output() setDifficulty = new EventEmitter<'easy' | 'medium' | 'hard'>();
}