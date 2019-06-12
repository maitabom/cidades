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

  $("#estados li a").on('click', function () {
    var nomeEstado = $(this).html();
    var sigla = $(this).attr('href').replace('#', '');
    atualizarComboCidades(sigla, nomeEstado);
  });

  $("#cidade").select2({
    width: '50%',
    height: '20px',
    placeholder: 'Clique aqui para selecionar um município'
  });

  $.ajax({
    type: "GET",
    url: "cidades.csv",
    dataType: "text",
    success: function (data) {
      carregarDados(data);

      if (window.location.hash != "") {
        var hash = window.location.hash;
        var nomeEstado = obterNomeEstado(hash);
        var sigla = hash.replace('#', '')
        atualizarComboCidades(sigla, nomeEstado);
      }
    }
  });
});

function obterNomeEstado(hash) {
  var opcao = $("#estados li a[href='" + hash + "']");
  return opcao.html();
}

function atualizarComboCidades(sigla, nomeEstado) {
  var cidades = new ColecaoCidades();

  cidades.dataBind();
  $("#cidade").empty();

  var estado = cidades.obterEstado(sigla.toUpperCase());
  var blank = new Option('', '', false, false);
  $("#cidade").append(blank);
  estado.cidades.forEach(function (e) {
    var option = new Option(e.nome, e.nome, false, false);
    $("#cidade").append(option);
  });

  $('#nome_estado').html(nomeEstado);

  $('#presentation').fadeOut();
  $('#form').fadeIn();

  $('#sidebar').removeClass('active');
  $('.overlay').removeClass('active');
}

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