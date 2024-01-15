'use client'
import { JsonRpcProvider, Wallet, formatEther } from "ethers";
import { Address, useWalletClient } from 'wagmi'
import { TokenboundClient } from '@tokenbound/sdk'
import { type TBAccountParams } from "@tokenbound/sdk/dist/src";
import { useState } from 'react';
import { CONSTANTS } from "./constants"
import { IpfsImage } from 'react-ipfs-image';
const { CHAIN_ID, RPC } = CONSTANTS;

export const provider = new JsonRpcProvider(RPC);

const DEFAULT_ACCOUNT: TBAccountParams = {
  tokenContract: "0xc1f8d1260B5C004C40bAD5153B087Afd8e42900B",
  tokenId: "1"
}

export default function TBA() {
  let nftCount = 0;
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const tokenboundClient = new TokenboundClient({ signer: walletClient, chainId: 11155111 })
  const [retrievedAccount, setRetrievedAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [TBAccount, setTBAccount] = useState<TBAccountParams>(DEFAULT_ACCOUNT)
  const getAccount = () => {
    try {
      const account = tokenboundClient.getAccount(TBAccount)
      setRetrievedAccount(account);
    } catch (err) {
      console.log(err);
    }
  }
  const resetAccount = () => {
    setRetrievedAccount("");
    setTBAccount(DEFAULT_ACCOUNT);
  }

  const displayBalance = async (address: string) => {
    const balance = await provider.getBalance(address);
    setBalance(balance.toString());
    console.log(`balance of ${address}: ${balance}`);

    const nft = await tokenboundClient.getNFT({
      accountAddress: address as Address,
    })
     
    const { tokenContract, tokenId, chainId } = nft
     
    console.log({ tokenContract, tokenId, chainId })
  }

  return (
    <main className="...">
      <div className="...">
        <div className="...">


          <form onSubmit={(e) => {
            e.preventDefault();
            getAccount();
          }}
            className="grid md:grid-cols-2 grid-cols-1 gap-4">

            <label htmlFor="nftContract">
              NFT Contract
            </label>
            <input
              type="text"
              className="h-fit p-2 rounded-lg bg-slate-300 text-black"
              id="nftContract"
              onChange={(event) => setTBAccount({
                ...TBAccount,
                tokenContract: event.target.value as TBAccountParams["tokenContract"]
              })}
              value={TBAccount.tokenContract}
            />

            <label htmlFor="nftTokenId">
              Token ID
            </label>


            <input
              type="text"
              className="h-fit p-2 rounded-lg bg-slate-300 text-black"
              id="nftTokenId"
              onChange={(event) => setTBAccount({
                ...TBAccount,
                tokenId: event.target.value
              })}
              value={TBAccount.tokenId}
            />

            <button
              type="submit"
              className="h-fit p-2 bg-slate-100 rounded-lg col-span-2 text-black self-end">
              Check
            </button>

          </form>

        </div>
        <div className="...">

          <pre className="w-full overflow-x-auto">
            {JSON.stringify({ ...TBAccount, retrievedAccount, balance }, null, 2)}
          </pre>

          <button type="button" className="p-2 bg-slate-100 rounded-lg text-black" onClick={resetAccount}>
            Reset
          </button>

          <button type="button" className="p-2 bg-slate-100 rounded-lg text-black" onClick={() => {
            displayBalance(retrievedAccount);
          }}>
            Reset
          </button>
          <IpfsImage hash='QmVtsGENeURoF8qZwciuTNCQt3PuA441WTUEHt7kozasLo/0.jpeg'/>
        </div>
      </div>
    </main>
  )
}