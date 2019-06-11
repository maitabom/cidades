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

  $("#buscar").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#estados li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $.ajax({
    type: "GET",
    url: "cidades.csv",
    dataType: "text",
    success: function(data) {
      carregarDados(data);
    }
  });
});

function carregarDados(data) {
    
    
    
    /*
    setTimeout(function (){
        $('#preloader').fadeOut('slow');
    }, 2000);
    */
}