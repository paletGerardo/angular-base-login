export const items = [
  {
    position: 0,
    el: document.getElementById('carousel-item-1'),
  },
  {
    position: 1,
    el: document.getElementById('carousel-item-2'),
  },
  {
    position: 2,
    el: document.getElementById('carousel-item-3'),
  },
];

export const options = {
  activeItemPosition: 1,
  interval: 3000,

  indicators: {
    activeClasses: 'bg-white dark:bg-gray-800',
    inactiveClasses:
      'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
    items: [
      {
        position: 0,
        el: document.getElementById('carousel-indicator-1'),
      },
      {
        position: 1,
        el: document.getElementById('carousel-indicator-2'),
      },
      {
        position: 2,
        el: document.getElementById('carousel-indicator-3'),
      },
    ],
  },

  // callback functions
  onNext: () => {
    if (options.activeItemPosition < items.length - 1) {
      options.activeItemPosition++;
    } else {
      options.activeItemPosition = 0;
    }
  },
  onPrev: () => {
    if (options.activeItemPosition > 0) {
      options.activeItemPosition--;
    } else {
      options.activeItemPosition = items.length - 1;
    }
  },
};
