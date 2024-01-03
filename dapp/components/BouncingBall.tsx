import React, { useEffect, useRef } from 'react';

const Ball = ({ image }) => {
  const ballSize = 100;
  const initialVelocity = { x: 1 * (Math.random() - 0.5), y: 0.5 * (Math.random() - 0.5) }; // 初始速度隨機
  const velocity = useRef(initialVelocity);

  const ballRef = useRef(null);

  useEffect(() => {
    const ball = ballRef.current;

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
  }, []);

  return (
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

export default Ball;
