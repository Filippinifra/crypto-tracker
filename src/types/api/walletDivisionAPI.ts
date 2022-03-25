export type WalletDivisionDTO = WalletPieceDTO[];

export interface WalletPieceDTO {
  typologyName: string;
  typologyId: string;
  percentage: number;
}
