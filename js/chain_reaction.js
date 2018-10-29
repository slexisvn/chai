if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = document.getElementsByTagName('label')[0].innerHTML = 'Chuỗi phương trình';
}

$.getScript("../js/katex.js", function() {
  $.getJSON("../data/chain_reaction.json", function(data) {
    function sub(str) {
      let result = '';
      for (let i = 0; i < str.length; i++) {
        if (isNaN(str.charAt(i))) {
          result += str.charAt(i);
        } else {
          result += `_{${str.charAt(i)}}`;
        }
      }
      return result;
    }

    function check(str, a) {
      let s = str.split(' ');
      let result = '';
      let i = 0;
      while (i < s.length) {
        if (s[i].charAt(s[i].length - 1) === '.') {
          if (a === s[i + 1]) {
            result += `\\textcolor{#e91e63}{${s[i].replace('.', '')}${sub(s[i + 1])}}`;
          } else {
            result += s[i].replace('.', '') + sub(s[i + 1]);
          }
          i += 2;
        } else {
          if (a === s[i]) {
            result += `\\textcolor{#e91e63}{${sub(s[i])}}`;
          } else {
            result += sub(s[i]);
          }
          i++;
        }
        if (i < s.length) {
          result += '+';
        }
      }
      return result;
    }

    cal.onclick = function() {
      let a_arr = input.value.split(' ');
      let html = '\\begin{array}{l}';
      let reac, prod, r = 0;
      let p = 1;
      for (let j = 0; j < a_arr.length - 1; j++) {
        for (let i = 0; i < data.length; i++) {
          reac = ` ${data[i][0]} `;
          prod = ` ${data[i][1]} `;
          if (reac.includes(` ${a_arr[r]} `)) {
            if (prod.includes(` ${a_arr[p]} `)) {
              html += `${check(data[i][0], a_arr[r])}\\longrightarrow ${check(data[i][1], a_arr[p])}\\\\`;
              break;
            }
          }
        }
        r++;
        p++;
      }
      output.innerHTML = katex.renderToString(`${html.replace(/\\$/g, '')}end{array}`, {
        displayMode: true
      });
    }
  })
})