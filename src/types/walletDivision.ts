export type WalletDivision = WalletPiece[];

export interface WalletPiece {
  typologyName: string;
  typologyId: string;
  percentage: number;
  color: string;
}

export type EditingWalletDivision = EditingWalletPiece[];

export interface EditingWalletPiece {
  typologyName: string;
  typologyId: string;
  percentage: number | null;
  color: string;
}
