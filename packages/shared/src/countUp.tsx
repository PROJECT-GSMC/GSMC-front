import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  delay?: number;
  duration?: number;
  className?: string;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

const CountUp = ({
  to,
  from = 0,
  delay = 0,
  duration = 2000,
  className = "",
  separator = "",
  onStart,
  onEnd,
}: CountUpProps) => {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const startAnimation = () => {
      if (onStart) onStart();

      const startTime = Date.now();
      const startValue = from;
      const endValue = to;
      const change = endValue - startValue;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = easeOutQuart(progress);
        const currentValue = Math.round(startValue + change * easedProgress);

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          if (onEnd) onEnd();
        }
      };

      requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startAnimation, delay);
    return () => { clearTimeout(timeoutId); };
  }, [from, to, duration, delay, onStart, onEnd]);

  const formatNumber = (num: number) => {
    if (separator) {
      return num.toLocaleString('ko-KR');
    }
    return num.toString();
  };

  return (
    <span className={className} ref={ref}>
      {formatNumber(count)}점
    </span>
  );
}

export default CountUp;