if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Bảng tuần hoàn';
  document.getElementsByClassName('note')[0].innerHTML = '<li class="type-1">Á kim</li><li class="type-8">Họ lanthanide</li><li class="type-3">Kim loại kiềm</li><li class="type-0">Halogens</li><li class="type-9">Họ actinide</li><li class="type-7">Kim loại yếu</li><li class="type-2">Khí hiếm</li><li class="type-5">Phi kim</li><li class="type-4">Kim loại kiềm thổ</li><li class="type-6">Kim loại chuyển tiếp</li><li class="type-10">Thuộc tính không rõ</li>';
  search_elements.dataset.filterPlaceholder = 'Tìm nguyên tố';
  $(".Fe").html('Sắt');
  $(".Cu").html('Đồng');
  $(".Zn").html('Kẽm');
  $(".Hg").html('Thủy ngân');
  $(".Al").html('Nhôm');
  $(".Ag").html('Bạc');
  $(".Au").html('Vàng');
  $(".Sn").html('Thiếc');
  $(".Pb").html('Chì');
  $(".S").html('Lưu huỳnh');
}

$('#search_elements').css({
  'overflow': 'auto',
  'height': `${window.innerHeight - 80}px`
});

$('.legend li[class^="type-"]').click(function() {
  let currentClass = $(this).attr('class').split(' ')[0];
  if (currentClass != 'empty') {
    $('.main > li').addClass('deactivate');
    $('.' + currentClass).removeClass('deactivate')
  }
});
$('.main > li').click(function() {
  let currentClass = $(this).attr('class').split(' ')[0];
  $('.main > li').removeClass('deactivate')
});