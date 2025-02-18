import * as teacherAPI from 'http://127.0.0.1:3001/client/src/services/api.js';

// Función para cargar los profesores al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    loadTeachers();
});

// Referencias a elementos del DOM
const teacherForm = document.getElementById('teacherForm');
const teachersTableBody = document.getElementById('teachersTableBody');
const resultDiv = document.getElementById('result');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Cargar profesores desde la API
async function loadTeachers() {
    try {
        showLoading('Cargando profesores...');
        const teachers = await teacherAPI.getTeachers();
        renderTeachersTable(teachers);
    } catch (error) {
        showMessage('Error al cargar los profesores: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Renderizar la tabla de profesores
function renderTeachersTable(teachers) {
    teachersTableBody.innerHTML = '';

    if (teachers.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="6" class="empty-message">No hay profesores registrados</td>';
        teachersTableBody.appendChild(emptyRow);
        return;
    }

    teachers.forEach(teacher => {
        console.log(`ID: ${teacher._id}, Nombre: ${teacher.first_name} ${teacher.last_name}, Cédula: ${teacher.cedula}, Edad: ${teacher.age}, Especialidad: ${teacher.specialty}`);
        const id = teacher._id; // Asegúrate de usar _id aquí
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${teacher.first_name}</td>
            <td>${teacher.last_name}</td>
            <td>${teacher.cedula}</td>
            <td>${teacher.age}</td>
            <td>${teacher.specialty}</td>
            <td class="actions">
                <button class="btn-edit" onclick="editTeacher('${id}')">Editar</button>
                <button class="btn-delete" onclick="confirmDeleteTeacher('${id}')">Eliminar</button>
            </td>
        `;
        teachersTableBody.appendChild(row);
    });
}

// Manejar el envío del formulario para crear/actualizar profesores
teacherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const teacherId = teacherForm.dataset.id;
    const teacherData = {
        first_name: document.getElementById('first_name').value.trim(),
        last_name: document.getElementById('last_name').value.trim(),
        cedula: document.getElementById('cedula').value.trim(),
        age: parseInt(document.getElementById('age').value),
        specialty: document.getElementById('specialty').value.trim()
    };

    // Validación básica
    if (!teacherData.first_name || !teacherData.last_name || !teacherData.cedula || 
        isNaN(teacherData.age) || !teacherData.specialty) {
        showMessage('Por favor, complete todos los campos correctamente', 'error');
        return;
    }

    try {
        showLoading(teacherId ? 'Actualizando profesor...' : 'Creando profesor...');

        if (teacherId) {
            // Actualizar profesor existente
            await teacherAPI.updateTeacher(teacherId, teacherData);
            showMessage('Profesor actualizado con éxito', 'success');
        } else {
            // Crear nuevo profesor
            await teacherAPI.createTeacher(teacherData);
            showMessage('Profesor creado con éxito', 'success');
        }

        resetForm();
        loadTeachers();
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
});

// Función para editar un profesor
window.editTeacher = async (id) => {
    try {
        showLoading('Cargando datos del profesor...');
        const teachers = await teacherAPI.getTeachers();
        const teacher = teachers.find(t => t._id === id); // Cambia t.id a t._id

        if (teacher) {
            // Llenar el formulario con los datos del profesor
            document.getElementById('first_name').value = teacher.first_name;
            document.getElementById('last_name').value = teacher.last_name;
            document.getElementById('cedula').value = teacher.cedula;
            document.getElementById('age').value = teacher.age;
            document.getElementById('specialty').value = teacher.specialty;

            // Cambiar el botón y guardar el ID para la actualización
            teacherForm.dataset.id = id;
            submitBtn.textContent = 'Actualizar Profesor';
            cancelBtn.style.display = 'inline-block';

            // Hacer scroll al formulario
            teacherForm.scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        showMessage('Error al cargar los datos del profesor: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
};

// Función para cancelar la edición
window.cancelEdit = () => {
    resetForm();
};

// Función para restablecer el formulario
function resetForm() {
    teacherForm.reset();
    teacherForm.removeAttribute('data-id');
    submitBtn.textContent = 'Crear Profesor';
    cancelBtn.style.display = 'none';
}

// Función para confirmar eliminación
window.confirmDeleteTeacher = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este profesor?')) {
        deleteTeacher(id);
    }
};

// Función para eliminar un profesor
async function deleteTeacher(id) {
    try {
        showLoading('Eliminando profesor...');
        await teacherAPI.deleteTeacher(id);
        showMessage('Profesor eliminado con éxito', 'success');
        loadTeachers();
    } catch (error) {
        showMessage('Error al eliminar el profesor: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Función para mostrar mensajes de éxito o error
function showMessage(message, type) {
    resultDiv.textContent = message;
    resultDiv.className = `message ${type}`;

    // Limpiar el mensaje después de 3 segundos
    setTimeout(() => {
        resultDiv.textContent = '';
        resultDiv.className = 'message';
    }, 3000);
}

// Función para mostrar indicador de carga
function showLoading(message = 'Cargando...') {
    resultDiv.textContent = message;
    resultDiv.className = 'message loading';
}

// Función para ocultar indicador de carga
function hideLoading() {
    resultDiv.textContent = '';
    resultDiv.className = 'message';
}