 const abrirPopup = document.getElementById('abrirPopup');
    const cerrarPopup = document.getElementById('cerrarPopup');
    const popupModal = document.getElementById('popupModal');

    abrirPopup.onclick = () => {
      popupModal.style.display = 'block';
        const ntaquilla = document.getElementById('ntaquilla').value;
        document.getElementById('AcuerdoDeUso').innerHTML=
        "Se formaliza el presente de la taquilla número " + ntaquilla +" de forma anual ,conociendo ambas partes cada uno de los puntos de la Normativa de Uso de Taquillas. Así mismo ambas partes convienen, que en caso de que se aplique, una vez pagada la señal de fianza de 5€ en concepto de donación a la Delegacion de Alumnos , se ha pagado también la cantidad de 3€ en caso de contrato semestral y 5€ en caso de contrato anual, y para quue así conste en todos los efectos que procedan firman el presente documento, siendo el mismo justificante del pago anteriormente explicado."
        ;
    };

    cerrarPopup.onclick = () => {
      popupModal.style.display = 'none';
    };

    window.onclick = (event) => {
      if (event.target == popupModal) {
        popupModal.style.display = 'none';
      }
    };
    

    const form = document.getElementById('formulario');
    var datos;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      
      function validarFormulario(formData) {
        let nombre = formData.get('nombre');
        let delega = formData.get('delega');
        let DNI = formData.get('DNI');
        let telefono = formData.get('telefono');
        let email = formData.get('email');
        let ntaquilla = formData.get('ntaquilla');

    const errores = [];
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nombre || !regexNombre.test(nombre)) {
        errores.push("el nombre no es valido.");
    }
    if (!delega || !regexNombre.test(delega)) {
        errores.push("el nombre del miembro de la delegación no es valido.");
    }

    const regexDNI = /^\d{8}[A-Za-z]$/;
    if (!DNI || !regexDNI.test(DNI)) {
        errores.push("el DNI no es valido.");
    }

    const regexTelefono = /^\d{9}$/;
    if (!telefono || !regexTelefono.test(telefono)) {
        errores.push("el teléfono no es valido.");
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !regexEmail.test(email)) {
        errores.push("el email no es valido.");
    }

    if (!ntaquilla || isNaN(ntaquilla) || parseInt(ntaquilla) < 0) {
        errores.push("la número de taquilla no es valido.");
    }

    return {
        valido: errores.length === 0,
        errores: errores
    };
}
      const resultadoComprobacion = validarFormulario(formData);
      if(resultadoComprobacion.valido)
      {
        datos = {
        nombre: formData.get('nombre'),
        delega: formData.get('delega'),
        DNI: formData.get('DNI'),
        telefono: formData.get('telefono'),
        email: formData.get('email'),
        ntaquilla: formData.get('ntaquilla')
        
      };
      }else{
        window.alert('❌ Error al introducir datos ' + resultadoComprobacion.errores);
      }
      

      try {
  const verificar = await fetch('http://localhost:2000/existe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const existe = await verificar.json();

  if (existe.yaExiste) {
    window.alert('⚠️ Los datos ya existen en la base de datos.');
    return;
  }
  const respuesta = await fetch('http://localhost:2000/guardar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  if (respuesta.ok) {
    window.alert('✅ Datos guardados correctamente');
    form.reset(); 
  } else {
    const errorText = await respuesta.text();
    window.alert('❌ Error al guardar los datos: ' + errorText);
  }

} catch (error) {
  window.alert('❌ Error de conexión');
}

    });