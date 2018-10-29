if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Đánh vần với nguyên tố';
  document.getElementsByTagName('label')[0].innerHTML = 'Tên của bạn (không dấu)';
}

$.getJSON('../data/spell_with_elements.json', function(data) {
  input.oninput = function() {
    let Input = input.value.toLowerCase().replace(/[^a-zA-Z]/g, '');
    let filteredList = [];
    let index = [];
    let s = '<ul class=main>'

    for (let i = 0; i < data.en.length; i++) {
      if (Input.includes(data.en[i].symbol.toLowerCase())) {
        filteredList.push(data.en[i].symbol);
      }
    }

    filteredList.sort(function(a, b) {
      return b.length - a.length;
    });

    while (Input.length > 0) {
      for (let i = 0; i < filteredList.length; i++) {
        if (Input.startsWith(filteredList[i].toLowerCase())) {
          index.push(data.en.map(x => x.symbol).indexOf(filteredList[i]));
          Input = Input.slice(filteredList[i].length, Input.length);
          break;
        }
      }
    }

    if (LN === 'vi') {
      for (let i = 0; i < index.length; i++) {
        s += `<li data-pos='${data.vi[index[i]].number}' class='type-${data.vi[index[i]].type}'><span>${data.vi[index[i]].symbol}</span><span>${data.vi[index[i]].name}</span></li>`;
      }
    } else {
      for (let i = 0; i < index.length; i++) {
        s += `<li data-pos='${data.en[index[i]].number}' class='type-${data.en[index[i]].type}'><span>${data.en[index[i]].symbol}</span><span>${data.en[index[i]].name}</span></li>`;
      }
    }
    output.innerHTML = `${s}</ul>`;
  }
})