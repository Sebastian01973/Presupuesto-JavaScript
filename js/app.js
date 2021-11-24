const ingresos = [
  new Ingreso("Salario", 2100.0),
  new Ingreso("Venta coche", 1300.0),
  new Ingreso("Venta Casa",13450.0)
];

const egresos = [
    new Egreso("Servicio", 700.0),
    new Egreso("Comida", 400.0),
    new Egreso("Panes",500.0)

];

let loadApp = () => {
  loadHead();
  loadIngresos();
  loadEgresos();
};

let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

let totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

let loadHead = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
   /* return valor.toLocaleString("en-US", {style: "currency",currency: "USD",
    minimumFractionDigits: 2,
  }); */ 
  return valor.toLocaleString("en-US", {style: "currency",currency: "USD",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const loadIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
              <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick='deleteingreso(${ingreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return ingresoHTML;
};

const deleteingreso = (id) =>{
    let deleteIndex = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(deleteIndex,1);
    loadHead();
    loadIngresos();
}

const loadEgresos = () => {
    let egresosHTML = "";
    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick='deleteEgreso(${egreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return egresoHTML;
}

const deleteEgreso = (id) =>{
    let deleteIndex = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(deleteIndex,1);
    loadHead();
    loadEgresos();
}

let addDate = () =>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if (tipo.value === 'ingreso') {
            ingresos.push(new Ingreso(descripcion.value,+valor.value));
            loadHead();
            loadIngresos();
        }else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value,+valor.value));
            loadHead();
            loadEgresos();
        }
    }
}


