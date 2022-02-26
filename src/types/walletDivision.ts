export type WalletDivision = WalletPiece[];

export interface WalletPiece {
  typology: string;
  percentage: number;
  value: number;
}
