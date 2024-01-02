import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useNFT = (_address?: string) => {
  const { address } = useAccount();
  const addr = _address || address;
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetch(
      // `https://testnets-api.opensea.io/api/v1/assets?owner=0xd8FDf15e99b371214D6f1728C85f96635361978c&order_direction=desc&offset=0&limit=20&include_orders=false`,
      `https://testnets-api.opensea.io/api/v1/assets?owner=${addr}&order_direction=desc&offset=0&limit=5&include_orders=false`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-KEY": "369d126c15054a758f5be55651e5a04a",
        },
        // mode: "no-cors",
      }
    )
      .then((response) => response.json())
      .then(({ assets }) => {
        console.log(assets);
        setNfts(assets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [addr]);

  return { nfts };
};

export default useNFT;

