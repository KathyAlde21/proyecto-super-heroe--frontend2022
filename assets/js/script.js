// alert()

$(document).ready(function(){
    //rama master actualizada
    var laImagen = '';
    $('#imagenHeroe').on('error', function(){
      console.log('Error en la imagen');
        laImagen = 'assets/img/sh1.jpg';
        console.log(`Nueva Ruta Imagen: ${laImagen}`);
        $('#imagenHeroe').attr("src", laImagen );
    });
  
    $('#formHeroe').submit(function(event){
      event.preventDefault();
      console.log('funciona submit');
      $('#mensajeHeroe').text('cargando ...');
  
      $('#seccionDatos').attr('class', 'container d-block');
  
      let idHeroe = $('#txtSuperheroe').val();
  
      $.ajax({
        type:"GET",
        url:`https://superheroapi.com/api.php/4905856019427443/${idHeroe}`,
        success: function(data){
              $('#mensajeHeroe').text('SuperHeroe Encontrado');
              console.log(data);
              let laImagen = data.image.url;
              // $('#imagenHeroe').attr("src", `${data.image.url}`);
              $('#imagenHeroe').attr("src", laImagen );
  
              let elNombre = data.name;
              // $('#nombreHeroe').attr("src", `Nombre: ${data.name}`);
              $('#nombreHeroe').text(`Nombre: ${elNombre}`);
  
              let lasConexiones = data['connections']['group-affiliation'];
              $('#conexionesHeroe').text(`Conexiones: ${lasConexiones}`);
  
              let publicado = data['biography']['publisher'];
              $('#publicadoHeroe').text(`Publicado por: ${publicado}`);
  
              let laOcupacion = data['work']['occupation'];
              $('#ocupacionHeroe').text(`Ocupacion: ${laOcupacion}`);
  
              let laInteligencia = data['powerstats']['intelligence']== 'null' ? 0 : parseInt(data['powerstats']['intelligence']);
              let laFuerza = data['powerstats']['strength'] == 'null' ? 0 : parseInt(data['powerstats']['strength']);
              let laVelocidad = data['powerstats']['speed'] == 'null' ? 0 : parseInt(data['powerstats']['speed']);
  
              var chart = new CanvasJS.Chart("chartContainer", {
                              theme: "light2", // "light1", "light2", "dark1", "dark2"
                              exportEnabled: true,
                              animationEnabled: true,
                              title: {
                                  text: `Estadisticas de poder para ${elNombre}`,
                              },
                              data: [{
                                  type: "pie",
                                  startAngle: 25,
                                  toolTipContent: "<b>{label}</b>: {y}",
                                  showInLegend: "true",
                                  legendText: "{label}",
                                  indexLabelFontSize: 16,
                                  indexLabel: "{label} - {y}",
                                  dataPoints: [
                                      { y: laInteligencia, label: "Intelligence" },
                                      { y: laFuerza, label: "Strength" },
                                      { y: laVelocidad, label: "Speed" },
                                      { y: laDurabilidad, label: "Durability" },
                                      { y: elPoder, label: "Power" },
                                      { y: elCombate, label: "Combat" },
                                      
                                      { y: 5.02, label: "Microsoft Edge" },
                                      { y: 4.07, label: "Safari" },
                                      { y: 1.22, label: "Opera" },
                                      { y: 0.44, label: "Others" }
                                  ]
                              }]
                          });
                          chart.render();
  
        },
        error: function(data){
          $('#mensajeHeroe').text(`API NO ENCOTRADA: ${data}`);
        },
        dataType: 'json',
      }); // fin ajax
    });//Fin submit
  });//fin ready
  