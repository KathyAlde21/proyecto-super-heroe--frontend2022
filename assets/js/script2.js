$(function () {

    var imagenReemplazo = ''

    $('form').submit(function (event) {
        event.preventDefault()

        $('#msg').text('Cargando . . .')
        let valueInput = $('#inputHero').val();

        //Validación que solo admite números en el form
        var validateReg = /[0-9]/gim;
        let validateID = validateReg.test(valueInput);

        if (!valueInput) {
            $('#msgInput').text('Por favor ingresa un número.')
            // alert("Por favor ingresa un número.");
        } else {
            if (!validateID) {
                $('#msgInput').text('Por favor ingresa sólo números.')
                // alert("Por favor ingresa sólo números.");
            }
            if (valueInput < 1 || valueInput > 732) {
                $('#msgInput').text('Por favor ingresa números del 1 al 732.')
                // alert("Por favor ingresa números del 1 al 732.");
            }
            $('#msgInput').text('')
            $('#respuesta').removeClass('d-none')

            window.scrollTo(0, 510);

            $.ajax({
                type: 'GET',
                url: `https://www.superheroapi.com/api.php/4905856019427443/${valueInput}`,
                success: function (data) {
                    $('#msg').hide()

                    let imagen = data.image.url
                    let nombre = data.name
                    let conexiones = data.connections['group-affiliation']
                    let publicado = data.biography.publisher
                    let ocupacion = data.work.occupation
                    let primeraAparicion = data.biography['first-appearance']
                    let altura = data.appearance.height[1]
                    let peso = data.appearance.weight[1]
                    let aliados = data.biography.aliases
                    let aliadosList = []

                    for (let i of aliados) {
                        i = ' ' + i
                        aliadosList.push(i)
                    }

                    $('#nombre').text(`${nombre}`)
                    $('#conexiones').text(`${conexiones}`)
                    $('#publicado').text(`${publicado}`)
                    $('#ocupacion').text(`${ocupacion}`)
                    $('#primera').text(`${primeraAparicion}`)
                    $('#altura').text(`${altura}`)
                    $('#peso').text(`${peso}`)
                    $('#aliados').text(`${aliadosList}`)

                    $('#imagenHero').attr('src', `${imagen}`)

                    let combat = parseInt(data.powerstats.combat)
                    if (!combat) {
                        combat = 0
                    }
                    let durability = parseInt(data.powerstats.durability)
                    if (!durability) {
                        durability = 0
                    }
                    let intelligence = parseInt(data.powerstats.intelligence)
                    if (!intelligence) {
                        intelligence = 0
                    }
                    let power = parseInt(data.powerstats.power)
                    if (!power) {
                        power = 0
                    }
                    let speed = parseInt(data.powerstats.speed)
                    if (!speed) {
                        speed = 0
                    }
                    let strength = parseInt(data.powerstats.strength)
                    if (!strength) {
                        strength = 0
                    }

                    var chart = new CanvasJS.Chart("chartContainer", {
                        theme: "dark2", // "light1", "light2", "dark1", "dark2"
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: `${nombre}`
                        },
                        data: [{
                            type: "pie",
                            startAngle: 25,
                            toolTipContent: "{label}: {y}",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 13,
                            indexLabel: "{label} - {y}",
                            dataPoints: [
                                {y: combat, label: "combat"},
                                {y: durability, label: "durability"},
                                {y: intelligence, label: "intelligence"},
                                {y: power, label: "power"},
                                {y: speed, label: "speed"},
                                {y: strength, label: "strength"},
                            ]
                        }]
                    });
                    chart.render();
                }
            });
        }

    })

    // imagen reemplazo si es que trae errores
    $('#imagenHero').on('error', function () {
        imagenReemplazo = 'assets/img/favicon/favicon.png'
        $('#imagenHero').attr('src', imagenReemplazo)
    })

    // navbar ACTIVE
    $(".nav-link").on("click", function () {
        $(".navbar-nav, .nav-link").find(".active").removeClass("active fw-bolder");
        $(this).addClass("active fw-bolder");
    });

    $(".nav-link").on("click", function () {
        if (this.id == 'buscarNav') {
            window.scrollTo(0, 510);
        }
        if (this == 'inicioNav') {
            window.scrollTo(0, 10);
        }
    });
})