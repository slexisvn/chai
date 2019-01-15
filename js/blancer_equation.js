function balance(formulaStr) {
  setMessage("");
  var balancedElem;
  var codeOutElem = document.getElementById("codeOutput");
  removeAllChildren(codeOutElem);
  appendText(" ", codeOutElem);
  var eqn;
  try {
    eqn = parse(formulaStr)
  } catch (e) {
    if (typeof e == "string") {
      setMessage("Syntax error: " + e)
    } else if ("start" in e) {
      setMessage("Syntax error: " + e.message);
      var start = e.start;
      var end = "end" in e ? e.end : e.start;
      while (end > start && (formulaStr.charAt(end - 1) == " " || formulaStr.charAt(end - 1) == "\t"))
        end--;
      if (start == end)
        end++;
      appendText(formulaStr.substring(0, start), codeOutElem);
      var highlight = document.createElement("u");
      if (end <= formulaStr.length) {
        appendText(formulaStr.substring(start, end), highlight);
        codeOutElem.appendChild(highlight);
        appendText(formulaStr.substring(end, formulaStr.length), codeOutElem)
      } else {
        appendText(" ", highlight);
        codeOutElem.appendChild(highlight)
      }
    } else {
      setMessage("Assertion error")
    }
    return
  }
  try {
    var matrix = buildMatrix(eqn);
    solve(matrix);
    var coefs = extractCoefficients(matrix);
    checkAnswer(eqn, coefs);
    return eqn.toHtml(coefs).textContent
  } catch (e) {
    setMessage(e.toString())
  }
}

function buildMatrix(eqn) {
  var elems = eqn.getElements();
  var rows = elems.length + 1;
  var cols = eqn.getLeftSide().length + eqn.getRightSide().length + 1;
  var matrix = new Matrix(rows, cols);
  for (var i = 0; i < elems.length; i++) {
    var j = 0;
    for (var k = 0, lhs = eqn.getLeftSide(); k < lhs.length; j++, k++)
      matrix.set(i, j, lhs[k].countElement(elems[i]));
    for (var k = 0, rhs = eqn.getRightSide(); k < rhs.length; j++, k++)
      matrix.set(i, j, -rhs[k].countElement(elems[i]));
  }
  return matrix
}

function solve(matrix) {
  matrix.gaussJordanEliminate();
  var i;
  for (i = 0; i < matrix.rowCount() - 1; i++) {
    if (countNonzeroCoeffs(matrix, i) > 1)
      break
  }
  if (i == matrix.rowCount() - 1)
    throw "All-zero solution";
  matrix.set(matrix.rowCount() - 1, i, 1);
  matrix.set(matrix.rowCount() - 1, matrix.columnCount() - 1, 1);
  matrix.gaussJordanEliminate()
}

function countNonzeroCoeffs(matrix, row) {
  var count = 0;
  for (var i = 0; i < matrix.columnCount(); i++) {
    if (matrix.get(row, i) != 0)
      count++
  }
  return count
}

function extractCoefficients(matrix) {
  var rows = matrix.rowCount();
  var cols = matrix.columnCount();
  if (cols - 1 > rows || matrix.get(cols - 2, cols - 2) == 0)
    throw "Multiple independent solutions";
  var lcm = 1;
  for (var i = 0; i < cols - 1; i++)
    lcm = checkedMultiply(lcm / gcd(lcm, matrix.get(i, i)), matrix.get(i, i));
  var coefs = [];
  var allzero = !0;
  for (var i = 0; i < cols - 1; i++) {
    var coef = checkedMultiply(lcm / matrix.get(i, i), matrix.get(i, cols - 1));
    coefs.push(coef);
    allzero &= coef == 0
  }
  if (allzero)
    throw "Assertion error: All-zero solution";
  return coefs
}

function checkAnswer(eqn, coefs) {
  if (coefs.length != eqn.getLeftSide().length + eqn.getRightSide().length)
    throw "Assertion error: Mismatched length";
  var allzero = !0;
  coefs.forEach(function(coef) {
    if (typeof coef != "number" || isNaN(coef) || Math.floor(coef) != coef)
      throw "Assertion error: Not an integer";
    allzero &= coef == 0
  });
  if (allzero)
    throw "Assertion error: All-zero solution";
  var elems = eqn.getElements();
  for (var i = 0; i < elems.length; i++) {
    var sum = 0;
    var j = 0;
    for (var k = 0, lhs = eqn.getLeftSide(); k < lhs.length; j++, k++)
      sum = checkedAdd(sum, checkedMultiply(lhs[k].countElement(elems[i]), coefs[j]));
    for (var k = 0, rhs = eqn.getRightSide(); k < rhs.length; j++, k++)
      sum = checkedAdd(sum, checkedMultiply(rhs[k].countElement(elems[i]), -coefs[j]));
    if (sum != 0)
      throw "Assertion error: Incorrect balance"
  }
}

function Equation(lhs, rhs) {
  lhs = lhs.clone();
  rhs = rhs.clone();
  this.getLeftSide = function() {
    return lhs.clone()
  };
  this.getRightSide = function() {
    return rhs.clone()
  };
  this.getElements = function() {
    var result = new Set();
    lhs.forEach(function(item) {
      item.getElements(result)
    });
    rhs.forEach(function(item) {
      item.getElements(result)
    });
    return result.toArray()
  };
  this.toHtml = function(coefs) {
    if (coefs !== undefined && coefs.length != lhs.length + rhs.length)
      throw "Mismatched number of coefficients";

    function createSpan(text, className) {
      var span = document.createElement("span");
      appendText(text, span);
      span.className = className;
      return span
    }
    var node = document.createElement("span");
    var j = 0;

    function termsToHtml(terms) {
      var head = !0;
      for (var i = 0; i < terms.length; i++, j++) {
        var coef = coefs !== undefined ? coefs[j] : 1;
        if (coef != 0) {
          if (head) head = !1;
          else node.appendChild(createSpan(" + ", "plus"));
          if (coef != 1)
            node.appendChild(createSpan(coef.toString().replace(/-/, MINUS), "coefficient"));
          node.appendChild(terms[i].toHtml())
        }
      }
    }
    termsToHtml(lhs);
    node.appendChild(createSpan(" " + RIGHT_ARROW + " ", "rightarrow"));
    termsToHtml(rhs);
    return node
  }
}

function Term(items, charge) {
  if (items.length == 0 && charge != -1)
    throw "Invalid term";
  items = items.clone();
  this.getItems = function() {
    return items.clone()
  };
  this.getElements = function(resultSet) {
    resultSet.add("e");
    items.forEach(function(item) {
      item.getElements(resultSet)
    })
  };
  this.countElement = function(name) {
    if (name == "e") {
      return -charge
    } else {
      var sum = 0;
      items.forEach(function(item) {
        sum = checkedAdd(sum, item.countElement(name))
      });
      return sum
    }
  };
  this.toHtml = function() {
    var node = document.createElement("span");
    if (items.length == 0 && charge == -1) {
      appendText(`e<sup>${MINUS}</sup>`, node)
    } else {
      items.forEach(function(item) {
        node.appendChild(item.toHtml())
      });
      if (charge != 0) {
        var s;
        if (Math.abs(charge) == 1) s = "";
        else s = Math.abs(charge).toString();
        if (charge > 0) s += "+";
        else s += MINUS;
        appendText(`<sup>${s}</sup>`, node)
      }
    }
    return node
  }
}

function Group(items, count) {
  if (count < 1)
    throw "Assertion error: Count must be a positive integer";
  items = items.clone();
  this.getItems = function() {
    return items.clone()
  };
  this.getCount = function() {
    return count
  };
  this.getElements = function(resultSet) {
    items.forEach(function(item) {
      item.getElements(resultSet)
    })
  };
  this.countElement = function(name) {
    var sum = 0;
    items.forEach(function(item) {
      sum = checkedAdd(sum, checkedMultiply(item.countElement(name), count))
    });
    return sum
  };
  this.toHtml = function() {
    var node = document.createElement("span");
    appendText("(", node);
    items.forEach(function(item) {
      node.appendChild(item.toHtml())
    });
    appendText(")", node);
    if (count != 1) {
      appendText(`<sub>${count.toString()}</sub>`, node)
    }
    return node
  }
}

function Element(name, count) {
  if (count < 1)
    throw "Assertion error: Count must be a positive integer";
  this.getName = function() {
    return name
  };
  this.getCount = function() {
    return count
  };
  this.getElements = function(resultSet) {
    resultSet.add(name)
  };
  this.countElement = function(n) {
    return n == name ? count : 0
  };
  this.toHtml = function() {
    var node = document.createElement("span");
    appendText(name, node);
    if (count != 1) {
      appendText(`<sub>${count.toString()}</sub>`, node)
    }
    return node
  }
}

function parse(formulaStr) {
  var tokenizer = new Tokenizer(formulaStr);
  return parseEquation(tokenizer)
}

function parseEquation(tok) {
  var lhs = [];
  var rhs = [];
  lhs.push(parseTerm(tok));
  while (!0) {
    var next = tok.peek();
    if (next == "=") {
      tok.consume("=");
      break
    } else if (next == null) {
      throw {
        message: "Plus or equal sign expected",
        start: tok.position()
      }
    } else if (next == "+") {
      tok.consume("+");
      lhs.push(parseTerm(tok))
    } else throw {
      message: "Plus expected",
      start: tok.position()
    }
  }
  rhs.push(parseTerm(tok));
  while (!0) {
    var next = tok.peek();
    if (next == null)
      break;
    else if (next == "+") {
      tok.consume("+");
      rhs.push(parseTerm(tok))
    } else throw {
      message: "Plus or end expected",
      start: tok.position()
    }
  }
  return new Equation(lhs, rhs)
}

function parseTerm(tok) {
  var startPosition = tok.position();
  var items = [];
  while (!0) {
    var next = tok.peek();
    if (next == null)
      break;
    else if (next == "(")
      items.push(parseGroup(tok));
    else if (/^[A-Za-z][a-z]*$/.test(next))
      items.push(parseElement(tok));
    else break
  }
  var charge = 0;
  var next = tok.peek();
  if (next != null && next == "^") {
    tok.consume("^");
    next = tok.peek();
    if (next == null)
      throw {
        message: "Number or sign expected",
        start: tok.position()
      };
    else charge = parseOptionalNumber(tok);
    next = tok.peek();
    if (next == "+")
      charge = +charge;
    else if (next == "-")
      charge = -charge;
    else throw {
      message: "Sign expected",
      start: tok.position()
    };
    tok.take()
  }
  var elems = new Set();
  for (var i = 0; i < items.length; i++)
    items[i].getElements(elems);
  elems = elems.toArray();
  if (items.length == 0) {
    throw {
      message: "Invalid term - empty",
      start: startPosition,
      end: tok.position()
    }
  } else if (elems.indexOf("e") != -1) {
    if (items.length > 1)
      throw {
        message: "Invalid term - electron needs to stand alone",
        start: startPosition,
        end: tok.position()
      };
    else if (charge != 0 && charge != -1)
      throw {
        message: "Invalid term - invalid charge for electron",
        start: startPosition,
        end: tok.position()
      };
    items = [];
    charge = -1
  } else {
    for (var i = 0; i < elems.length; i++) {
      if (/^[a-z]+$/.test(elems[i]))
        throw {
          message: 'Invalid element name "' + elems[i] + '"',
          start: startPosition,
          end: tok.position()
        }
    }
  }
  return new Term(items, charge)
}

function parseGroup(tok) {
  var startPosition = tok.position();
  tok.consume("(");
  var items = [];
  while (!0) {
    var next = tok.peek();
    if (next == null)
      throw {
        message: "Element, group, or closing parenthesis expected",
        start: tok.position()
      };
    else if (next == "(")
      items.push(parseGroup(tok));
    else if (/^[A-Za-z][a-z]*$/.test(next))
      items.push(parseElement(tok));
    else if (next == ")") {
      tok.consume(")");
      if (items.length == 0)
        throw {
          message: "Empty group",
          start: startPosition,
          end: tok.position()
        };
      break
    } else throw {
      message: "Element, group, or closing parenthesis expected",
      start: tok.position()
    }
  }
  return new Group(items, parseOptionalNumber(tok))
}

function parseElement(tok) {
  var name = tok.take();
  if (!/^[A-Za-z][a-z]*$/.test(name))
    throw "Assertion error";
  return new Element(name, parseOptionalNumber(tok))
}

function parseOptionalNumber(tok) {
  var next = tok.peek();
  if (next != null && /^[0-9]+$/.test(next))
    return checkedParseInt(tok.take());
  else return 1
}

function Tokenizer(str) {
  var i = 0;
  this.position = function() {
    return i
  };
  this.peek = function() {
    if (i == str.length)
      return null;
    var match = /^([A-Za-z][a-z]*|[0-9]+|[+\-^=()])/.exec(str.substring(i));
    if (match == null)
      throw {
        message: "Invalid symbol",
        start: i
      };
    return match[0]
  };
  this.take = function() {
    var result = this.peek();
    if (result == null)
      throw "Advancing beyond last token";
    i += result.length;
    skipSpaces();
    return result
  };
  this.consume = function(s) {
    if (this.take() != s)
      throw "Token mismatch"
  };

  function skipSpaces() {
    var match = /^[ \t]*/.exec(str.substring(i));
    i += match[0].length
  }
  str = str.replace(/\u2212/g, "-");
  skipSpaces()
}

function Matrix(rows, cols) {
  if (rows < 0 || cols < 0)
    throw "Illegal argument";
  var row = [];
  for (var j = 0; j < cols; j++)
    row.push(0);
  var cells = [];
  for (var i = 0; i < rows; i++)
    cells.push(row.clone());
  row = null;
  this.rowCount = function() {
    return rows
  };
  this.columnCount = function() {
    return cols
  };
  this.get = function(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols)
      throw "Index out of bounds";
    return cells[r][c]
  };
  this.set = function(r, c, val) {
    if (r < 0 || r >= rows || c < 0 || c >= cols)
      throw "Index out of bounds";
    cells[r][c] = val
  };

  function swapRows(i, j) {
    if (i < 0 || i >= rows || j < 0 || j >= rows)
      throw "Index out of bounds";
    var temp = cells[i];
    cells[i] = cells[j];
    cells[j] = temp
  }

  function addRows(x, y) {
    var z = [];
    for (var i = 0; i < x.length; i++)
      z.push(checkedAdd(x[i], y[i]));
    return z
  }

  function multiplyRow(x, c) {
    return x.map(function(val) {
      return checkedMultiply(val, c)
    })
  }

  function gcdRow(x) {
    var result = 0;
    x.forEach(function(val) {
      result = gcd(val, result)
    });
    return result
  }

  function simplifyRow(x) {
    var sign = 0;
    for (var i = 0; i < x.length; i++) {
      if (x[i] > 0) {
        sign = 1;
        break
      } else if (x[i] < 0) {
        sign = -1;
        break
      }
    }
    var y = x.clone();
    if (sign == 0)
      return y;
    var g = gcdRow(x) * sign;
    for (var i = 0; i < y.length; i++)
      y[i] /= g;
    return y
  }
  this.gaussJordanEliminate = function() {
    cells = cells.map(simplifyRow);
    var numPivots = 0;
    for (var i = 0; i < cols; i++) {
      var pivotRow = numPivots;
      while (pivotRow < rows && cells[pivotRow][i] == 0)
        pivotRow++;
      if (pivotRow == rows)
        continue;
      var pivot = cells[pivotRow][i];
      swapRows(numPivots, pivotRow);
      numPivots++;
      for (var j = numPivots; j < rows; j++) {
        var g = gcd(pivot, cells[j][i]);
        cells[j] = simplifyRow(addRows(multiplyRow(cells[j], pivot / g), multiplyRow(cells[i], -cells[j][i] / g)))
      }
    }
    for (var i = rows - 1; i >= 0; i--) {
      var pivotCol = 0;
      while (pivotCol < cols && cells[i][pivotCol] == 0)
        pivotCol++;
      if (pivotCol == cols)
        continue;
      var pivot = cells[i][pivotCol];
      for (var j = i - 1; j >= 0; j--) {
        var g = gcd(pivot, cells[j][pivotCol]);
        cells[j] = simplifyRow(addRows(multiplyRow(cells[j], pivot / g), multiplyRow(cells[i], -cells[j][pivotCol] / g)))
      }
    }
  };
  this.toString = function() {
    var result = "[";
    for (var i = 0; i < rows; i++) {
      if (i != 0) result += "],\n";
      result += "[";
      for (var j = 0; j < cols; j++) {
        if (j != 0) result += ", ";
        result += cells[i][j]
      }
      result += "]"
    }
    return result + "]"
  }
}

function Set() {
  var items = [];
  this.add = function(obj) {
    if (items.indexOf(obj) == -1)
      items.push(obj)
  };
  this.contains = function(obj) {
    return items.indexOf(obj) != -1
  };
  this.toArray = function() {
    return items.clone()
  }
}
var INT_MAX = 9007199254740992;

function checkedParseInt(str) {
  var result = parseInt(str, 10);
  if (isNaN(result))
    throw "Not a number";
  if (result <= -INT_MAX || result >= INT_MAX)
    throw "Arithmetic overflow";
  return result
}

function checkedAdd(x, y) {
  var z = x + y;
  if (z <= -INT_MAX || z >= INT_MAX)
    throw "Arithmetic overflow";
  return z
}

function checkedMultiply(x, y) {
  var z = x * y;
  if (z <= -INT_MAX || z >= INT_MAX)
    throw "Arithmetic overflow";
  return z
}

function gcd(x, y) {
  if (typeof x != "number" || typeof y != "number" || isNaN(x) || isNaN(y))
    throw "Invalid argument";
  x = Math.abs(x);
  y = Math.abs(y);
  while (y != 0) {
    var z = x % y;
    x = y;
    y = z
  }
  return x
}
var MINUS = "-";
var RIGHT_ARROW = "⟶";
Array.prototype.clone = Array.prototype.slice;

function setMessage(str) {
  var messageElem = document.getElementById("message");
  removeAllChildren(messageElem);
  appendText(str, messageElem)
}

function removeAllChildren(node) {
  while (node.firstChild != null)
    node.removeChild(node.firstChild)
}

function appendText(text, node) {
  node.appendChild(document.createTextNode(text))
}

if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Cân bằng phương trình';
  document.getElementsByTagName('label')[0].innerHTML = 'Phương trình';
  document.getElementsByTagName('button')[0].innerHTML = 'cân bằng'
}

document.getElementsByTagName('button')[0].onclick = function() {
  ocalc.innerHTML = balance(input.value)
  return false;
}