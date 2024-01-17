import React, { useState } from 'react';

const SidebarFishShop = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebarFishShop-container">
      <input
        type="checkbox"
        id="side-fishShop"
        className="sidebar-inputSide"
        checked={isOpen}
        onChange={handleClick}
      />
      <label htmlFor="side-fishShop" className="sidebarFishShop bgset">
      </label>
      <label htmlFor="side-fishShop" className="sidebarFishShop-close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="sidebar-box-close-icon bi bi-x-lg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </label>
    </div>
  );
};

export default SidebarFishShop;
