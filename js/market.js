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
    this.imagen = img; 
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
      let successAdd = `
        <p class="text-center">Hemos agregado ${orq.genero} ${orq.especie} al carrito!<p>
      `
      $(`#successModalTxt${orq.id}`).html(successAdd);
      $(`#modal${orq.id}Confirm`).modal('show'); 
      $(`#errorInputCant${orq.id}`).remove();
    } else {
      if (cant == 0) {
        let alertError = `
          <div class="errorMsg" style="margin-top: 15px" id="errorMsg">
            Por favor, debe agregar al menos 1 elemento al carrito.
          </div>
      `
      $(`#errorInputCant${orq.id}`).html(alertError);
      } else {
        let errorP = `
        <p class="text-center">Nos quedamos sin stock! Intente comprar mas tarde.<p>
        `
        $(`#errorTxtModal${orq.id}`).html(errorP);
        $(`#errorModal${orq.id}`).modal('show');
      }
    }
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
      let successRemove = `
        <p class="text-center">Se ha sacado una ${orq.genero} ${orq.especie} del carrito <p>
      `
      $(`#successModalTxt${orq.id}`).html(successRemove);
      $(`#modal${orq.id}Confirm`).modal('show');
    } else {
      let errorTxt = `
        <p class="text-center">Error. La planta no fue agregada al carrito<p>
      `
      $(`#errorTxtModal${orq.id}`).html(errorTxt);
      $(`#errorModal${orq.id}`).modal('show');
    }
  }

  getTotal() {
    let modalNotify = `
      <div id="modalNotifyTotal" class="modal" role="dialog" tabindex="-1">
        <div class="modal-dialog modal-confirm">
          <div class="modal-content">
            <div class="modal-header">			
              <h4 class="modal-title w-100">Total: ${carrito.total}</h4>	
            </div>
              <div class="modal-footer">
                <button class="btn btn-success btn-block" data-dismiss="modal" onclick="closeNotifyModal()">OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`

    $('#notifyTotal').html(modalNotify);
    $('#modalNotifyTotal').modal('show');
  }
}

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

let orquideum = [];

const closeConfirmModal = (id) => {
  $(`#modal${id}Confirm`).modal('hide'); 
}

const closeErrorModal = (id) => {
  $(`#errorModal${id}`).modal('hide'); 
}

const closeNotifyModal = () => {
  $('#modalNotifyTotal').modal('hide');
}

$(document).ready( async () => {

  await $.ajax({
    url: 'https://api.jsonbin.io/b/60413f479342196a6a6d9651',
    dataType: 'json',
    headers: {
      "secret-key": "$2b$10$GJFvEiIuG3XoL/o3FEbvRefks0ZPU/k.KqreGqOuTaCOLOcBD8yZm"
    },
    success: (response) => {
      for(let i=0; i<response.length; i++) {
        orquideum.push(new Orchid(response[i].id, response[i].genero, response[i].especie, response[i].precio, response[i].stock, response[i].imagen))
      }
    }
  });

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
            <div id="modal${orquideum[i].id}Confirm" class="modal" role="dialog" tabindex="-1">
	        <div class="modal-dialog modal-confirm">
		        <div class="modal-content">
			        <div class="modal-header">
				        <div class="icon-box">
					        <i class="material-icons">&#xE876;</i>
				        </div>				
				        <h4 class="modal-title w-100">Confirmado!</h4>	
			        </div>
			      <div class="modal-body" id="successModalTxt${orquideum[i].id}">
			      </div>
			      <div class="modal-footer">
				        <button class="btn btn-success btn-block" data-dismiss="modal" onclick="closeConfirmModal(${orquideum[i].id})">OK</button>
			      </div>
		      </div>
	      </div>
      </div>
          </div>
        </div>
        <div id="errorModal${orquideum[i].id}" class="modal">
	<div class="modal-dialog modal-confirm redErrorModal">
		<div class="modal-content">
			<div class="modal-header">
				<div class="icon-box redErrorModal">
					<i class="material-icons">&#xE5CD;</i>
				</div>				
				<h4 class="modal-title w-100">UPS!</h4>	
			</div>
			<div class="modal-body" id="errorTxtModal${orquideum[i].id}">
			</div>
			<div class="modal-footer">
				<button class="btn btn-danger btn-block redErrorModal" data-dismiss="modal" onclick="closeErrorModal(${orquideum[i].id})">OK</button>
			</div>
		</div>
	</div>
</div>     
        `;
  }
}


$('#menu').html(item);

/****************************************** */
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
                      <input id="input${orquideum[i].genero}" type="checkbox" onchange="filterByGender(orquideum[${i}].genero)">
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

                  <div class="market__aside__buttonResetContainer">
                    <button type="button" class="btn btn-primary" onclick="cleanFilterPrice()">Limpiar filtro</button>
                  </div>
              `

// Agrego las opciones de filtro
$('#filtersName').html(filters);
$('#filtersPrice').html(filterPrices);
})


//Lista filtrada
let filterList = [];
let priceFilteredList = [];

const isOrchEquals = (orq1, orq2) => {
  return orq1.id === orq2.id ? true : false;
}

const filterByGender = (gen) => {
  //Verifico si el checkbox esta seleccionado o no para ver si agrego las orquideas correspondientes a la lista filtrada o las elimino de ahi.
  let inpCheck = $(`#input${gen}`).prop('checked')

  if (inpCheck) {
    filterList = filterList.concat(orquideum.filter((orq) => orq.genero == gen))
  } else {
    filterList = filterList.filter((orq) => orq.genero !== gen)
   }

  // Llamo a esta funcion para setear el estado filtrado (teniendo en cuenta el otro filtro)
  setFilterState(filterList, priceFilteredList);
};

let filterItems = ``;

const filterByPrice = (desde, hasta) => {
  //Filtro desde el arreglo original las que esten en el precio.
  priceFilteredList = orquideum.filter((orq) => desde <= orq.precio && orq.precio <= hasta);
  // Llamo a esta funcion para setear el estado filtrado (teniendo en cuenta el otro filtro)
  setFilterState(filterList, priceFilteredList);
}

let newFilterState = [];

const setFilterState = (filterArray, priceFilterArray) => {
  // Hago una interseccion entre los arreglos en caso de tener distintos filtros. 
  // Si alguno es vacio, "devuelvo" el otro. 
  // Si los 2 son vacios, volvemos al estado original
  newFilterState = []

  let i,j;
  if(filterArray.length > 0 && priceFilterArray.length > 0) {

    for(i=0; i< filterArray.length; i++) {
      for(j=0; j< priceFilterArray.length; j++) {
        if(isOrchEquals(filterArray[i],priceFilterArray[j])) {
          newFilterState.push(filterArray[i]);
        }
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
  if (newFilterState.length > 0) {
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
  } else {
    filterItems += `
      <div class="noResults">
          <h2>Lo sentimos, no hemos encontrado orquideas que cumplan con las busquedas solicitadas! </h2>
      </div>
    `
  }

    document.getElementById('menu').remove();
    let newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'itemList');
    newDiv.id = 'menu';
  
    document.getElementById('contentContainer').appendChild(newDiv).innerHTML = filterItems;
}

const cleanFilterPrice = () => {
  for(let i=1; i <= 4; i++) {
    if($(`#inputPrice${i}`).prop('checked')) {
      $(`#inputPrice${i}`).prop('checked', false)
    }
  }
  priceFilteredList = [];
  setFilterState(filterList, priceFilteredList)
}
