const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const getTeachers = async () => {
  const response = await api.get('/getTeachers');
  return response.data;
  } 
  

export const createTeacher = async (teacherData) => {
  try {
    const response = await api.post('/createTeacher', teacherData);
    return response.data;
  } catch (error) {
    console.error('Error creando el profesor:', error);
    throw error;
  }
};

export const updateTeacher = async (id, teacherData) => {
  try {
    const response = await api.put(`/updateTeacher/${id}`, teacherData);
    return response.data;
  } catch (error) {
    console.error('Error actualizando el profesor:', error);
    throw error;
  }
};

export const deleteTeacher = async (id) => {
  try {
    const response = await api.delete(`/deleteTeacher/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando el profesor:', error);
    throw error;
  }
};

export const getCourses = async () => {
  try {
    const response = await api.get('/getCourses');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los cursos:', error);
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await api.post('/createCourse', courseData);
    return response.data;
  } catch (error) {
    console.error('Error creando el curso:', error);
    throw error;
  }
};


export const updateCourse = async (id, courseData) => {
  try {
    const response = await api.put(`/updateCourse/${id}`, courseData);
    return response.data;
  } catch (error) {
    console.error('Error actualizando el curso:', error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`/deletecourse/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando el curso:', error);
    throw error;
  }
};
export const getEnrollments = async () => {
  try {
    const response = await api.get('/getEnrollments');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo matriculas', error);
    throw error;
  }
};
export const createEnrollment = async (enrollmentData) => {
  try {
    const response = await api.post('/createEnrollment', enrollmentData);
    return response.data;
  } catch (error) {
    console.error('Error creando la matricula:', error);
    throw error;
  }
};
export const deleteEnrollment = async (id) => {
  try {
    const response = await api.delete(`/deleteEnrollment/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando la matricula:', error);
    throw error;
  }
};
export const updateEnrollment = async (id, enrollmentData) => {
  try {
    const response = await api.put(`/updateEnrollment/${id}`, enrollmentData);
    return response.data;
  } catch (error) {
    console.error('Error actualizando la matricula:', error);
    throw error;
  }
};



