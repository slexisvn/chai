
$('#search_tools').focus(function() {
  $('.searchbar-icon, .searchbar-disable-button').addClass('searchbar-enabled');
  if ($(this).val() === '') {
    $('.col').show()
  }
}).blur(function() {
  $('.searchbar-icon, .searchbar-disable-button').removeClass('searchbar-enabled');
});

$('#search_tools').on('input', function() {
  let v = $(this).val().toLowerCase();
  $('.col').filter(function() {
    $(this).toggle($(this).text().toLowerCase().includes(v))
  })
});

$('#reactivity_series').hide();

$('#reactivity_series_btn').click(function() {
  $('#reactivity_series').slideToggle('slow')
});

var LN = navigator.language.substr(0, 2);
var atg = document.getElementsByTagName('a');
if (LN === 'vi') {
  search_tools.placeholder = 'Tìm công cụ';
  let _vi = ['Tính khối lượng mol', 'Cân bằng phương trình', 'Chuỗi phương trình', 'Bảng tính tan', 'Bảng tuần hoàn', 'Phương trình', 'Chất hóa học', 'Cấu trúc 2d của phân tử hữu cơ', 'Cấu trúc 3d của phân tử hữu cơ', 'Dãy điện hóa kim loại', 'Đánh vần với nguyên tố'];
  for (let i = 0; i < 11; i++) {
    document.getElementsByClassName('center')[i].getElementsByTagName('span')[0].innerHTML = _vi[i];
  }
  atg[0].href = 'pages/docs-vi.html';
  atg[6].href = 'pages/periodic_table-vi.html';
}

var elept = '';