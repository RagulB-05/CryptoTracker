import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { useCrypto } from "../context/CryptoContext";
import { NavLink, useNavigate } from "react-router-dom";
import { numberWithCommas } from "./banner/Carousel";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false, false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { currency, symbol } = useCrypto();

  useEffect(() => {
    try {
      const fetchCoins = async () => {
        const response = await fetch(CoinList(currency));
        const data = await response.json();
        setCoins(data);
      };
      fetchCoins();
    } catch (error) {
      console.log(error);
    }
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const handlePage = (n) => {
    setPage(n);
    window.scrollTo({
      top: 450,
      behavior: "smooth",
    });
  };

  const activeClass =
    "z-10 flex dark:text-yellow-400 items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 ";
  const inActiveClass =
    "flex dark:text-yellow-400 items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white";
  return (
    <div>
      <div className="text-center">
        <h2 className=" dark:text-white text-4xl font-medium text-center mt-6">
          Cryptocurrency Price By Market Cap
        </h2>
        <input
          className=" text-black dark:text-white bg-slate-50 dark:bg-slate-900 drop-shadow-lg outline-none w-10/12 h-14 mt-10 rounded-lg bg-transparent border border-slate-200 dark:border-slate-400 pl-10 "
          type="text"
          placeholder="Search For CryptoCurreny"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="mt-10 flex justify-center ">
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="relative overflow-x-auto w-10/12 rounded-lg">
              <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs h-20 text-gray-700 uppercase bg-slate-200 dark:bg-yellow-400 dark:text-black">
                  <tr>
                    {["coin", "price", "24h change", "Market Cap"].map(
                      (head) => (
                        <th key={head} scope="col" className="px-6 py-3">
                          {head}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <tr
                          onClick={() => navigate("/")}
                          key={row.name}
                          className="border-b-2 hover:bg-slate-200 dark:hover:bg-slate-900 "
                        >
                          <th className="p-5">
                            <img
                              className="h-10 "
                              src={row?.image}
                              alt={row.name}
                              style={{ marginBottom: 10 }}
                            />
                            <div className="flex flex-col flex-wrap">
                              <span className="uppercase text-xl">
                                {row.symbol}
                              </span>
                              <span>{row.name}</span>
                            </div>
                          </th>
                          <td>
                            {symbol}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </td>
                          <td
                            className="p-10"
                            style={{
                              color: profit > 0 ? "rgb(14,203,129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row?.price_change_percentage_24h?.toFixed(2)}%
                          </td>
                          <td className="p-10">
                            {symbol}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </td>
                        </tr>
                      );
                    })}
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"></tr>
                </tbody>
              </table>
              <div className="flex justify-center my-10 ">
                <nav aria-label="Page navigation example">
                  <ul className="flex items-center -space-x-px h-8 text-sm">
                    <li>
                      <NavLink
                        to="#"
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          className="w-2.5 h-2.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                          />
                        </svg>
                      </NavLink>
                    </li>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <li key={n}>
                        <NavLink
                          onClick={() => handlePage(n)}
                          to="#"
                          className={({ isActive }) =>
                            isActive ? activeClass : inActiveClass
                          }
                          end
                        >
                          {n}
                        </NavLink>
                      </li>
                    ))}

                    <li>
                      <NavLink
                        to="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          className="w-2.5 h-2.5 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinsTable;
