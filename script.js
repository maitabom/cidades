$(document).ready(function () {
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $('#dismiss, .overlay').on('click', function () {
    $('#sidebar').removeClass('active');
    $('.overlay').removeClass('active');
  });

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').addClass('active');
    $('.overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });

  $("#buscar").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#estados li").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $.ajax({
    type: "GET",
    url: "cidades.csv",
    dataType: "text",
    success: function (data) {
      carregarDados(data);
    }
  });
});

function carregarDados(data) {
  var lines = data.split(/\r?\n/);
  var cidades = new ColecaoCidades();

  for (var i = 1; i < lines.length && lines[i] != ""; i++) {
    var line = lines[i];
    var cols = line.split(',');
    var estado = cols[0];
    var municipio = cols[1];
    var valor = cols[2];

    cidade = new Cidade();
    cidade.nome = municipio;
    cidade.valor = valor;

    cidades.adicionarCidade(estado, cidade);
  }

  cidades.sort();
  cidades.save();

  $('#preloader').fadeOut('slow');
}