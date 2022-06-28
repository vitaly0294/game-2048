/* eslint-disable max-len */
export const buildAnimate = ({duration, draw, timing}) => {
  const start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction changes 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculating the current state of the animation
    const progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

export const createAnimateMove = (baseAnimationTime, i, j, diffCell, direction) => {
  const tilePosition = document.querySelector(`.tile-position-${i}-${j}`);
  const duration = Math.abs(diffCell) * baseAnimationTime;

  buildAnimate({
    duration: duration,
    timing: function circ(timeFraction) {
      return 1 - Math.sin(Math.acos(timeFraction));
    },
    draw: function(progress) {
      if (direction === 'left' || direction === 'right') {
        tilePosition.style.transform = `translate(${(j + progress * diffCell) * 115}px, ${115 * i}px)`;
      }

      if (direction === 'up' || direction === 'down') {
        tilePosition.style.transform = `translate(${115 * j}px, ${(i + progress * diffCell) * 115}px)`;
      }
    }
  });
};

export const createAnimateAdd = (baseAnimationTime, i, j, diffCell, direction) => {
  const tileSum = document.querySelector(`.tile-position-${i}-${j}`);
  let tileMove;

  if (direction === 'left' || direction === 'right') {
    tileMove = document.querySelector(`.tile-position-${i}-${j + diffCell}`);
  }

  if (direction === 'up' || direction === 'down') {
    tileMove = document.querySelector(`.tile-position-${i + diffCell}-${j}`);
  }
  const duration = Math.abs(diffCell) * baseAnimationTime;

  buildAnimate({
    duration: duration,
    timing: function(timeFraction) {
      return timeFraction;
    },
    draw: function(progress) {
      if (direction === 'left' || direction === 'right') {
        tileSum.style.transform = `translate(${(j + progress * diffCell) * 115}px, ${115 * i}px)`;
        tileMove.style.transform = `translate(${(j + diffCell) * 115}px, ${i * 115}px) scale(${1 + progress * 0.1})`;

        if (progress === 1) {
          buildAnimate({
            duration: duration,
            timing: function(timeFraction) {
              return timeFraction;
            },
            draw: function(progress) {
              tileMove.style.transform = `translate(${(j + diffCell) * 115}px, ${i * 115}px) scale(${1.1 - progress * 0.1})`;
            }
          });
        }
      }

      if (direction === 'up' || direction === 'down') {
        tileSum.style.transform = `translate(${115 * j}px, ${(i + progress * diffCell) * 115}px)`;
        tileMove.style.transform = `translate(${j * 115}px, ${(i + diffCell) * 115}px) scale(${1 + progress * 0.1})`;

        if (progress === 1) {
          buildAnimate({
            duration: duration,
            timing: function(timeFraction) {
              return timeFraction;
            },
            draw: function(progress) {
						  tileMove.style.transform = `translate(${j * 115}px, ${(i + diffCell) * 115}px) scale(${1.1 - progress * 0.1})`;
					  }
          });
        }
      }
    }
  });
};
