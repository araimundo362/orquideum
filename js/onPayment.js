/****************************************************************************** */
/* Funciones Auxiliares para control de formulario */

const checkNombre = (nombre) => {
  return nombre.length > 0 ? true : false;
}

const checkDni = (dni) => {
  return (dni.length == 8 || dni.length == 7) ? true : false;
}

const checkAge = (age) => {
  return age >= 18 ? true : false;
}

const checkMail = (mail) => {
  return mail.length > 0 && (mail.includes('@hotmail.com') || mail.includes('@gmail.com') || mail.includes('@yahoo.com.ar')) ? true : false; 
}

const checkPayment = (payNumber) => {
  return payNumber.length == 12 || payNumber.length == 16 ? true : false;
}

const checkExpirationMonth = (month) => {
  return month.length == 2 && month > 0 && month <= 12 ? true : false;
}

const checkExpirationYear = (year) => {
  return year.length == 2 && year > 21 && year <= 50? true : false;
}

const checkForOrchid = (orq, ar) => {
  for (i=0; i < ar.length; i++) {
    if (ar[i].orq.id === orq.id) {
      return true;
    }
  }
  return false;
} 

const findOrchidIndex = (array, orq) => {
  for(let i=0; i< array.length; i++) {
    if(array[i].orq.id === orq.id) {
      return i;
    }
  }
}

const createSummary = (contenidoCarrito, total) => {
  if( contenidoCarrito.length <= 0) {
    return;
  }

  let orderedCarrier = [];

  for(let i=0; i< contenidoCarrito.length ; i++) {
    if (checkForOrchid(contenidoCarrito[i] ,orderedCarrier )){          // Me fijo si la planta ya fue agregada al nuevo arreglo
      let index = findOrchidIndex(orderedCarrier, contenidoCarrito[i]); //Obtengo el indice de la planta en el nuevo arreglo
      orderedCarrier[index].cant ++;                                    // Sumo una planta mas
    } else {
      orderedCarrier.push({orq: contenidoCarrito[i], cant: 1});
    }
  }

  let content = ``;
  for(let i=0; i < orderedCarrier.length; i++) {
    content += `
    <div class="summaryContainer__item">
      <span class="summaryContainer__price">$${orderedCarrier[i].orq.precio * orderedCarrier[i].cant}</span>
      <p class="summaryContainer__item__cantidad">${orderedCarrier[i].cant}x</p>
      <p class="summaryContainer__item__genero">${orderedCarrier[i].orq.genero}</p>
      <p class="summaryContainer__item__especie">${orderedCarrier[i].orq.especie}</p>
    </div>
    `
  }

  let summary = `
      <div class="summaryContainer__products">
        <h3 class="summaryContainer__title">Orden de compra</h3>
        ${content}
        <div class="summaryContainer__total">Total<span class="summaryContainer__price">$${total}</span></div>
    `
    $('#sumario').html(summary);
}

/****************************************************************************** */

$(document).ready( () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')).contentList;
    let total = 0;
    for( let i=0; i < carrito.length ; i++) {
        total += carrito[i].precio
      }

    createSummary(carrito, total);
})

$('#submitButton').click( () => {
  let nombre = $('#inputName').val();
  let doc = $('#inputDni').val();
  let age = $('#inputAge').val();
  let mail = $('#inputEmail').val();
  let phone = $('#inputPhone').val(); 
  let tarjeta = $('#selectPayment').val();
  let num = $('#inputPayNumber').val();
  let expirationMonth = $('#inputMonth').val();
  let expirationYear = $('#inputYear').val();

  if (checkNombre(nombre) && checkAge(age) && checkDni(doc) && checkMail(mail) && checkPayment(num) && checkExpirationMonth(expirationMonth) && checkExpirationYear(expirationYear)) {
    let success = `
            <div>
                <p style="color: blue; font-size: 20px; margin: 0"> La compra fue confirmada! </p>
            </div>
        `
        $('#successMessage').html(success);
        window.localStorage.removeItem('carrito')
  } else {
    if (!checkNombre(nombre)) {
      $('#inputName').css("border-color", "red");
            let nameError = `
            <div>
                <p style="color: red; font-size: 10px; margin-bottom: 0 !important">Por favor, ingrese su nombre</p>
            </div>
        `
        $('#nameErrorAlert').html(nameError);
    };
    if (!checkAge(age)) {
      $('#inputAge').css("border-color", "red");
      let ageError = `
      <div>
        <p style="color: red; font-size: 10px; margin-bottom: 0 !important">Por favor, ingrese su Edad</p>
      </div>
      `
      $('#ageErrorAlert').html(ageError);
    }
    if(!checkMail(mail)) {
      $('#inputEmail').css("border-color", "red");
      let mailError = `
      <div>
        <p style="color: red; font-size: 10px; margin-bottom: 0 !important">Por favor, ingrese su email</p>
      </div>
      `
      $('#mailErrorAlert').html(mailError);
    }
    if(!checkDni(doc)) {
      $('#inputDni').css("border-color", "red");
      let dniError = `
      <div>
        <p style="color: red; font-size: 10px; margin-bottom: 0 !important">Por favor, ingrese su documento</p>
      </div>
      `
      $('#dniErrorAlert').html(dniError);
    }
    if(!checkPayment(num)) {
      $('#inputPayNumber').css("border-color", "red");
      let paymentNumError = `
      <div>
        <p style="color: red; font-size: 10px; margin-bottom: 0 !important">Por favor, ingrese el numero de tarjeta</p>
      </div>
      `
      $('#payNumberErrorAlert').html(paymentNumError);
    }
    if(!checkExpirationMonth(expirationMonth)) {
      $('#inputMonth').css("border-color", "red");
      let monthError = `
      <div>
        <p style="color: red; font-size: 10px; margin-bottom: 0 !important">Por favor, complete este campo</p>
      </div>
      `
      $('#monthErrorAlert').html(monthError);
    }
    if(!checkExpirationYear(expirationYear)) {
      $('#inputYear').css("border-color", "red");
      let yearError = `
      <div>
        <p style="color: red; font-size: 10px; margin-bottom: 0 !important">Por favor, complete este campo</p>
      </div>
      `
      $('#yearErrorAlert').html(yearError);
    }
  }
})