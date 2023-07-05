import React, { useState } from "react";
import PlotDetailList from "../plot/PlotDetailList";
import { type PlotType } from "../types/types";

type HomeProps = {
  plotDetails: Array<PlotType>;
};

const Home: React.FC<HomeProps> = ({ plotDetails }) => {
  const [userName, setUserName] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    setUserName(value);
    event.preventDefault();
  };

  return (
    <div className="user-form">
      <div className="user-banner">
        {userName === "" ? (
          <div className="label-center">
            <h3>Please Enter Your Name To Bid the Auction</h3>
            <form onSubmit={handleSubmit}>
              <input
                id="inputUsername"
                placeholder="User Name"
                type="text"
                value={value}
                onChange={handleChange}
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        ) : (
          <div className="label-center">
            <h2>HI! {userName} Welcome to Plot Auction System</h2>
          </div>
        )}
      </div>

      <div className="plot-detail">
        {plotDetails.length !== 0 && (
          <PlotDetailList data={plotDetails} userName={userName} />
        )}
      </div>
    </div>
  );
};

export default Home;
