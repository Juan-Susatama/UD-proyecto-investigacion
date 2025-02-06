

// Radio buttons destinados al tipo de ejercicio Maximización o Minimización
const radioButtonMaximo = document.getElementById('maximizacion')
const radioButtonMin = document.getElementById('minimizacion')

// Radio buttons destinados al metodo
const radiobutton_metodoGrafico = document.getElementById('metodoGrafico');
const radiobuttonmetodoDosPasos = document.getElementById('metodoDosPasos');

// seccion de la función objetivo
const seccionFuncionObjetivo = document.getElementById('funcionObjetivo');

// Campos pertenecientes a la funcion objetivo del metodo grafico
const campos_funcion_objetivo_grafico = document.getElementById('graficoCampos');

// Campos pertenecientes a la funcion objetivo del metodo dos faces
const campos_funcion_objetivo_dosFases = document.getElementById('dosFasesCampos');

// Sección de restricciones
const seccionRestricciones = document.getElementById('restricciones');
const imputCantidadRestricciones = document.getElementById('cantidadRestricciones');

// Sección de la cantidad de variables
const seccionVariables = document.getElementById('variables');
const inputCantidadVariables = document.getElementById('cantidadDeVariables')

// Seccion para los datos de la grafica
const seccion_datos_grafica = document.querySelector('.data_graphics__data');

// Botones
const generarFuncionObjetivo = document.getElementById('generarFuncionObjetivo');
const generarRestricciones = document.getElementById('generarRestricciones');
const camposRestricciones = document.getElementById('camposRestricciones');

// Formulario
const formulario = document.getElementById('dynamicForm')



let tipo = '' //max o min
let metodo = '' //grafico o dosfases

// Array que permitira guardar las restricciones transformadas
// para enviarlas a la peticion.
let restricciones__transformadas = []


/*
  Funciones necesarias
*/


/* 
Crea la información asociada al resultado de la petición
*/
const crear_panel_informacion_graficos = (informacion)=>{


  /*La variable panel, alojara la informacion de la petición
    Las intersecciones .
    Y el valor resultado.
  */
  const panel = document.createElement('div');
  panel.classList.add('panel_datos_grafica');

    const panel_interseccion = document.createElement('ul');
    panel_interseccion.classList.add('panel_datos_grafica-intersecciones')

    const panel_grafica_valor = document.createElement('ul');
    panel_grafica_valor.classList.add('panel_datos_grafica__valor')

  informacion.allIntersections.forEach((interseccion,i)=>{
    const item_punto_interseccion = document.createElement('li');

    item_punto_interseccion.innerHTML = `<strong>Interseccion #${i+1}: </strong>(${interseccion.x},${interseccion.y}) `
    panel_interseccion.appendChild(item_punto_interseccion);
  })

  let indice;

  const item_valor_interseccion_resultado = document.createElement('li');
  const item_valor_resultado = document.createElement('li');
  if(tipo == 'max'){
    indice = informacion.maxIndex
    item_valor_resultado.innerHTML = `Valor maximo : ${informacion.maxValue}`
  }else{
    indice = informacion.minIndex
    item_valor_resultado.innerHTML = `Valor minimo : ${informacion.minValue}`
  }

  item_valor_interseccion_resultado.innerHTML = `Interseccion resultado (${informacion.allIntersections[indice].x}, ${informacion.allIntersections[indice].y})`;

  console.log(
    `DATOS DE LA PETICION:
     - intersecciones: ${informacion.allIntersections}
     - valor_maximo : ${informacion.maxValue}
     - valor_minimo : ${informacion.minValue}
     - indice del valor_minimo : ${informacion.minIndex}
     - indice del valor_maximo : ${informacion.maxIndex}

     - indice prueba ${indice}
     - interseccion resultado (${informacion.allIntersections[indice].x}, ${informacion.allIntersections[indice].y})
    `
  );

  console.log(informacion.allIntersections[indice]);

  panel_grafica_valor.innerHTML = ``
  panel_grafica_valor.appendChild(item_valor_interseccion_resultado)
  panel_grafica_valor.appendChild(item_valor_resultado);
  
  panel.appendChild(panel_grafica_valor)
  panel.appendChild(panel_interseccion);

  return panel;
}

/*
  La funcion "crearCampos", permite crear el input individual de una funcion objetivo (destinado al coeficiente que acompaña la constante),
  junto a su simbolo (que puede ser "+" o "-").

  Esta se usa para la función objetivo del metodo de dos faces.
*/
const crearCampos = (campo, indice,numero_variables,tipo)=>{
  numero_variables = numero_variables-1
  const input = document.createElement('input')
  input.type = 'number'
  input.required;

  const simbolo = document.createElement('select');

    const opcionSuma = document.createElement('option');
    opcionSuma.value = "+";
    opcionSuma.textContent = "+";

    const opcionIgual = document.createElement('option');
    opcionIgual.value = "=";
    opcionIgual.textContent = "=";

    const opcion_mayorIgual = document.createElement('option');
    opcion_mayorIgual.value = ">=";
    opcion_mayorIgual.textContent = "≥";

    const opcion_menorIgual = document.createElement('option');
    opcion_mayorIgual.value = "<=";
    opcion_mayorIgual.textContent = "≤";
  
    const opcionResta = document.createElement('option');
    opcionResta.value = "-";
    opcionResta.textContent = "-";

  simbolo.required;
  simbolo.appendChild(opcionSuma)
  simbolo.appendChild(opcionResta)

  console.log(`Variable ${numero_variables}, : indice${indice}`)

  campo.appendChild(input);
  if(indice == (numero_variables)){
    if(tipo == "restriccion")
    {
      simbolo.appendChild(opcionIgual)
      simbolo.appendChild(opcion_mayorIgual)
      simbolo.appendChild(opcion_menorIgual)
    }
    alert('Dentro de la funcion add')
      
      console.log('dentro del que quiero estar')
  }else{
    alert('Afuera')
    campo.appendChild(simbolo);
  }
  
  
}



/* Eventos de cuando se seleccione un radiobutton 
   ya sea Maximización o Minimización
*/

//Maximización
radioButtonMaximo.addEventListener('change', () => {
    tipo = 'max'
    
});

// Minimización
radioButtonMin.addEventListener('change', () => {
    tipo = 'min'
});



/* Mostrar campos según el radiobutton del método seleccionado Metodo grafico / Metodo dos pasos
*/

// Metodo grafico
radiobutton_metodoGrafico.addEventListener('change', () => {
  metodo = 'grafico';
  
  camposRestricciones.innerHTML = '';
  campos_funcion_objetivo_dosFases.innerHTML = ` `

  seccionFuncionObjetivo.classList.remove('hidden'); //Sección de la funcion objetivo destinada al metodo de dos faces

  campos_funcion_objetivo_grafico.classList.remove('hidden');
  seccionRestricciones.classList.remove('hidden');

  seccionVariables.classList.add('hidden'); // Campo de variables destinado al metodo de dos faces
  
});

// Metodo dos pasos
radiobuttonmetodoDosPasos.addEventListener('change', () => {
  metodo = 'dosFases'
  inputCantidadVariables.required;

 //Ocultar secciones de la función objetivo
  campos_funcion_objetivo_grafico.classList.add('hidden'); // Ocultar campos específicos del método gráfico
  seccionFuncionObjetivo.classList.add('hidden');

  seccionRestricciones.classList.add('hidden')
  camposRestricciones.innerHTML = '';


  seccionVariables.classList.remove('hidden');

  //restricciones.classList.remove('hidden');
});


/* Evento que se ejecuta cuando el boton de "Generar funcion objetivo" es clickeado
   en el metodo de dos faces 
*/
generarFuncionObjetivo.addEventListener('click',()=>{
  
  campos_funcion_objetivo_dosFases.innerHTML = ` `

  const numero_variables = inputCantidadVariables.value;

  let i;
  for ( i=0 ; i<numero_variables ; i++ ){
    crearCampos(campos_funcion_objetivo_dosFases,i,numero_variables,'funcion');  
  }

  console.log(campos_funcion_objetivo_dosFases);

  seccionFuncionObjetivo.classList.remove('hidden')
  
  campos_funcion_objetivo_dosFases.classList.remove('hidden')

  seccionRestricciones.classList.remove('hidden')
})

window.validar_numeros = function validar_numeros(valor_nuevo){
    if (!valor_nuevo || !valor_nuevo.value) {
      console.error("valor_nuevo no es un input válido" + valor_nuevo.value);
      return '';
    }
  
    valor_nuevo.value = valor_nuevo.value.replace(/[^0-9./]/g, '');
  
    let partes = valor_nuevo.value.split('/');
  
    if (partes.length > 2) {
      valor_nuevo.value = partes[0] + '/' + partes[1]; 
    }
  
    for (let j = 0; j < partes.length; j++) {
      let subPartes = partes[j].split('.');
      if (subPartes.length > 2) {
        partes[j] = subPartes[0] + '.' + subPartes.slice(1).join('');
      }
    }
  
    if (partes.length === 2 && partes[1] !== "") {
      let numerador = parseFloat(partes[0]);
      let denominador = parseFloat(partes[1]);
  
      if (!isNaN(numerador) && !isNaN(denominador) && denominador !== 0) {
        valor_nuevo.value = (numerador / denominador).toFixed(2); 
      }
    }

    console.log("Numero final " + valor_nuevo.value);

    return valor_nuevo;
}

document.getElementById('enviar__datos').addEventListener('click', function() {
  const Numero_1 = document.getElementById('Numero_1');
  const Numero_2 = document.getElementById('Numero_2');
  const EntradaCantidadRestricciones = document.getElementById('cantidadRestricciones');

  validar_numeros(Numero_1);
  validar_numeros(Numero_2);

  const cantidad_restricciones = parseInt(EntradaCantidadRestricciones?.value, 10);
  
  if (isNaN(cantidad_restricciones) || cantidad_restricciones < 1) {
    console.error("Cantidad de restricciones no válida.");
    return;
  }

  for (let i = 0; i < cantidad_restricciones; i++) {
    const restriccion1 = document.getElementById(`restriccion_${i+1}_1`);
    const restriccion2 = document.getElementById(`restriccion_${i+1}_2`);
    const restriccionR = document.getElementById(`restriccion_${i+1}_resultado`);

    if (restriccion1) {
      validar_numeros(restriccion1);
    } else {
      console.warn(`No se encontró la restricción restriccion_${i+1}_1`);
    }

    if (restriccion2) {
      validar_numeros(restriccion2);
    } else {
      console.warn(`No se encontró la restricción restriccion_${i+1}_2`);
    }

    if (restriccionR) {
      validar_numeros(restriccionR);
    } else {
      console.warn(`No se encontró la restricción restriccion_${i+1}_resultado`);
    }
  }
});


const crearCadenaMetodoGrafico = (cadena,valor_nuevo,i)=>{
  if(i == 0){
    cadena= cadena+`${valor_nuevo}x`
  }else if(i == 2){
    cadena= cadena+`${valor_nuevo}y`
  }else{
    cadena = cadena +`${valor_nuevo}`
  }  

return cadena;
}


// Evento que se ejecuta cuando el formulario es enviado
formulario.addEventListener('submit',async (e)=>{
    e.preventDefault();

    //Elimino las restricciones guardadas en el array de "restricciones__transforamdas"
    restricciones__transformadas.splice(0, restricciones__transformadas.length);

    alert(`El metodo seleccionado fue ${metodo}`)
    alert(`El tipo seleccionado fue ${tipo}`)

    let funcion_objetivo_enviar = ''

    const inputs_restricciones = Array.from( document.querySelectorAll('.restriccion') )
    console.log(inputs_restricciones);

  // Si el metodo que escogio fue el grafico
  if(metodo == 'grafico'){
    const inputs_funcion_objetivo = Array.from(document.querySelectorAll('.funcion_objetivo_input'));
  
    inputs_funcion_objetivo.forEach((elemento,i)=>{
      console.log(elemento.value);
      console.log(`tipo del elemento ${typeof(elemento.value)}`);

      funcion_objetivo_enviar = crearCadenaMetodoGrafico(funcion_objetivo_enviar, elemento.value, i);
    })

    inputs_restricciones.forEach((restriccion)=>{
      const inputs = Array.from(restriccion.children);

      let restriccion_final = ' '

      console.log(`tamano del array ${inputs.length}`);

      inputs.forEach((input,i)=>{
        restriccion_final = crearCadenaMetodoGrafico(restriccion_final, input.value, i);        
      })
      restriccion_final = restriccion_final.toString();
      restricciones__transformadas.push(restriccion_final)

     console.log(`Restricciones transformadas ${restriccion_final}`);
    })
  
  }else{ //Si el metodo es el dos fases
    inputs_restricciones.forEach((restriccion)=>{
      const inputs = Array.from(restriccion.children);

      let restriccion_final = ' '

      console.log(`tamano del array ${inputs.length}`);

      inputs.forEach((input,i)=>{
        if((input.value).match(/\d+/g)){

          if(i == 0){
            restriccion_final = restriccion_final+`${input.value}x${i+1}`
          }else if(i+1 == inputs.length){
            restriccion_final = restriccion_final+`=${input.value}`
          }else{
            restriccion_final = restriccion_final+`+${input.value}x${i}`
          }
          
        }else{

        }
        
      })

     console.log(`Restriccion transformada ${restriccion_final}`);
    })
  }

  console.log(`restricciones ${restricciones__transformadas}`);

  const informacion = await realizarPeticion(funcion_objetivo_enviar,restricciones__transformadas);
  
  const panel_datos_grafica = crear_panel_informacion_graficos(informacion)
  seccion_datos_grafica.innerHTML = ' '
  seccion_datos_grafica.appendChild(panel_datos_grafica);
  
  graficar(funcion_objetivo_enviar,informacion)
  
  

  alert(informacion);
  //console.log(informacion);
})


// Evento que se ejecuta cuando el boton de generar campos de restricciones
// es clickeado
generarRestricciones.addEventListener('click', () => {
  const cantidad_restricciones = parseInt(imputCantidadRestricciones.value);

  if (isNaN(cantidad_restricciones) ||cantidad_restricciones <= 0) {
    alert('Por favor, ingrese una cantidad válida de restricciones.');
    return;
  }

  // Limpiar campos previos
  camposRestricciones.innerHTML = '';

    for (let i = 0; i <cantidad_restricciones; i++) {
      const div = document.createElement('div');
      if (metodo == 'grafico'){
        div.innerHTML = `
          <input type="text" step="any" required id="restriccion_${i+1}_1">
          <select required>
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
          <input type="text" step="any" required  id="restriccion_${i+1}_2">
          <select required>
            <option value=">=">≥</option>
            <option value="<=">≤</option>
          </select>
          <input type="text" step="any"  required id="restriccion_${i+1}_resultado">
        `;
        div.classList.add('restriccion')

        div.id = `restriccion${i+1}`
        camposRestricciones.appendChild(div);
      }else{

      }
        
    }
});


const graficar = (funcionObjetivo,informacion) =>{
  let elt = document.getElementById('calculator');
  elt.innerHTML=` `;
  let calculator = Desmos.GraphingCalculator(elt);

  calculator.setBlank();

  informacion.allIntersections.forEach((interseccion,i)=>{
    const punto_x = interseccion.x;
    const punto_y = interseccion.y;
    calculator.setExpression({ id:`point${i+1}`, latex:`(${punto_x},${punto_y})`, label: `Punto ${i+1} `, showLabel: true });
  })

  restricciones__transformadas.forEach((restriccion,i)=>{
    // Reemplazar >= o <= por =
    restriccion = restriccion.replace(/(>=|<=|<|>)/, "=");
    calculator.setExpression(
      { 
      id: `func${i}`, 
      latex: `${restriccion}`, 
      label: `Restriccion`, // Etiqueta dinámica
      showLabel: true    
    }
    );
  })

   
   if(tipo == 'max'){
    funcionObjetivo = funcionObjetivo + `= ${informacion.maxValue}`
   }else{
    funcionObjetivo = funcionObjetivo + `= ${informacion.minValue}`
   }
  calculator.setExpression(
    { 
    id: `funcOjetivo`, 
    latex: `${funcionObjetivo}`, 
    label: `F_objetivo`, // Etiqueta dinámica
    showLabel: true    
  }
  );
  
}

const realizarPeticion = async (funcionObjetivo,arrayRestricciones,tipo)=>{


    const urlPeticion = 'https://graphicalmethodapi-dmd3bca6e6dpenev.canadacentral-01.azurewebsites.net/graphical-method/solve'


      const body_de_peticion = {
        "objectiveFunctionText":funcionObjetivo,
        "restrictionsText":arrayRestricciones,
        "isMaximization": true
      }
      console.log(body_de_peticion);

    const response = await fetch(urlPeticion,
        {
            method:"POST",
            headers:{
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "objectiveFunctionText":funcionObjetivo,
                "restrictionsText":arrayRestricciones,
                "isMaximization": true
            })
        })
/*
    const data = response.then((muestraAlgo)=>{
      return muestraAlgo.json()
    });
*/
    const data = response.json()

    data.then((informacion)=>{
      console.log(informacion);
    })

    return data;
    
}