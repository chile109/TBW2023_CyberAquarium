import { useEffect, useState } from "react";

type nftsData = {
  identifier: number;
  image_url: string;
}

export const useGetNFT = (chain: string,identifier: number,address?: string) => {
  const [nfts, setNfts] = useState<nftsData>();
  useEffect(() => {
    fetch(
      `https://testnets-api.opensea.io/api/v2/chain/${chain}/contract/${address}/nfts/${identifier}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setNfts(data.nft);
      })
      .catch((err) => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identifier]);

  return { nfts };
};

export const GetNFTsByAccount = (chain: string,identifier: string,address?: string) => {
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.opensea.io/api/v2/chain/${chain}/account/${address}/nfts`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setNfts(data.nfts || []);
      })
      .catch((err) => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identifier]);

  return { nfts };
};
