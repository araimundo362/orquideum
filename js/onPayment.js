
// TODO: Integrar mercado Pago. Y hacer un ajax con las tarjetas 

/*const mercadopago = require ('mercadopago');
mercadopago.configure({
  access_token: 'PROD_ACCESS_TOKEN'
});

let preference = {
  items: [
    {
      title: 'Mi producto',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

mercadopago.preferences.create(preference)
.then(function(response){
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
  global.id = response.body.id;
}).catch(function(error){
  console.log(error);
});*/

/****************************************************************************** */
/* Funciones Auxiliares para control de formulario */

const checkNombre = (nombre) => {
  return nombre.length > 0 ? true : false;
}

const checkDni = (dni) => {
  switch (dni.length) {
    case 0:
      return 'Debe completar este campo para completar la compra';
    case 7:
      return 'OK';
    case 8:
      return 'OK';
    default: 
      return 'Numero de documento invalido'
  }
}

const checkAge = (age) => {
  return age >= 18 ? true : false;
}

const checkMail = (mail) => {
  if (mail.length === 0) {
    return 'Debe completar este campo para completar la compra';
  } else {
    return (mail.includes('@hotmail.com') || mail.includes('@gmail.com') || mail.includes('@yahoo.com.ar')) ? 'OK' : 'Direccion de correo invalida';
  } 
}

const checkPayment = (payNumber) => {
  console.log('payment check', payNumber);
  switch (payNumber.length) {
    case 0:
      return 'Debe completar este campo para completar la compra';
    case 12:
      return 'OK';
    case 16: 
      return 'OK';
    default: 
      return 'Numero de tarjeta invalido';
  }
}

const checkExpirationMonth = (month) => {
  if (month > 0 && month <= 12) {
    return 'OK';
  } else {
    return month == 0 ? 'Debe completar este campo para completar la compra' : 'Por favor ingrese un mes correcto.'
  }
}

const checkExpirationYear = (year) => {
  if (year > 20 && year <= 50) {
    return 'OK';
  } else {
    return year == 0 ? 'Debe completar este campo para completar la compra' : 'Por favor ingrese un año entre 21 y 50.'
  }
}

const checkCbu = (cbu) => {
  switch (cbu.length) {
    case 0:
      return 'Debe completar este campo para completar la compra';
    case 22:
      return 'OK';
    default: 
      return 'Numero de cbu invalido.'
  }
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

const onCloseModal = () => {
  $('#successModal').modal('hide');
  window.localStorage.removeItem('carrito');
  window.location.assign('./index.html');
}
/****************************************************************************** */
const tarjetInputs = `
                        <div class="form-group myFormGroup payFormContainer">
                          <input   required
                                   id="inputPayNumber"
                                   class="form-control form-control-rounded inputWidth"
                                   placeholder="Numero*"
                                   autocomplete="off"
                          />
                          <div id="payNumberErrorAlert"></div>
                        </div>

                        <div class="form-row payFormContainer">
                          <div class="col" style="padding-left: 0 !important;">
                            <input id="inputMonth" required type="number" class="form-control form-control-rounded" placeholder="MM">
                            <div id="monthErrorAlert"></div>
                          </div>
                          <div class="col">
                            <input id="inputYear" required type="number" class="form-control form-control-rounded" placeholder="AA">
                            <div id="yearErrorAlert"></div>
                          </div>
                        </div>
`

const cbuInput = `
                    <div class="form-group myFormGroup payFormContainer">
                      <input  required
                              id="inputCBUNumber"
                              class="form-control form-control-rounded inputWidth"
                              placeholder="Numero*"
                              autocomplete="off"
                        />
                      <div id="cbuNumberErrorAlert"></div>
                    </div>
`
let paymentsOp = [];

$(document).ready( async () => {

  await $.ajax({
    url: 'https://api.jsonbin.io/b/604d396b7ffeba41c078252f',
    dataType: 'json',
    headers: {
      "secret-key": "$2b$10$GJFvEiIuG3XoL/o3FEbvRefks0ZPU/k.KqreGqOuTaCOLOcBD8yZm"
    },
    success: (response) => {
      console.log('response', response)
      paymentsOp = response;
    }
  });
    console.log('paymentsOp', paymentsOp)
    let carrito = JSON.parse(localStorage.getItem('carrito')).contentList;
    let total = 0;
    for( let i=0; i < carrito.length ; i++) {
        total += carrito[i].precio
      }

    createSummary(carrito, total);
    let successModal = `
    <div id="successModal" class="modal" role="dialog" tabindex="-1">
	        <div class="modal-dialog modal-confirm">
		        <div class="modal-content">
			        <div class="modal-header">
				        <div class="icon-box">
					        <i class="material-icons">&#xE876;</i>
				        </div>				
				        <h4 class="modal-title w-100">Compra confirmada!</h4>	
			        </div>
			      <div class="modal-body">
				        <p class="text-center">Muchas gracias por realizar la compra! Los esperamos nuevamente!</p>
			      </div>
			      <div class="modal-footer">
				        <button class="btn btn-success btn-block" data-dismiss="modal" onclick="onCloseModal()">Inicio</button>
			      </div>
		      </div>
	      </div>
      </div>
          </div>
        </div>     
    `
    $('#modalDiv').html(successModal);

    let options = `<option selected>Tarjeta*</option>`;
    for(let i=0; i< paymentsOp.length ; i++){
      options += `
            <option value=${paymentsOp[i].id}>${paymentsOp[i].nombre}</option>
      `
    }
    $('#selectPayment').html(options);
})

$('#selectPayment').change( (val) => {
  console.log('value change select', val.target.value);
  val.target.value == 5 ? $('#divContainerInputs').html(cbuInput) : $('#divContainerInputs').html(tarjetInputs);
})

$('#submitButton').click( () => {
  let nombre = $('#inputName').val();
  let doc = $('#inputDni').val();
  let age = $('#inputAge').val();
  let mail = $('#inputEmail').val();
  let tarjeta = +$('#selectPayment').val();
  let num = $('#inputPayNumber').val();
  let expirationMonth = $('#inputMonth').val();
  let expirationYear = $('#inputYear').val();

  let idsPayment = [];
  for (let i=0; i < paymentsOp.length ; i++ ) {
    idsPayment.push(paymentsOp[i].id);
  }

  console.log('condicion', idsPayment.includes(tarjeta))
  console.log('tarjet preIf value', tarjeta, typeof tarjeta, idsPayment)
  if (idsPayment.includes(tarjeta) && checkNombre(nombre) && checkAge(age) && checkDni(doc) === 'OK' && checkMail(mail) === 'OK') {
    if(tarjeta !== 5) {
      if(checkPayment(num) === 'OK' && checkExpirationMonth(expirationMonth) === 'OK' && checkExpirationYear(expirationYear) === 'OK') {
        $('#successModal').modal('show');
      } else {
        if(checkPayment(num) !== 'OK') {
          $('#inputPayNumber').css("border-color", "red");
          let paymentNumError = `
          <div>
            <p style="color: red; font-size: 10px; margin-bottom: 0 !important">${checkPayment(num)}</p>
          </div>
          `
          $('#payNumberErrorAlert').html(paymentNumError);
        }
        if(checkExpirationMonth(expirationMonth) !== 'OK') {
          $('#inputMonth').css("border-color", "red");
          let monthError = `
          <div>
            <p style="color: red; font-size: 10px; margin-bottom: 0 !important">${checkExpirationMonth(expirationMonth)}</p>
          </div>
          `
          $('#monthErrorAlert').html(monthError);
        }
        if(checkExpirationYear(expirationYear) !== 'OK') {
          $('#inputYear').css("border-color", "red");
          let yearError = `
          <div>
            <p style="color: red; font-size: 10px; margin-bottom: 0 !important">${checkExpirationYear(expirationYear)}</p>
          </div>
          `
          $('#yearErrorAlert').html(yearError);
        }
    }} else {
      // Verifico el numero de cbu
      let cbuNumber = $('#inputCBUNumber').val();
      if (checkCbu(cbuNumber) === 'OK') {
        $('#successModal').modal('show');
      } else {
        $('#inputCBUNumber').css("border-color", "red");
        let cbuError = `
          <div>
            <p style="color: red; font-size: 10px; margin-bottom: 0 !important">${checkCbu(cbuNumber)}</p>
          </div>
        `
        $('#cbuNumberErrorAlert').html(cbuError);
      }
    }

    /*let preference = {
      items: [
        {
          title: 'Mi producto',
          unit_price: 100,
          quantity: 1,
        }
      ]
    };
    let preference = { items: []};

    for(let i=0; i< carrito.length ; i++ ) {
      preference.items.push({
        title: `${carrito[i].genero} ${carrito[i].especie}`,
        unit_price: `${carrito[i].precio}`,
        quantity: 1
      })
    }
    
    mercadopago.preferences.create(preference).then(function(response){
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
      global.id = response.body.id;
    }).catch(function(error){
        console.log(error);
    });*/
  } else {
    if (!idsPayment.includes(tarjeta)) {
      $('#selectPayment').css("border-color", "red");
      let paymentErrorRequired = `
        <div> 
          <p style="color: red; font-size: 10px; margin-bottom: 0 !important">Por favor, ingrese el medio de pago que va a utilizar.</p>
        </div>
      `
      $('#paymentErrorAlert').html(paymentErrorRequired);
    }
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
    if(checkMail(mail) !== 'OK') {
      $('#inputEmail').css("border-color", "red");
      let mailError = `
      <div>
        <p style="color: red; font-size: 10px; margin-bottom: 0 !important">${checkMail(mail)}</p>
      </div>
      `
      $('#mailErrorAlert').html(mailError);
    }
    if(checkDni(doc) !== 'OK') {
      $('#inputDni').css("border-color", "red");
      let dniError = `
      <div>
        <p style="color: red; font-size: 10px; margin-bottom: 0 !important">${checkDni(doc)}</p>
      </div>
      `
      $('#dniErrorAlert').html(dniError);
    }
  }
})

/*$.ajax({
        url: 'https://api.mercadopago.com/checkout/preferences?access_token=TUACCESTOKENACA',
        type: 'POST',
        data: JSON.stringify({
            "items": [
                {
                    "title": "Producto",
                    "description": "Líquido 60ml",
                    "quantity": 1,
                    "currency_id": "ARS",
                    "unit_price": 10.0
                }
            ]
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        success : function(data){
            console.info(data);
        }
    });*/