export const containerObserverAnimation = {
  offscreen: {},
  onscreen: {
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

export const appear = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
    y: 0,
  },
};

export const appearTop = {
  offscreen: {
    opacity: 0,
    y: 20,
  },
  onscreen: {
    opacity: 1,
    y: 0,
  },
};

export const gridImage = {
  offscreen: {
    translateX: "-100%",
  },
  onscreen: {
    translateX: ["-100%", "0%", "100%"],
    transition: {
      duration: 1,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      delay: 0.2,
    },
  },
};
