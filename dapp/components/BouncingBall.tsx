import React, { useEffect, useRef } from 'react';
import useNFT from "../hooks/useNFT";

interface nftsData {
  id: number;
  image_original_url?: string;
  image_preview_url?: string;
  image_url?: string;
  image?: string;

}

const Ball: React.FC<nftsData> = ({ image }) => {
  const ballSize = 100;
  const initialVelocity = { x: 1 * (Math.random() - 0.5), y: 0.5 * (Math.random() - 0.5) }; // 初始速度隨機
  const velocity = useRef(initialVelocity);

  const ballRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const ball = ballRef.current!;

    const moveBall = () => {
      const rect = ball.getBoundingClientRect();

      if (rect.left + velocity.current.x < 0 || rect.right + velocity.current.x > window.innerWidth) {
        velocity.current.x = -velocity.current.x;
      }

      if (rect.top + velocity.current.y < 0 || rect.bottom + velocity.current.y > window.innerHeight) {
        velocity.current.y = -velocity.current.y;
      }

      ball.style.left = rect.left + velocity.current.x + 'px';
      ball.style.top = rect.top + velocity.current.y + 'px';

      requestAnimationFrame(moveBall);
    };

    moveBall();
  }, [image]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ballRef}
      src={image}
      alt="Ball"
      style={{
        position: 'absolute',
        width: ballSize + 'px',
        height: ballSize + 'px',
        borderRadius: '50%',
        zIndex: -1, // 設置更高的 zIndex
      }}
    />
  );
};

interface BouncingBallProps {
  ethAddress: string;
}

const BouncingBall: React.FC<BouncingBallProps> = ({ ethAddress }) => {
  const { nfts } = useNFT(ethAddress);
  return (
    <>
      {nfts && nfts.map((nft: nftsData) => (
        <Ball key={nft.id} image={nft.image_preview_url} id={0} />
      ))}
    </>
  );
};


export default BouncingBall;