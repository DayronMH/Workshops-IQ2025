import * as courseAPI from 'http://127.0.0.1:3001/client/src/services/api.js';

document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
});

const courseForm = document.getElementById('courseForm');
const coursesTableBody = document.getElementById('coursesTableBody');
const resultDiv = document.getElementById('result');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

async function loadCourses() {
    try {
        showLoading('Cargando cursos...');
        const courses = await courseAPI.getCourses();
        renderCoursesTable(courses);
    } catch (error) {
        showMessage('Error al cargar los cursos: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

function renderCoursesTable(courses) {
    coursesTableBody.innerHTML = '';

    if (courses.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="4" class="empty-message">No hay cursos registrados</td>';
        coursesTableBody.appendChild(emptyRow);
        return;
    }

    courses.forEach(course => {
        const id = course._id;
        console.log(id);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.credits}</td>
            <td class="actions">
                <button class="btn-edit" onclick="editCourse('${id}')">Editar</button>
                <button class="btn-delete" onclick="confirmDeleteCourse('${id}')">Eliminar</button>
            </td>
        `;
        coursesTableBody.appendChild(row);
    });
}

courseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const courseId = courseForm.dataset.id;
    const courseData = {
        name: document.getElementById('name').value.trim(),
        credits: parseInt(document.getElementById('credits').value)
    };

    if (!courseData.name || isNaN(courseData.credits)) {
        showMessage('Por favor, complete todos los campos correctamente', 'error');
        return;
    }

    try {
        showLoading(courseId ? 'Actualizando curso...' : 'Creando curso...');

        if (courseId) {
            await courseAPI.updateCourse(courseId, courseData);
            showMessage('Curso actualizado con éxito', 'success');
        } else {
            await courseAPI.createCourse(courseData);
            showMessage('Curso creado con éxito', 'success');
        }

        resetForm();
        loadCourses();
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
});

window.editCourse = async (id) => {
    try {
        showLoading('Cargando datos del curso...');
        const courses = await courseAPI.getCourses();
        const course = courses.find(c => c._id === id);

        if (course) {
            document.getElementById('name').value = course.name;
            document.getElementById('credits').value = course.credits;
            courseForm.dataset.id = id;
            submitBtn.textContent = 'Actualizar Curso';
            cancelBtn.style.display = 'inline-block';
            courseForm.scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        showMessage('Error al cargar los datos del curso: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
};

window.cancelEdit = () => {
    resetForm();
};

function resetForm() {
    courseForm.reset();
    courseForm.removeAttribute('data-id');
    submitBtn.textContent = 'Crear Curso';
    cancelBtn.style.display = 'none';
}

window.confirmDeleteCourse = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
        deleteCourse(id);
    }
};

async function deleteCourse(id) {
    try {
        showLoading('Eliminando curso...');
        await courseAPI.deleteCourse(id);
        showMessage('Curso eliminado con éxito', 'success');
        loadCourses();
    } catch (error) {
        showMessage('Error al eliminar el curso: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
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