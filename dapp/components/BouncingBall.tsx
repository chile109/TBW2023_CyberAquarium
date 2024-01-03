import React, { useEffect, useRef } from 'react';

const Ball = () => {
  const ballSize = 20;
  const velocity = { x: 1, y: 1 };

  const ballRef = useRef(null);

  useEffect(() => {
    const ball = ballRef.current;

    const moveBall = () => {
      const rect = ball.getBoundingClientRect();

      if (
        rect.left + velocity.x < 0 ||
        rect.right + velocity.x > window.innerWidth
      ) {
        velocity.x = -velocity.x;
      }

      if (
        rect.top + velocity.y < 0 ||
        rect.bottom + velocity.y > window.innerHeight
      ) {
        velocity.y = -velocity.y;
      }

      ball.style.left = rect.left + velocity.x + 'px';
      ball.style.top = rect.top + velocity.y + 'px';

      requestAnimationFrame(moveBall);
    };

    moveBall();
  }, []);

  return (
    <div
      ref={ballRef}
      style={{
        position: 'absolute',
        width: ballSize + 'px',
        height: ballSize + 'px',
        backgroundColor: 'red',
        borderRadius: '50%',
      }}
    ></div>
  );
};

export default Ball;
