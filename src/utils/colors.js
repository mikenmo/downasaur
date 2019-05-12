export const cvtColor = (r, g, b) => [r / 255, g / 255, b / 255, 1];

export const Color = {
  WHITE: cvtColor(255, 255, 255),
  BLACK: cvtColor(25, 25, 25),

  GREEN: cvtColor(22, 160, 133),
  BLUE: cvtColor(52, 152, 219),
  VIOLET: cvtColor(142, 68, 173),
  GRAY: cvtColor(52, 73, 94),
  YELLOW: cvtColor(241, 196, 15),
  ORANGE: cvtColor(211, 84, 0),
  RED: cvtColor(192, 57, 43),
};
