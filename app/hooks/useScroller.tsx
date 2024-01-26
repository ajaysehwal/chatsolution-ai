"use client";
export const UseScroller = () => {
 const handleScroll = (targetPosition: number) => {
    const start = window.scrollY || window.pageYOffset;
    const target = Math.max(0, Math.min(targetPosition, document.documentElement.scrollHeight - window.innerHeight));
    const distance = Math.abs(target - start);

    const duration = Math.min(3000, Math.sqrt(distance) * 20); // Adjust the multiplier as needed

    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const scroll = () => {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, (now - startTime) / duration);
      const easing = (time: number) => time ** 3; // Cubic easing

      window.scrollTo(0, start + (target - start) * easing(time));

      if (time < 1) requestAnimationFrame(scroll);
    };

    scroll();
  };
  return { handleScroll };
};
