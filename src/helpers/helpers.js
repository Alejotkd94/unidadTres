const hbs = require('hbs');

//Lista de curso e informacion detallada del curso
hbs.registerHelper('listarCursos', (listado) => {
    let texto = ``;

    listado.forEach(oCurso => {
        if (oCurso.estado == true) {
            texto = texto + `<div class="col-sm-12 col-lg-12 mt-2">
							<div class="accordion" id="accordionCursos${oCurso.idCurso}">
								  <div class="card">
									    <div class="card-header" id="${oCurso.idCurso}">
										    	<p>
										    		Curso : ${oCurso.nombre}<br>
										    		Valor : $${oCurso.valor}
										    	</p>
										    	<hr>
										      <h2 class="mb-0">
										      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${oCurso.idCurso}" aria-expanded="true" aria-controls="collapse${oCurso.idCurso}">
										          Mas Información
										       </button>
										      </h2>
									    </div>

								       <div id="collapse${oCurso.idCurso}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionCursos${oCurso.idCurso}">
									      <div class="card-body">
										      	<ul class="list-group">
												  <li class="list-group-item"><strong>Descripción :</strong> ${oCurso.descripcion}</li>
												  <li class="list-group-item"><strong>Modalidad :</strong> ${oCurso.modalidad}</li>
												  <li class="list-group-item"><strong>Intensidad horaria :</strong> ${oCurso.intensidadHoraria}</li>
												  <li class="list-group-item"><strong>Valor :</strong> $${oCurso.valor}</li>
												</ul>
											</div>					        
								      </div>
								    </div>
							 </div>
					</div>`;
        }
    });
    return texto;
});

//Lita de curso para realizar inscripcion
hbs.registerHelper('selectCursos', (listado) => {

    let texto = `<select class="form-control form-control-lg" id="listCurso" name="idCurso" required>
			        <option value="">Seleccione un curso</option>`;

    listado.forEach(oCurso => {
        if (oCurso.estado == true) {
            texto = texto + `<option value="${oCurso.idCurso}">${oCurso.nombre}</option>`;
        }
    });

    texto = texto + "</select>";
    return texto;
});

hbs.registerHelper('listarInscriptos', (listado, listadouser, usuarios) => {

    let texto = ``;

    listado.forEach(oCurso => {
        texto = texto + `<div class="col-sm-12 col-lg-12 mt-4">
	<div class="accordion" id="accordionCursos${oCurso.idCurso}">
		<div class="card">
			<div class="card-header" id="${oCurso.idCurso}">
				<p>
					Curso : ${oCurso.nombre}										    		
				</p><br>
				<form class="form-inline my-2 my-lg-0" action="/CerrarCurso" method="post">
					<div class="form-group">
						<input type="hidden" name="estado" value="${oCurso.estado}" >
						<input type="hidden" name="idCurso" value="${oCurso.idCurso}" >`
        if (oCurso.estado) {
            texto = texto + `
						<button type="hidden" class="btn btn-danger">Cerrar curso</button>`
        } else {
            texto = texto + `
						<button type="hidden" class="btn btn-success ">Abrir curso</button>`
        }
        texto = texto + `	</div>
				</form>
				<hr>
				<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${oCurso.idCurso}" aria-expanded="true" aria-controls="collapse${oCurso.idCurso}">Mostrar inscritos.
				</button>
			</div>

			<div id="collapse${oCurso.idCurso}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionCursos${oCurso.idCurso}">
				<div class="card-body">`;

        let oInscrito = listadouser.filter(buscar => buscar.idCurso == oCurso.idCurso);
        if (oInscrito.length > 0) {
            texto = texto + ` <table class="table">
					<thead class="thead-dark">
					<tr>
					<th scope="col">Documento</th>
					<th scope="col">Nombre</th>
					<th scope="col">Correo eléctronico</th>
					<th scope="col">Teléfono</th>
					<th scope="col">Eliminar</th>
					</tr>
					</thead>
					<tbody>`;
            oInscrito.forEach(oEst => {
                let infoUser = usuarios.filter(buscar => buscar._id == oEst.idUsuario);

                texto = texto + `
					<tr>
					<th>${infoUser[0].docIdentidad}</th>
					<td>${infoUser[0].nombre}</td>
					<td>${infoUser[0].correo}</td>
					<td>${infoUser[0].telefono}</td>`

                texto = texto + `<td>
					<form action="/eliminarAspirante" method="post">
					<div class="form-group">
					<input type="hidden" name="idCurso" value="${oCurso.idCurso}" >
					<input type="hidden" name="docIdentidad" value="${oEst.idUsuario}" >
					<button type="hidden" class="btn btn-danger">Eliminar</button>
					</form>
					</td>
					</tr>`;
            });
        }

        texto = texto + `</tbody>
					</table>`;
        texto = texto + `</div>					        
			</div>
		</div>
	</div>
</div>`;
    });
    return texto;
});