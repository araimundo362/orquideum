// 2da entrega Proyecto Final -- Javascript.

/********************************************************************************************************************* */
// Clase Orquidea: genero, especie, precio, id e imagen. 
// Metodos: isAvailable checkea si hay disponibilidad de stock en cuanto a lo que pide el cliente, minusStock resta el stock de acuerdo a lo que pide el cliente,
// plusStock suma al stock lo que se remueva del carrito.
class Orchid {
  constructor(id, genero, especie, precio, stock, img) {
    this.genero = genero;
    this.especie = especie;
    this.precio = precio;
    this.stock = stock;
    this.id = id;
    this.imagen = img; // Agrego un id para poder remover exactamente una orquidea del carrito si se desea.
  }
  
  isAvailable(cant) {
    return cant < this.stock ? true : false;
  }

  minusStock(cant) {
    this.stock = this.stock - cant;
  }

  plusStock() {
    this.stock = this.stock + 1;
  }                 
}

/************************************************************************************************************************** */
// Clase carrito: LLevamos un array para el contenido. Y un valor que es el total del mismo.
//Metodos : addToCarrito agrega N elementos al carrito. removeFromCarrito saca un elemento seleccionado del carrito.
class Carrito {
  constructor(content, total) {
    this.contentList = content;
    this.total = total;
  }


  addToCarrito(orq) {
    let cant = $(`#input${orq.id}`).val();
    if(cant > 0 && orq.isAvailable(cant)) {
      for(let j=0 ; j<cant; j++) {
        this.contentList = this.contentList.concat([orq]);
      }
      this.total = this.total + cant * orq.precio;
      orq.minusStock(cant); 
      localStorage.setItem('carrito', JSON.stringify(carrito)); 
      let alertSuccess = `
      <div class="alert alert-success" role="alert" style="margin-top: 15px">
        <strong>Confirmado!</strong> Hemos agregado exitosamente el elemento al carrito.
      </div>
      `
      $('#alertContainer').html(alertSuccess);
      $('#errorMsg').remove();
    } else {
      let alertError = ``
      if (cant == 0) {
        alertError = `
          <div class="errorMsg" style="margin-top: 15px" id="errorMsg">
            Por favor, debe agregar al menos 1 elemento al carrito.
          </div>
      `
      $(`#errorInputCant${orq.id}`).html(alertError);
      } else {
        alertError = `
        <div class="alert alert-danger" role="alert" style="margin-top: 15px">
          <strong>Oh No! </strong> Nos quedamos sin stock! Intente comprar mas tarde.
        </div>
      `
      $('#alertContainer').html(alertError);
      }
    }

    console.log('carrito', this.contentList)
    console.log('total', this.total)
  }

  removeFromCarrito(orq) {
    let idList = this.contentList.map((elem) => elem.id);
    if(idList.includes(orq.id)) {
      let index = this.contentList.findIndex((orch) => orch.id === orq.id);
      let contentAux= [];
      for(let k=0; k<this.contentList.length; k++) {
        if(k!==index) {
          contentAux.push(this.contentList[k])
        }
      }
      this.contentList = contentAux;
      this.total = this.total - orq.precio; 
      orq.plusStock();
      localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
      let alertError = `
        <div class="alert alert-danger" role="alert" style="margin-top: 15px">
          Error! La planta no fue agregada al carrito.
        </div>
      `
      $('#alertContainer').html(alertError);
    }

    console.log('carrito', this.contentList)
    console.log('total', this.total)
  }

  getTotal() {
    alert(`El total es: ${this.total}`)
  }
}

let orquideum = [];

$(document).ready( async () => {

  await $.ajax({
    url: 'https://api.jsonbin.io/b/60413f479342196a6a6d9651',
    dataType: 'json',
    headers: {
      "secret-key": "$2b$10$GJFvEiIuG3XoL/o3FEbvRefks0ZPU/k.KqreGqOuTaCOLOcBD8yZm"
    },
    success: (response) => {
      console.log('response', response)
      for(let i=0; i<response.length; i++) {
        orquideum.push(new Orchid(response[i].id, response[i].genero, response[i].especie, response[i].precio, response[i].stock, response[i].imagen))
      }
    }
  });
  console.log('orqsResponse', orquideum);

  // Generacion del contenido HTML  de nuestra pagina una vez obtenido los datos del server. 
  let item = ``;

for (let i = 0; i < orquideum.length; i++) {
  if (orquideum[i].stock > 0) {
    item += `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="card h-100">
            <a href="#"><img class="card-img-top market__img" alt="imagen flor" src=${orquideum[i].imagen}></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">${orquideum[i].genero} ${orquideum[i].especie}</a>
              </h4>
              <h5>$${orquideum[i].precio}</h5>
              <input placeholder="Cantidad" value="0" class="form-control form-control-rounded" type="number" id="input${orquideum[i].id}">
              <div id="errorInputCant${orquideum[i].id}" ></div>
            </div>
            <div id="cardFooter" class="card-footer">
              <button type="button" class="btn btn-primary" onclick="carrito.addToCarrito(orquideum[${i}])">Comprar</button>
              <button type="button" class="btn btn-primary" onclick="carrito.removeFromCarrito(orquideum[${i}])">Sacar del carrito</button>
            </div>
          </div>
        </div>
        `;
  }
}

$('#menu').html(item);

// Armo la seccion de filtros una vez obtenidos los datos del sv.
let filters = ``;
let filterPrices = ``;
let auxGen = [];

for(i=0; i < orquideum.length; i++) {
  if (!auxGen.includes(orquideum[i].genero)) {
    auxGen.push(orquideum[i].genero);
    filters += `
                  <div class="market__aside__filterContainer">
                      <h6>${orquideum[i].genero}</h6>
                      <input id="input${orquideum[i].especie}" type="checkbox" onchange="filterByName(orquideum[${i}])">
                  </div>
              `
  }
}

filterPrices += `
                  <div class="market__aside__filterContainer">
                      <h6>Hasta 1000$</h6>
                      <input id="inputPrice1" name="filterPrice" type="radio" onchange="filterByPrice(0,1000)">
                  </div>
                  <div class="market__aside__filterContainer">
                      <h6>1001$ - 2000$</h6>
                      <input id="inputPrice2" type="radio" name="filterPrice" onchange="filterByPrice(1001,2000)">
                  </div>
                  <div class="market__aside__filterContainer">
                      <h6>2001$ - 3000$</h6>
                      <input id="inputPrice3" name="filterPrice" type="radio" onchange="filterByPrice(2001,3000)">
                  </div>
                  <div class="market__aside__filterContainer">
                      <h6>Desde 3000$</h6>
                      <input id="inputPrice4" type="radio" name="filterPrice" onchange="filterByPrice(3000,99999)">
                  </div>
              `

// Agrego las opciones de filtro
$('#filtersName').html(filters);
$('#filtersPrice').html(filterPrices);
})

console.log('orqsResponse fuera del document ready', orquideum);
let carrito;

if(localStorage.getItem('carrito') !== null) {
  let content = JSON.parse(localStorage.getItem('carrito')).contentList;
  let prevTotal = 0;
  for(i=0; i < content.length ; i++) {
    prevTotal += content[i].precio
  }
  carrito = new Carrito(content, prevTotal);
} else {
  carrito = new Carrito([], 0);
}


//Lista filtrada
let filterList = [];

function checkForOrchid(orq, ar) {
  for (i=0; i < ar.length; i++) {
    if (ar[i].genero === orq.genero) {
      return true;
    }
  }
  return false;
} 

function filterByName(orq) {
  // Me fijo si la orquidea ya fue agregada al filtro o no. En caso positivo la saco del arreglo filtrado y los elementos. En caso negativo, la agrego y filtro
  if (checkForOrchid(orq, filterList)) {
    filterList = filterList.filter((orch) => orch.genero !== orq.genero);
  } else {
    filterList = filterList.concat(orquideum.filter((orch) => orch.genero === orq.genero));
  }
// Llamo a esta funcion para setear el estado filtrado (teniendo en cuenta el otro filtro)
  setFilterState(filterList, priceFilteredList);
};

let priceFilteredList = [];
let filterItems = ``;

function filterByPrice(desde, hasta) {
  //Filtro desde el arreglo original las que esten en el precio.
  priceFilteredList = orquideum.filter((orq) => desde <= orq.precio && orq.precio <= hasta);
  // Llamo a esta funcion para setear el estado filtrado (teniendo en cuenta el otro filtro)
  setFilterState(filterList, priceFilteredList);
}

let newFilterState = [];

function setFilterState(filterArray, priceFilterArray) {
  // Hago una interseccion entre los arreglos en caso de tener distintos filtros. 
  // Si alguno es vacio, "devuelvo" el otro. 
  // Si los 2 son vacios, volvemos al estado original
  if(priceFilterArray.length && filterArray.length) {
    for(i=0; i<filterArray.length; i++) {
      if(priceFilterArray.includes(filterArray[i])) {
        newFilterState.push(filterArray[i]);
      }
    }     
  } else {
    if (!filterArray.length) {
      newFilterState = priceFilterArray;
    }
    if(!priceFilterArray.length) {
      newFilterState = filterArray;
    }
    if(!priceFilterArray.length && !filterArray.length){
      newFilterState = orquideum;
    }
  }

  filterItems = ``;
    for (let i = 0; i < newFilterState.length; i++) {
      if (newFilterState[i].stock > 0) {
        filterItems += `
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card h-100">
                <a href="#"><img class="card-img-top market__img" alt="imagen flor" src=${newFilterState[i].imagen}></a>
                <div class="card-body">
                  <h4 class="card-title">
                    <a href="#">${newFilterState[i].genero} ${newFilterState[i].especie}</a>
                  </h4>
                  <h5>$${newFilterState[i].precio}</h5>
                  <input placeholder="Cantidad" value="" class="form-control form-control-rounded" type="number" id="input${newFilterState[i].id}">
                </div>
                <div id="cardFooter" class="card-footer">
                  <button type="button" class="btn btn-primary" onclick="carrito.addToCarrito(newFilterState[${i}])">Comprar</button>
                  <button type="button" class="btn btn-primary" onclick="carrito.removeFromCarrito(newFilterState[${i}])">Sacar del carrito</button>
                </div>
              </div>
            </div>
            `;
      }
    }

    //Borro el elemento menu del DOM.
    document.getElementById('menu').remove();
    //Creo el contenido con el nuevo listado.
    let newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'itemList');
    newDiv.id = 'menu';
  
    document.getElementById('contentContainer').appendChild(newDiv).innerHTML = filterItems;
}

function checkForOrchid(orq, ar) {
  for (i=0; i < ar.length; i++) {
    if (ar[i].genero === orq.genero) {
      return true;
    }
  }
  return false;
} 

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