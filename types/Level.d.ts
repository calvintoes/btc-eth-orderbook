// [price, size]
export type Level = {
  price: number;
  size: number;
};

// [price, size, total]
export type Row = {
  total: number;
} & Level;

export interface Delta {
  feed: string;
  product_id: string;
  bids: Level[];
  asks: Level[];
}
