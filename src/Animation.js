export const pageSlide = {
  show: {
    x: "100vw",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    x: "100vw",
    opacity: 0,
  },
};
export const pageSlideLeft = {
  show: {
    x: "-100vw",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    x: "-100vw",
    opacity: 0,

    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};
export const slideUp = {
  show: {
    y: "20vh",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    y: "20vh",
    opacity: 0,
  },
};
