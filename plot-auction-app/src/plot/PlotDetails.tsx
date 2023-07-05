import React, { useState } from "react";
import { BidHistoryObjType } from "../types/types";
import BidHistory from "../bid/BidHistory";
import BidTimer from "../bid/BidTimer";

type PlotDetailProps = {
  bidHistory: BidHistoryObjType;
  userName: string;
  id: number;
  image: string;
  address: string;
  area: string;
  basePrice: number;
  timeFromServer: number;
  saveBid: (bidHistoryObj: BidHistoryObjType, id: number) => void;
};

const PlotDetails: React.FC<PlotDetailProps> = ({
  id,
  userName,
  image,
  address,
  area,
  bidHistory,
  basePrice,
  timeFromServer,
  saveBid,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showBidInput, setShowBidInput] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    const bidHistoryObj = bidHistory;
    bidHistoryObj[userName] = inputValue;
    event.preventDefault();
    saveBid(bidHistoryObj, id);
    setShowBidInput(false);
  };

  const reBid = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setShowBidInput(true);
  };

  const imgUrl = require(`../assets/${image}`);
  //display an individual LiveStock Detail
  return (
    <div className="card">
      <div className="card-image">
        <img src={imgUrl} alt="A plot for sale" />
      </div>
      <div className="card-details">
        <div className="card-title">
          {address} - {id}
        </div>
        <div className="card-base-price">Base Price - ₹{basePrice}</div>
        <div className="card-area-measure">Area - {area} Sqft</div>
        <div className="card-bid-timer">
          {timeFromServer > 0 && <BidTimer timeFromServer={timeFromServer} />}
          {timeFromServer < 0 && <div>SOLD</div>}
        </div>
      </div>
      {userName !== "" && (
        <div>
          {showBidInput ? (
            <form onSubmit={handleSubmit}>
              {timeFromServer > 0 && (
                <div className="bid-form">
                  <input
                    id="inputBid"
                    className="form-input"
                    type="number"
                    placeholder="Your Price"
                    min={basePrice}
                    value={inputValue}
                    onChange={handleChange}
                  />

                  <input type="submit" value="Bid" />
                </div>
              )}
            </form>
          ) : (
            <input
              type="button"
              className="rebid-input"
              value="ReBid"
              onClick={reBid}
            />
          )}
        </div>
      )}

      <div className="bid-history">
        {Object.keys(bidHistory).length > 0 && (
          <>
            <div className="bid-history-header">Bid History</div>
            <BidHistory bidHistory={bidHistory} />
          </>
        )}
      </div>
    </div>
  );
};

export default PlotDetails;
