import { useEffect, useRef, useCallback } from "react";

export function useCursorScroll(sectionRef: React.RefObject<HTMLElement | null>) {
  const state = useRef({
    cursorX: 0.5,
    cursorY: 0.5,
    targetCursorX: 0.5,
    targetCursorY: 0.5,
    scrollProgress: 0, // 0 (top) to 1 (scrolled past hero)
    inView: true,
    isReducedMotion: false,
  });

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    state.current.isReducedMotion = mediaQuery.matches;
    const handleMediaChange = (e: MediaQueryListEvent) => {
      state.current.isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      state.current.targetCursorX = e.clientX / window.innerWidth;
      state.current.targetCursorY = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Track scroll & visibility
    const handleScroll = () => {
      if (!sectionRef.current) return;

      // Calculate how far down we've scrolled relative to the section's height
      // We want scrollProgress = 0 at top, 1 when section is completely scrolled out of view.
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;

      // We assume the section starts at the top of the page.
      // If the page is scrolled such that scrollY = rect.height, progress = 1
      const progress = Math.max(0, Math.min(1, scrollY / rect.height));
      state.current.scrollProgress = progress;
      state.current.inView = progress < 1;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial call
    handleScroll();

    // Track tab visibility
    const handleVisibility = () => {
      if (document.hidden) {
        state.current.inView = false;
      } else {
        handleScroll(); // recheck bounds
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [sectionRef]);

  // Expose a method to get the latest smoothed state for the animation loop
  const getUpdate = useCallback((lerpFactor: number = 0.05) => {
    // Lerp cursor
    state.current.cursorX += (state.current.targetCursorX - state.current.cursorX) * lerpFactor;
    state.current.cursorY += (state.current.targetCursorY - state.current.cursorY) * lerpFactor;

    return state.current;
  }, []);

  return { getUpdate };
}
