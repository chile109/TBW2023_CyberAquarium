import React, { useState, useEffect, useCallback } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [calculateTimeLeft, timeLeft]); // 添加 timeLeft 到依赖项

  return (
    <div className="sidebar-box-list-item-text sidebar-box-list-item-text-blue sidebar-box-list-item-buy-lgNum">
      <div className="sidebar-box-list-item-edit">
        <div className="sidebar-box-list-item-edit-rowline">
          {timeLeft.days}
          <span className="sidebar-box-list-item-edit-rowline-text">Ｄ</span>
          {timeLeft.hours}
          <span className="sidebar-box-list-item-edit-rowline-text">Ｈ</span>
          {timeLeft.minutes}
          <span className="sidebar-box-list-item-edit-rowline-text">Ｍ</span>
          {timeLeft.seconds}
          <span className="sidebar-box-list-item-edit-rowline-text">S</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
