if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = document.getElementsByTagName('label')[0].innerHTML = 'Chuỗi phương trình';
  document.getElementsByTagName('button')[0].innerHTML = 'Tính';
}

$.getJSON("../data/chain_reaction.json", function(data) {
  function sub(str) {
    let result = '';
    for (let i = 0, l = str.length; i < l; i++) {
      result += isNaN(str.charAt(i)) ? str.charAt(i) : `<sub>${str.charAt(i)}</sub>`;
    }
    return result;
  }

  function check(str, a) {
    let s = str.split(' ');
    let result = '';
    let i = 0;
    while (i < s.length) {
      if (s[i].charAt(s[i].length - 1) === '.') {
        result += a === s[i + 1] ? `<span style="color:#e91e63">${s[i].replace('.', '')}${sub(s[i + 1])}</span>` : s[i].replace('.', '') + sub(s[i + 1]);
        i += 2;
      } else {
        result += a === s[i] ? `<span style="color:#e91e63">${sub(s[i])}</span>` : sub(s[i]);
        i++;
      }
      if (i < s.length) {
        result += '+';
      }
    }
    return result;
  }

  document.getElementsByTagName('button')[0].onclick = function() {
    let IV = input.value.split(' ');
    let result = '';
    let reac, prod, r = 0;
    let p = 1;
    for (let j = 0, l = IV.length - 1; j < l; j++) {
      for (let i = 0, l1 = data.length; i < l1; i++) {
        reac = ` ${data[i][0]} `;
        prod = ` ${data[i][1]} `;
        if (reac.includes(` ${IV[r]} `)) {
          if (prod.includes(` ${IV[p]} `)) {
            result += `${check(data[i][0], IV[r])} ⟶ ${check(data[i][1], IV[p])}<br>`;
            break;
          }
        }
      }
      r++;
      p++;
    }
    ocalc.innerHTML = result.replace(/<br\>$/g, '').replace(/\+/g, ' + ');
  }
})