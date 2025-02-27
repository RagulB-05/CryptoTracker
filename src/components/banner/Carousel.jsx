import React, { useEffect, useState } from "react";
import { useCrypto } from "../../context/CryptoContext";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useCrypto();
  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const response = await fetch(TrendingCoins(currency));
      const data = await response.json();
      setTrending(data);
    };
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className="mt-8 flex justify-center flex-col items-center" to="/">
        <img
          className="h-24"
          src={coin?.image}
          alt="coin name"
          height="20"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol}
          {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    1024: {
      items: 4,
    },
  };
  return (
    <div className=" text-white content-center h-2/4">
      <div className="flex justify-center ">
        <AliceCarousel
          mouseTracking
          infinite
          animationDuration={1000}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          items={items}
        />
      </div>
    </div>
  );
};

export default Carousel;
