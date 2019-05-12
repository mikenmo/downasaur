#version 300 es

precision mediump float;

uniform sampler2D u_sampler;
in vec2 v_uv_coord;

// in vec4 v_color; // remove
out vec4 outColor;

void main() {
  // outColor = v_color;
  outColor = texture(u_sampler, v_uv_coord);// * v_color;
}
