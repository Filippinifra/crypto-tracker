export type WalletDivision = WalletPiece[];

export interface WalletPiece {
  typologyName: string;
  typologyId: string;
  percentage: number;
  color: string;
}
