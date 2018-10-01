$('li[class^="type-"]').click(function() {
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
$('.search_key').focus(function() {
  $('.searchbar-icon, .searchbar-disable-button').addClass('searchbar-enabled');
  if ($(this).val() === '') {
    $('.main li').css('opacity', 1)
  }
}).blur(function() {
  $('.searchbar-icon, .searchbar-disable-button').removeClass('searchbar-enabled')
});
$('.search_key').on('input', function() {
  $('.main li').css('opacity', 0)
  $('.main li:contains("' + $(this).val() + '")').css('opacity', 1);
  $('.empty').css('opacity', 1)
});

String.prototype.replaceAll = function(search, replacement) {
  let target = this;
  return target.replace(new RegExp(search, 'g'), replacement)
};

function replaceAll(str, map) {
  for (let key in map) {
    str = str.replaceAll(key, map[key])
  }
  return str
}

$('.popup').hide();

$.getJSON('../data/periodic_table.json', function(data) {
  $('.main li a, .close').click(function() {
    $('.page, .popup, #search').toggle();
    let href = $(this).attr('href');
    if (href !== '#') {
      for (var j = 0; j < 118; j++) {
        if ((`#${data[j].name}`) === href) {
          break
        }
      }
      title_element.innerHTML = data[j].name;
      let result = '';
      if (data[j].img !== '') {
        result = `<div class=card><img src="../img/ele/${data[j].img}.jpg" width="100%" /></div>`
      }
      result += '<div class=card><h3>Tính chất chung</h3>';
      for (let i = 0; i < data[j].general.length; i++) {
        let z = data[j].general[i];
        result += `<p>− ${z}</p>`;

        if (z.includes('á kim')) {
          $('.popup .navbar').css({'background': '#f49751'})
        }

        if (z.includes('lanthanide')) {
          $('.popup .navbar').css({'background': '#f9aeb1'})
        }

        if (z.includes('kim loại kiềm')) {
          $('.popup .navbar').css({'background': '#F8B707'})
        }

        if (z.includes('halogen')) {
          $('.popup .navbar').css({'background': '#d9e021'})
        }

        if (z.includes('actinide')) {
          $('.popup .navbar').css({'background': '#c7b299'})
        }

        if (z.includes('kim loại yếu')) {
          $('.popup .navbar').css({'background': '#4CAFFA'})
        }

        if (z.includes('khí hiếm')) {
          $('.popup .navbar').css({'background': '#8cc63f'})
        }

        if (z.includes('phi kim')) {
          $('.popup .navbar').css({'background': '#3bd93b'})
        }

        if (z.includes('kim loại kiềm thổ')) {
          $('.popup .navbar').css({'background': '#f3f300'})
        }

        if (z.includes('kim loại chuyển tiếp')) {
          $('.popup .navbar').css({'background': '#c69c6d'})
        }

        if (z.includes('không biết')) {
          $('.popup .navbar').css({'background': '#d9d9d9'})
        }
      }
      result += '</div><div class=card><h3>Lịch sử</h3>';
      for (let i = 0; i < data[j].history.length; i++) {
        result += `<p>− ${data[j].history[i]}</p>`
      }
      result += '</div><div class=card><h3>Tính chất vật lí</h3>';
      for (let i = 0; i < data[j].physic.length; i++) {
        result += `<p>− ${data[j].physic[i]}</p>`
      }
      result += '</div><div class=card><h3>Tính chất nguyên tử</h3>';
      for (let i = 0; i < data[j].atomic.length; i++) {
        result += `<p>− ${data[j].atomic[i]}</p>`
      }
      result += '</div><div class=card><h3>Khác</h3>';
      for (let i = 0; i < data[j].other.length; i++) {
        result += `<p>− ${data[j].other[i]}</p>`
      }
      result += '</div><div class=card><h3>Những đồng vị ổn định nhất</h3><div class=overflow-nowrap><table border=1 cellspacing=0 width="100%"><tr><th>Đồng vị</th><th>Nguồn tự nhiên</th><th>Chu kì bán rã</th><th>Phân rã</th><th>Năng lượng phân rã (Mev)</th><th>Sản phẩm phân rã</th></tr>';
      for (let i = 0; i < data[j].isotopes.length; i++) {
        result += `<tr align=center><td>${data[j].isotopes[i]}</td></tr>`
      }
      result += '</table></div></div>';
      let map = {
        '\\|': '<sup>',
        '\\?\\:': '</sup>',
        '!': '<sub>',
        '@': '</sub>',
        ' \\\\ \\?="': '</td><td colspan="',
        ' \\\\ \\.="': '</td><td rowspan="',
        ' \\\\ ': '</td><td>'
      };
      output.innerHTML = replaceAll(result, map)
    }
  })
})