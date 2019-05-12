#version 300 es

in vec3 a_position;
in vec2 a_uv_coord;

// in vec4 a_normal; // remove

uniform mat4 u_model_matrix;
uniform mat4 u_view_matrix;
uniform mat4 u_projection_matrix;
uniform mat4 u_normal_matrix;   

// uniform vec3 u_light_direction; 
// uniform vec3 u_eye_position;

// // light color properties
// uniform vec3 u_light_ambient;
// uniform vec3 u_light_diffuse;
// uniform vec3 u_light_specular;

// // material color properties
// uniform vec3 u_material_ambient;
// uniform vec3 u_material_diffuse;
// uniform vec3 u_material_specular;
// uniform float u_shininess;

// out vec4 v_color; // remove
out vec2 v_uv_coord;

void main() {
  gl_PointSize = 9.0;
  vec4 transformed_position = u_model_matrix * vec4(a_position, 1.0);
  gl_Position = transformed_position;// * u_projection_matrix * u_view_matrix;

  // factors of the final color [set to black]
  // vec3 ambient_color = vec3(0,0,0);
  // vec3 diffuse_color = vec3(0,0,0);
  // vec3 specular_color = vec3(0,0,0);

  // // common vectors
  // vec3 corrected_a_normal = vec3(u_normal_matrix * a_normal);
  // vec3 normalized_a_normal = normalize(corrected_a_normal);
  // vec3 normalized_u_light_direction = normalize(u_light_direction);
  
  // ambient_color = u_light_ambient * u_material_ambient;

  // float lambert_coefficient = dot(-normalized_u_light_direction, normalized_a_normal);
  // lambert_coefficient = max(lambert_coefficient, 0.0);

  // diffuse_color = u_light_diffuse * u_material_diffuse * lambert_coefficient;

  // // compute vectors needed for specular color
  // vec3 reflect_direction = reflect(normalized_u_light_direction, normalized_a_normal);
  // vec3 normalized_reflect_direction = normalize(reflect_direction);
  // vec3 eye_direction = u_eye_position - vec3(transformed_position);
  // vec3 normalized_eye_direction = normalize(eye_direction);

  // float specular_coefficient = dot(-normalized_reflect_direction, normalized_eye_direction);
  // specular_coefficient = max(specular_coefficient, 0.0);
  // specular_coefficient = pow(specular_coefficient, u_shininess);
  //   specular_color = u_light_specular * u_material_specular * specular_coefficient;

  // v_color = vec4(ambient_color + diffuse_color + specular_color + vec3(a_normal), 1.0); // remove
  v_uv_coord = a_uv_coord;
}
