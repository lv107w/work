define(['jquery'], function ($) {
  $('.wrap').on('click', function () {
    $(this).css({
      backgroundColor: "red"
    })
  });
  return {
    msg: 'jquery is loaded'
  }
})