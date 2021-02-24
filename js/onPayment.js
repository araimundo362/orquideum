
import { Utils } from './utils'

let utils = new Utils();

$(document).ready( () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')).contentList;
    let total = 0;
    for( let i=0; i < carrito.length ; i++) {
        total += carrito[i].precio
      }

    let content = ``;
    for(let i=0; i < carrito.length; i++) {
      content += `
      <div class="summaryContainer__item">
        <span class="summaryContainer__price">$${carrito[i].precio}</span>
        <p class="summaryContainer__item__genero">${carrito[i].genero}</p>
        <p class="summaryContainer__item__especie">${carrito[i].especie}</p>
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
  console.log('nombre', nombre);
  console.log('doc', doc)
  console.log('age',age)
  console.log('mail', mail)
  console.log('phone', phone)
  console.log('tarjeta', tarjeta)
  console.log('num', num)
  console.log('expMonth',expirationMonth)
  console.log('expYear', expirationYear)

  if (utils.checkNombre(nombre) && utils.checkAge(age) && utils.checkDni(doc) && utils.checkMail(mail) && utils.checkPayment(num) && utils.checkExpirationMonth(month) && utils.checkExpirationYear(year)) {
    let success = `
            <div>
                <p style="color: blue"; font-size: 20px; margin: 0"> La compra fue confirmada! </p>
            </div>
        `
        $('#succesMessage').html(success);
  } else {
    if (!checkNombre(nombre)) {
      $('#inputName').css("border-color", "red");
            let nameError = `
            <div>
                <p style="color: red"; font-size: 5px; margin: 0 !important">Por favor, ingrese su nombre</p>
            </div>
        `
        $('#nameErrorAlert').html(nameError);
    };
    if (!checkAge(age)) {
      $('#inputAge').css("border-color", "red");
      let ageError = `
      <div>
        <p style="color: red"; font-size: 5px; margin: 0 !important">Por favor, ingrese su nombre</p>
      </div>
      `
      $('#ageErrorAlert').html(ageError);
    }
    if(!checkMail(mail)) {
      $('#inputMail').css("border-color", "red");
      let mailError = `
      <div>
        <p style="color: red"; font-size: 5px; margin: 0 !important">Por favor, ingrese su nombre</p>
      </div>
      `
      $('#mailErrorAlert').html(mailError);
    }
    if(!checkDni(doc)) {
      $('#inputDoc').css("border-color", "red");
      let dniError = `
      <div>
        <p style="color: red"; font-size: 5px; margin: 0 !important">Por favor, ingrese su nombre</p>
      </div>
      `
      $('#dniErrorAlert').html(dniError);
    }
  }
})