import React, { useEffect, useState } from 'react';

const MouseFollower = () => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const toggleFollower = () => {
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log({ clientX, clientY });

      setPosition({ x: clientX, y: clientY });
    };

    if (isActive) {
      window.addEventListener('pointermove', handleMove);
    }

    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, [isActive]);

  return (
    <div>
      {isActive && (
        <div
          className='follower'
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        ></div>
      )}

      <button onClick={toggleFollower}>
        {isActive ? 'Desactivar' : 'Activar'} seguir el mouse
      </button>
    </div>
  );
};

export default MouseFollower;
