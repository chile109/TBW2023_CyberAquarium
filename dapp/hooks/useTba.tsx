import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useTba = (_address?: string) => {
  const { address } = useAccount();
  const addr = _address || address;
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    fetch(
      `https://testnets-api.opensea.io/api/v2/chain/sepolia/account/${addr}/nfts?collection=testsea`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setNfts(data.nfts || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [addr]);

  return { nfts };
};

export default useTba;
