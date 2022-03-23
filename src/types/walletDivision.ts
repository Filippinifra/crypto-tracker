export type WalletDivision = WalletPiece[];

export interface WalletPiece {
  typologyName: string;
  typologyId: string;
  percentage: number;
  color: string;
}

export type WalletDivisionDTO = WalletPieceDTO[];

export interface WalletPieceDTO {
  typologyName: string;
  typologyId: string;
  percentage: number;
}
