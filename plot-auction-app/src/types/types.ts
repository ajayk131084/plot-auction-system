export type PlotType = {
  id: number;
  address: string;
  area:string;
  basePrice: number;
  image: string;
};

export type BidHistoryObjType = {
    [userName: string]: string  
}

export type BidHistoryType = {
  [id: string]: BidHistoryObjType;
};
