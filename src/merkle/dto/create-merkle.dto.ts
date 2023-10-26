export class CreateMerkleDto {
  root: string;
  leaves: { address: string; amount: string }[];
}
