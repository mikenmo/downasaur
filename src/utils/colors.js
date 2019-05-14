export const cvtColor = (r, g, b) => [r / 255, g / 255, b / 255, 1];
export const cvtColorObj = ({ r, g, b }) => cvtColor(r, g, b).slice(0, 3);

export const Color = {
  WHITE: cvtColor(255, 255, 255),
  BLACK: cvtColor(0, 0, 0),

  BROWN: cvtColor(74, 41, 32),
  SOIL: cvtColor(230, 224, 170),
  GREEN: cvtColor(8, 57, 14),
};

export const Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0
};

export const addVertexColoring = (vertices, colors) => {
  return vertices.reduce((data, vertex, i) => {
    data.push(vertex);
    if (i % 3 === 2) {
      data.push(...colors[Math.floor(i / 3)]);
    }

    return data;
  }, []);
}
