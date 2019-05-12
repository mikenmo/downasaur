#version 300 es

in vec4 a_position;
uniform mat4 u_model_matrix;
uniform mat4 u_view_matrix;

void main() {
  gl_Position = a_position * u_model_matrix * u_view_matrix;
}
