const getAttribPointers = (gl, program) => ({
  A_POSITION: gl.getAttribLocation(program, 'a_position'),
  A_UV_COORD: gl.getAttribLocation(program, 'a_uv_coord'),
  A_NORMAL: gl.getAttribLocation(program, 'a_normal'),

  U_MODEL_MATRIX: gl.getUniformLocation(program, 'u_model_matrix'),
  U_VIEW_MATRIX: gl.getUniformLocation(program, 'u_view_matrix'),
  U_PROJ_MATRIX: gl.getUniformLocation(program, 'u_projection_matrix'),
  U_NORMAL_MATRIX: gl.getUniformLocation(program, 'u_normal_matrix'),

  U_LIGHT_DIRECTION: gl.getUniformLocation(program, 'u_light_direction'),
  U_EYE_POSITION: gl.getUniformLocation(program, 'u_eye_position'),

  U_LIGHT_AMBIENT: gl.getUniformLocation(program, 'u_light_ambient'),
  U_LIGHT_DIFFUSE: gl.getUniformLocation(program, 'u_light_diffuse'),
  U_LIGHT_SPECULAR: gl.getUniformLocation(program, 'u_light_specular'),

  U_MATERIAL_AMBIENT: gl.getUniformLocation(program, 'u_material_ambient'),
  U_MATERIAL_DIFFUSE: gl.getUniformLocation(program, 'u_material_diffuse'),
  U_MATERIAL_SPECULAR: gl.getUniformLocation(program, 'u_material_specular'),
  U_SHININESS: gl.getUniformLocation(program, 'u_shininess'),

  U_SAMPLE: gl.getUniformLocation(program, 'u_sampler'),
});

export default getAttribPointers;
