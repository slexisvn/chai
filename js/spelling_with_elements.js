if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Đánh vần với nguyên tố';
  document.getElementsByTagName('label')[0].innerHTML = 'Tên của bạn (không dấu)';
}

$.getJSON('../data/spell_with_elements.json', function(data) {
  input.oninput = function() {
    let IV = this.value.toLowerCase().replace(/[^a-zA-Z]/g, '');
    let filteredList = [];
    let index = [];
    let s = '<ul class=main>'

    for (let i = 0, l = data.en.length; i < l; i++) {
      if (IV.includes(data.en[i].symbol.toLowerCase())) {
        filteredList.push(data.en[i].symbol);
      }
    }

    filteredList.sort((a, b) => b.length - a.length);

    while (IV.length > 0) {
      for (let i = 0, l = filteredList.length; i < l; i++) {
        if (IV.startsWith(filteredList[i].toLowerCase())) {
          index.push(data.en.map(x => x.symbol).indexOf(filteredList[i]));
          IV = IV.slice(filteredList[i].length, IV.length);
          break;
        }
      }
    }

    if (LN === 'vi') {
      for (let i = 0, l = index.length; i < l; i++) {
        s += `<li data-pos='${data.vi[index[i]].number}' class='type-${data.vi[index[i]].type}'><span>${data.vi[index[i]].symbol}</span><span>${data.vi[index[i]].name}</span></li>`;
      }
    } else {
      for (let i = 0, l = index.length; i < l; i++) {
        s += `<li data-pos='${data.en[index[i]].number}' class='type-${data.en[index[i]].type}'><span>${data.en[index[i]].symbol}</span><span>${data.en[index[i]].name}</span></li>`;
      }
    }
    output.innerHTML = `${s}</ul>`;
  }
})