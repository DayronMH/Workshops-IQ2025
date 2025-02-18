import * as api from 'http://127.0.0.1:3001/client/src/services/api.js';

document.addEventListener('DOMContentLoaded', () => {
    loadEnrollments();
    loadCourses();
});

const enrollmentForm = document.getElementById('enrollmentForm');
const enrollmentsTableBody = document.getElementById('enrollmentsTableBody');
const resultDiv = document.getElementById('result');
const submitBtn = document.getElementById('submit');
const cancelBtn = document.getElementById('cancelBtn');
const courseSelect = document.getElementById('course');
const teacherSelect = document.getElementById('teacher');

async function loadEnrollments() {
    try {
        showLoading('Cargando matrículas...');
        const enrollments = await api.getEnrollments();
        renderEnrollmentsTable(enrollments);
    } catch (error) {
        showMessage('Error al cargar las matrículas: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

async function loadCourses() {
    try {
        const courses = await api.getCourses();
        courseSelect.innerHTML = '<option value="">Seleccione un curso</option>';
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course._id;
            option.textContent = course.name;
            courseSelect.appendChild(option);
        });
    } catch (error) {
        showMessage('Error al cargar cursos', 'error');
    }
}

courseSelect.addEventListener('change', async () => {
    const selectedCourseId = courseSelect.value;
    teacherSelect.innerHTML = '<option value="">Seleccione un profesor</option>';
    if (!selectedCourseId) return;

    try {
        const teachers = await api.getTeachers();
        const selectedCourse = await api.getCourses().then(courses => courses.find(course => course._id === selectedCourseId));
        if (!selectedCourse) return;

        const filteredTeachers = teachers.filter(t => t.specialty === selectedCourse.name);

        filteredTeachers.forEach(teacher => {
            const option = document.createElement('option');
            option.value = teacher._id;
            option.textContent = `${teacher.first_name} ${teacher.last_name}`;
            teacherSelect.appendChild(option);
        });

        if (filteredTeachers.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No hay profesores disponibles';
            teacherSelect.appendChild(option);
        }
    } catch (error) {
        showMessage('Error al cargar profesores', 'error');
    }
});

enrollmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const enrollmentId = enrollmentForm.dataset.id;
    const enrollmentData = {
        student: document.getElementById('student').value.trim(),
        course: courseSelect.value,
        teacher: teacherSelect.value
    };
    if (!enrollmentData.student || !enrollmentData.course || !enrollmentData.teacher) {
        showMessage('Por favor, complete todos los campos', 'error');
        return;
    }
    try {
        showLoading(enrollmentId ? 'Actualizando...' : 'Creando...');
        if (enrollmentId) {
            await api.updateEnrollment(enrollmentId, enrollmentData);
            showMessage('Matrícula actualizada con éxito', 'success');
        } else {
            await api.createEnrollment(enrollmentData);
            showMessage('Matrícula creada con éxito', 'success');
        }
        resetForm();
        loadEnrollments();
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
});

window.editEnrollment = async (id) => {
    try {
        showLoading('Cargando datos...');
        const enrollments = await api.getEnrollments();
        const enrollment = enrollments.find(e => e._id === id);
        if (enrollment) {
            document.getElementById('student').value = enrollment.student;
            courseSelect.value = enrollment.course._id;
            await courseSelect.dispatchEvent(new Event('change'));
            teacherSelect.value = enrollment.teacher._id;
            enrollmentForm.dataset.id = id;
            submitBtn.textContent = 'Actualizar Matrícula';
            cancelBtn.style.display = 'inline-block';
            enrollmentForm.scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        showMessage('Error al cargar la matrícula', 'error');
    } finally {
        hideLoading();
    }
};

window.confirmDeleteEnrollment = (id) => {
    if (confirm('¿Eliminar esta matrícula?')) {
        deleteEnrollment(id);
    }
};

async function deleteEnrollment(id) {
    try {
        showLoading('Eliminando...');
        await api.deleteEnrollment(id);
        showMessage('Matrícula eliminada', 'success');
        loadEnrollments();
    } catch (error) {
        showMessage('Error al eliminar: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

function renderEnrollmentsTable(enrollments) {
    enrollmentsTableBody.innerHTML = '';
    if (enrollments.length === 0) {
        enrollmentsTableBody.innerHTML = '<tr><td colspan="4">No hay matrículas registradas</td></tr>';
        return;
    }
    enrollments.forEach(enrollment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${enrollment.student}</td>
            <td>${enrollment.course.name}</td>
            <td>${enrollment.teacher.first_name} ${enrollment.teacher.last_name}</td>
            <td>
                <button onclick="editEnrollment('${enrollment._id}')">Editar</button>
                <button onclick="confirmDeleteEnrollment('${enrollment._id}')">Eliminar</button>
            </td>
        `;
        enrollmentsTableBody.appendChild(row);
    });
}

function resetForm() {
    enrollmentForm.reset();
    enrollmentForm.removeAttribute('data-id');
    submitBtn.textContent = 'Crear Matrícula';
    cancelBtn.style.display = 'none';
}

function showMessage(message, type) {
    resultDiv.textContent = message;
    resultDiv.className = `message ${type}`;
    setTimeout(() => {
        resultDiv.textContent = '';
        resultDiv.className = 'message';
    }, 3000);
}

function showLoading(message = 'Cargando...') {
    resultDiv.textContent = message;
    resultDiv.className = 'message loading';
}

function hideLoading() {
    resultDiv.textContent = '';
    resultDiv.className = 'message';
}
