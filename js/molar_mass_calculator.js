if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Tính khối lượng mol';
  document.getElementsByTagName('label')[0].innerHTML = 'Công thức';
  document.getElementsByTagName('button')[0].innerHTML = 'tính';
}

atom = {
  "H": 1.00794,
  "He": 4.0026,
  "Li": 6.941,
  "Be": 9.01218,
  "B": 10.811,
  "C": 12.011,
  "N": 14.0067,
  "O": 15.9994,
  "F": 18.9984,
  "Ne": 20.1797,
  "Na": 22.98977,
  "Mg": 24.305,
  "Al": 26.98154,
  "Si": 28.0855,
  "P": 30.97376,
  "S": 32.066,
  "Cl": 35.4527,
  "Ar": 39.948,
  "K": 39.0983,
  "Ca": 40.078,
  "Sc": 44.9559,
  "Ti": 47.88,
  "V": 50.9415,
  "Cr": 51.996,
  "Mn": 54.938,
  "Fe": 55.847,
  "Co": 58.9332,
  "Ni": 58.6934,
  "Cu": 63.546,
  "Zn": 65.39,
  "Ga": 69.723,
  "Ge": 72.61,
  "As": 74.9216,
  "Se": 78.96,
  "Br": 79.904,
  "Kr": 83.8,
  "Rb": 85.4678,
  "Sr": 87.62,
  "Y": 88.9059,
  "Zr": 91.224,
  "Nb": 92.9064,
  "Mo": 95.94,
  "Tc": 98,
  "Ru": 101.07,
  "Rh": 102.9055,
  "Pd": 106.42,
  "Ag": 107.868,
  "Cd": 112.41,
  "In": 114.82,
  "Sn": 118.71,
  "Sb": 121.757,
  "Te": 127.6,
  "I": 126.9045,
  "Xe": 131.29,
  "Cs": 132.9054,
  "Ba": 137.33,
  "La": 138.9055,
  "Hf": 178.49,
  "Ta": 180.9479,
  "W": 183.85,
  "Re": 186.207,
  "Os": 190.2,
  "Ir": 192.22,
  "Pt": 195.08,
  "Au": 196.9665,
  "Hg": 200.59,
  "Tl": 204.383,
  "Pb": 207.2,
  "Bi": 208.9804,
  "Po": 209,
  "At": 210,
  "Rn": 222,
  "Fr": 223,
  "Ra": 226.0254,
  "Ac": 227,
  "Rf": 261,
  "Db": 262,
  "Sg": 266,
  "Bh": 264,
  "Hs": 277,
  "Mt": 268,
  "Ds": 271,
  "Rg": 272,
  "Cn": 285,
  "Nh": 284,
  "Fl": 289,
  "Mc": 288,
  "Lv": 292,
  "Ts": 294,
  "Og": 294,
  "Ce": 140.12,
  "Pr": 140.9077,
  "Nd": 144.24,
  "Pm": 145,
  "Sm": 150.36,
  "Eu": 151.965,
  "Gd": 157.25,
  "Tb": 158.9253,
  "Dy": 162.5,
  "Ho": 164.9303,
  "Er": 167.26,
  "Tm": 168.9342,
  "Yb": 173.04,
  "Lu": 174.967,
  "Th": 232.0381,
  "Pa": 231.0359,
  "U": 238.029,
  "Np": 237.0482,
  "Pu": 244,
  "Am": 243,
  "Cm": 247,
  "Bk": 247,
  "Cf": 251,
  "Es": 252,
  "Fm": 257,
  "Md": 258,
  "No": 259,
  "Lr": 262
}
uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
lowercase = "abcdefghijklmnopqrstuvwxyz";
number = "0123456789";

function calculate(formula) {
  total = [];
  level = 0;
  total[0] = 0;
  i = 0;
  mass = 0;
  name = '';
  percision = 8;
  elmass = [];
  for (i = 0; i < elmass.length; i++) {
    elmass[i] = null
  }
  elmass[0] = [];
  for (i = 0; i < elmass[0].length; i++) {
    elmass[0][i] = 0
  }
  i = 0;
  while (formula.charAt(i) != "") {
    if (!`${uppercase + lowercase + number}()`.includes(formula.charAt(i))) {
      i++;
    }
    while (formula.charAt(i) == "(") {
      level++;
      i++;
      total[level] = 0;
      elmass[level] = [];
      for (h = 0; i < elmass[level].length; h++) {
        elmass[level][i] = 0
      }
    }
    if (formula.charAt(i) == ")") {
      mass = total[level];
      name = '';
      level--
    } else if (uppercase.includes(formula.charAt(i))) {
      name = formula.charAt(i);
      while (lowercase.includes(formula.charAt(i + 1)) && formula.charAt(i + 1) != "") {
        name += formula.charAt(++i);
      }
      mass = atom[name];
      massStr = `${mass}`;
      if (massStr.includes(".")) {
        masspercis = (massStr.substring(massStr.indexOf(".") + 1, massStr.length)).length;
      } else {
        masspercis = 0;
      }
      percision = (percision == 8 || percision > masspercis) ? masspercis : percision
    }
    let amount = "";
    while (number.includes(formula.charAt(i + 1)) && formula.charAt(i + 1) != "") {
      amount += formula.charAt(++i);
    }
    if (amount == "") {
      amount = "1";
    }
    total[level] += mass * parseInt(amount);
    if (name == "") {
      for (ele in elmass[level + 1]) {
        totalnumber = parseInt(elmass[level + 1][ele]) * amount
        if (elmass[level][ele] == null) {
          elmass[level][ele] = totalnumber;
        } else {
          elmass[level][ele] = totalnumber + parseInt(elmass[level][ele])
        }
      }
    } else {
      if (elmass[level][name] == null) {
        elmass[level][name] = amount;
      } else {
        elmass[level][name] = parseInt(elmass[level][name]) + parseInt(amount)
      }
    }
    i++
  }
  weight = rounded(total[0], percision);
  let result = `<span>${formula.replace(/(\d+)/g, '<sub>$1</sub>')} = ${weight} g/mol</span><ul>`;
  for (ele in elmass[0]) {
    eltotal = eval(elmass[0][ele] * atom[ele]);
    result += `<li>%${ele} = ${rounded(eltotal / total[0] * 100, percision)}%</li>`
  }
  return `${result}</ul>`
}

function rounded(number, percision) {
  return Math.round(number * (10 ** percision)) / (10 ** percision)
}

document.getElementsByTagName('button')[0].onclick = function() {
  ocalc.innerHTML = calculate(input.value);
  return false
}