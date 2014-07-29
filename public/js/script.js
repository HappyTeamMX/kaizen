$(function () {

  $('.pop').popover({
    html: true,
    content: function () {
      return $(this).children('.popover').html();
    }
  });
  $('.status').addClass('fa fa-circle');

  //$('.diagram').diagram();

});

