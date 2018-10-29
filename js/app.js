
$('#search_key').focus(function() {
  $('.searchbar-icon, .searchbar-disable-button').addClass('searchbar-enabled');
  if ($(this).val() === '') {
    $('.col').show()
  }
}).blur(function() {
  $('.searchbar-icon, .searchbar-disable-button').removeClass('searchbar-enabled');
});

$('#reactivity_series_btn').click(function() {
  $('#reactivity_series').slideToggle('slow')
});

function filter_tools() {
  let filter = search_key.value.toUpperCase();
  let parent = document.getElementsByClassName('card');
  let child;
  for (let i = 0; i < 10; i++) {
    child = parent[i].getElementsByTagName('a')[0].getElementsByTagName('span')[0];
    if (child.innerHTML.toUpperCase().includes(filter)) {
      document.getElementsByClassName('col')[i].style.display = "";
    } else {
      document.getElementsByClassName('col')[i].style.display = "none";
    }
  }
}

var LN = navigator.language.substr(0, 2);
if (LN === 'vi') {
  search_key.placeholder = 'Tìm công cụ';
  let _vi = ['Tính khối lượng mol', 'Cân bằng phương trình', 'Chuỗi phương trình', 'Bảng tính tan', 'Bảng tuần hoàn', 'Phương trình', 'Chất hóa học', 'Cấu trúc 2d của phân tử hữu cơ', 'Cấu trúc 3d của phân tử hữu cơ', 'Dãy điện hóa kim loại', 'Đánh vần với nguyên tố'];
  for (let i = 0; i < 11; i++) {
    document.getElementsByClassName('center')[i].getElementsByTagName('span')[0].innerHTML = _vi[i];
  }
}