import React, { useEffect, useState } from "react";
import PlotDetails from "./PlotDetails";
import socketio from "socket.io-client";
import {
  type PlotType,
  BidHistoryType,
  BidHistoryObjType,
} from "../types/types";

const socket = socketio();

type PlotDetailListProps = {
  data: Array<PlotType>;
  userName: string;
};

const PlotDetailList: React.FC<PlotDetailListProps> = (props) => {
  const [bidHistory, setBidHistory] = useState<BidHistoryType>({});
  const [timeRemain, setTimeRemain] = useState<number>(0);

  useEffect(() => {
    getBidHistory();

    //handle to listen updateBid from server socket
    socket.on("updateBid", function (bidObj: BidHistoryType) {
      setBidHistory(bidObj);
    });
    //Emits 'getTime' to server socket
    socket.emit("getTime", "test");
    //handle to listen 'remaining time' from server socket
    socket.on("remainingTime", function (timeFromServer: number) {
      setTimeRemain(timeFromServer);
    });
  }, []);

  const getBidHistory = () => {
    // Get the bidhistory and store them in state
    fetch("/api/bidhistory")
      .then((res) => res.json())
      .then((bidHistory) => setBidHistory(bidHistory));
  };

  const saveBid = (bidhistory: BidHistoryObjType, plotId: number) => {
    bidHistory[plotId] = bidhistory;
    // Save the  bidHistory
    fetch("/api/bidhistory", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      //  dataType: "json",
      body: JSON.stringify(bidHistory),
    })
      .then((res) => res.json())
      .then((bidhistory) => setBidHistory(bidhistory));
  };

  const { data, userName } = props;

  const detailsNodes = data.map(function ({
    id,
    address,
    area,
    basePrice,
    image,
  }) {
    //map the data to individual details
    let bidSort: BidHistoryObjType = {};
    if (Object.keys(bidHistory).length !== 0) {
      const bidHistoryObj: BidHistoryObjType = bidHistory[id];
      bidSort = Object.keys(bidHistoryObj)
        .sort((a, b) => {
          if (bidHistoryObj[b] > bidHistoryObj[a]) {
            return 1;
          }

          if (bidHistoryObj[b] < bidHistoryObj[a]) {
            return -1;
          }

          return 0;
        })
        .reduce((obj, key) => ({ ...obj, [key]: bidHistoryObj[key] }), {});
    }
    return (
      <PlotDetails
        address={address}
        area={area}
        key={id}
        id={id}
        basePrice={basePrice}
        image={image}
        bidHistory={bidSort}
        saveBid={saveBid}
        userName={userName}
        timeFromServer={timeRemain}
      />
    );
  });
  //print all the details in the list
  return (
    <div>
      {Object.keys(bidHistory).length !== 0 && (
        <div className="cards">{detailsNodes}</div>
      )}
    </div>
  );
};

export default PlotDetailList;
