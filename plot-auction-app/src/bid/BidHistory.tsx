import React from "react";
import { BidHistoryObjType } from "../types/types";

type BidHistoryProps = {
  bidHistory: BidHistoryObjType;
};

const BidHistory: React.FC<BidHistoryProps> = ({ bidHistory }) => {
  const historyList = Object.keys(bidHistory).map((key) => {
    return (
      <>
        <span>{key}</span>
        <span>₹{bidHistory[key]}</span>
      </>
    );
  });
  return (
    <div className="bid-table">
      <span className="table-header-cell">Bidder</span>
      <span className="table-header-cell">Bid Price</span>
      {historyList}
    </div>
  );
};

export default BidHistory;
