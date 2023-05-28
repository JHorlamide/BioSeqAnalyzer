export interface MutationRange {
  mutation: string;
  scoreRange: {
    min: number;
    max: number;
  };
}
