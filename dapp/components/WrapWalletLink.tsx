import React from 'react';
import { useAccount } from 'wagmi'


const WrapWalletLink = () => {
  const { address } = useAccount()
  return (
    <div className="wrap-wallet-link bgset" >
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="wrap-wallet-link-icon bi bi-link-45deg" viewBox="0 0 16 16">
        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
      </svg>
      {address !== undefined ? (
        <p className="wrap-wallet-text">{address.slice(0, 5)}...{address.slice(-5)}</p>
      ) : null}
    </div>
  );
};

export default WrapWalletLink;
