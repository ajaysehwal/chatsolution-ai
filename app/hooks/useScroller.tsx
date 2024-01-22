"use client";
export const UseScroller = () => {
 
    const handleScroll = (targetPosition :number, duration:number) => {
      const start = window.scrollY || window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const scroll = () => {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, (now - startTime) / duration);
      const easing = (time:number) => time * (2 - time);

      window.scrollTo(0, start + (targetPosition - start) * easing(time));

      if (time < 1) requestAnimationFrame(scroll);
    };

    scroll();
      };

  return { handleScroll };
};
