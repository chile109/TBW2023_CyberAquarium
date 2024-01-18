import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useNFT = (address?: string) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetch(
      `https://testnets-api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=100&include_orders=false`,
      // 0xd8FDf15e99b371214D6f1728C85f96635361978c
      // 0x448C510Ada54D79701112e9aAf8F3d3Eab60CB48
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
  }, [address]);

  return { nfts };
};

export default useNFT;