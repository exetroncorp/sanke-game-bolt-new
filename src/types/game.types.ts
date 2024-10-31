export interface Position {
  x: number;
  y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface GameState {
  score: number;
  isActive: boolean;
  isOver: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}