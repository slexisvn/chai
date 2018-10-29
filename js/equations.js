if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Phương trình';
  let lb = document.getElementsByTagName('label');
  lb[0].innerHTML = 'Chất tham gia';
  lb[1].innerHTML = 'Sản phẩm';
  cal.innerHTML = 'Tìm kiếm';
}

function sub(str) {
  return str.replace(/(\d+)/g, '<sub>$1</sub>').replace(/(^|\+|=)<sub>(\d+)<\/sub>/g, '$1$2');
}

$.getJSON("../data/equations.json", function(data) {
  cal.onclick = function() {
    let R = r.value;
    let P = p.value;
    if (R !== '' || P !== '') {
      let reac_arr = R.split(' ');
      let prod_arr = P.split(' ');
      let count = 0;
      let result = '';
      for (let i in data) {
        let EQ = data[i].equation.split('=');
        EQ[0] = `0${EQ[0]} `.replace(/(^|\+)(\d+)|\+/g, ' ');
        EQ[1] = `0${EQ[1]} `.replace(/(^|\+)(\d+)|\+/g, ' ');
        let reac_found = !1;
        for (let j = 0; j < reac_arr.length; j++) {
          reac_found = !1;
          if (EQ[0].includes(` ${reac_arr[j]} `)) {
            reac_found = !0;
          }
          if (reac_found === !1) {
            break
          }
        }
        if (R === '') {
          reac_found = !0
        }
        let prod_found = !1;
        if (reac_found === !0) {
          for (let j = 0; j < prod_arr.length; j++) {
            prod_found = !1;
            if (EQ[1].includes(` ${prod_arr[j]} `)) {
              prod_found = !0
            }
            if (prod_found === !1) {
              break
            }
          }
          if (P === '') {
            prod_found = !0
          }
        }
        if (reac_found && prod_found) {
          result += `<div class=card><p>${sub(data[i].equation).replace(/(\+|=)/g, ' $1 ')}</p>`
          if (LN === 'vi') {
            let t = data[i].languages.vi.conditions;
            if (t.length) {
              result += `<p>− Điều kiện: ${t.toString().replace(/,/g, ', ')}</p>`
            }
            let u = data[i].languages.vi.process;
            if (u) {
              result += `<p>− Qui trình: ${sub(u)}</p>`
            }
            u = data[i].languages.vi.phenomenon;
            if (u) {
              result += `<p>− Hiện tượng: ${sub(u)}</p>`
            }
            t = data[i].languages.vi.categories;
            if (t.length) {
              result += `<p>− Loại phản ứng: ${t.toString().replace(/,/g, ', ')}</p>`
            }
            u = data[i].languages.vi.other;
            if (u) {
              result += `<p>− Thông tin thêm: ${sub(u)}</p>`
            }
          } else {
            let t = data[i].languages.en.conditions;
            if (t.length) {
              result += `<p>− Conditions: ${t.toString().replace(/,/g, ', ')}</p>`
            }
            let u = data[i].languages.en.process;
            if (u) {
              result += `<p>− Proces: ${sub(u)}</p>`
            }
            u = data[i].languages.en.phenomenon;
            if (u) {
              result += `<p>− Phenomenon: ${sub(u)}</p>`
            }
            t = data[i].languages.en.categories;
            if (t.length) {
              result += `<p>− Categories: ${t.toString().replace(/,/g, ', ')}</p>`
            }
            u = data[i].languages.en.other;
            if (u) {
              result += `<p>− Other: ${sub(u)}</p>`
            }
          }
          result += '</div>';
          count++;
        }
        if (count >= 20) {
          break
        }
      }
      output.innerHTML = result;
    }
  }
})