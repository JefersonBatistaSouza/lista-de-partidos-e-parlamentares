function getPartidos(link) {
    let html = "";
    $.ajax({
        type: 'GET',
        url: link,
        beforeSend: function () {
            $("#lista-de-partidos").html(html);
        },
        success: function (data) {
            for (var i = 0; i < data['dados'].length; i++) {
                html += '\
                <div class="input-check-partidos">\
                    <input type="checkbox" id="partido'+ data['dados'][i]['id'] + '" name="partidos">\
                    <label for="partidos">'+ data['dados'][i]['nome'] + ' (' + data['dados'][i]['sigla'] + ')</label>\
                    <button type="button" id="'+ data['dados'][i]['id'] + '" onclick="getParlamentar(this.id)">ver Parlamentares</button>\
                </div>\
                <div id="lista-de-parlamentares'+ data['dados'][i]['id'] + '"></div>';
            }
            $("#lista-de-partidos").html(html);
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function getParlamentar(id) {
    if ($("#partido" + id).is(':checked')) {
        console.log(id);
        $.ajax({
            type: 'GET',
            url: 'https://dadosabertos.camara.leg.br/api/v2/partidos/'+id+'/membros/',
            beforeSend: function () {
                $("#lista-de-parlamentares").html("carregando...");
            },
            success: function (data) {
                let html = "<strong>Parlamentares:</strong><ul>"
                for (var i = 0; i < data['dados'].length; i++) {
                    html += '<li id="palamentar'+ data['dados'][i]['id'] + '">'+ data['dados'][i]['nome'] + '</li>';
                }
                html+='</ul>';
                $("#lista-de-parlamentares"+id).html(html);
            },
            error: function (data) {
                console.log(data);
            }
        });
    } else {
        alert("SELECIONE O PARTIDO");
    }
}

