// Cambia la URL del servidor a la que estés utilizando
const API_URL = ''https://juanzumaxl.github.io/coreju/'';

function submitRegistration() {
    var fullName = document.getElementById("fullName").value;
    var location = document.getElementById("location").value;
    var roomNumber = document.getElementById("roomNumber").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var email = document.getElementById("email").value;

    var registrationData = {
        fullName: fullName,
        location: location,
        roomNumber: roomNumber,
        phoneNumber: phoneNumber,
        email: email
    };

    // Realizar una solicitud POST al servidor para registrar el participante
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadRegisteredParticipants(); // Actualizar la lista después de registrar
        })
        .catch(error => {
            console.error('Error al registrar participante:', error);
            alert('Error al registrar participante. Consulta la consola para más detalles.');
        });

    // Limpiar los campos del formulario después de registrar.
    document.getElementById("registrationForm").reset();
}

function loadRegisteredParticipants() {
    // Realizar una solicitud GET al servidor para obtener la lista de participantes
    fetch(API_URL)
        .then(response => response.json())
        .then(participants => {
            var participantsTable = document.getElementById("registeredParticipants");
            participantsTable.innerHTML = ''; // Limpiar la tabla antes de volver a cargar

            participants.forEach(function (participant) {
                var row = participantsTable.insertRow();
                row.insertCell(0).innerText = participant.fullName;
                row.insertCell(1).innerText = participant.location;
                row.insertCell(2).innerText = participant.roomNumber;
                row.insertCell(3).innerText = participant.phoneNumber;
                row.insertCell(4).innerText = participant.email;
            });
        })
        .catch(error => {
            console.error('Error al obtener participantes:', error);
            alert('Error al obtener participantes. Consulta la consola para más detalles.');
        });
}

// Llama a la función para cargar los participantes cuando la página se carga.
window.onload = loadRegisteredParticipants;
