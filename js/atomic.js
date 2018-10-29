if (LN === 'vi') {
  document.getElementsByTagName('label')[0].innerHTML = document.getElementsByClassName('title')[1].innerHTML = 'Chất hóa học';
  document.getElementsByTagName('button')[0].innerHTML = 'Tìm kiếm';
  input.placeholder = 'bạc, Ag';
}
$.getJSON('../data/atomic.json', function(data) {
  cal.onclick = function() {
    let atomic = input.value;
    let result = '';
    for (let x in data) {
      if (LN === 'vi') {
        if (data[x].formula === atomic || data[x].vietnamese_name.split('; ').map(x => x.toUpperCase()).includes(atomic.toUpperCase())) {
          result += `<div class=card><p>${data[x].formula.replace(/(\d+)/g, '<sub>$1</sub>')}</p><p>− Tên: ${data[x].vietnamese_name}</p>`;
          if (data[x].mass !== '') {
            result += `<p>− Khối lượng mol: ${data[x].mass} g/mol</p>`
          }
          if (data[x].weight !== '') {
            result += `<p>− Trọng lượng riêng: ${data[x].weight} kg/m<sup>3</sup>`
          }
          if (data[x].languages.vi.color !== '') {
            result += `<p>− Màu sắc: ${data[x].languages.vi.color}</p>`
          }
          if (data[x].languages.vi.status !== '') {
            result += `<p>− Trạng thái: ${data[x].languages.vi.status}</p>`
          }
          if (data[x].boiling_temperature !== '') {
            result += `<p>− Nhiệt độ sôi: ${data[x].boiling_temperature}°C</p>`
          }
          if (data[x].melting_temperature !== '') {
            result += `<p>− Nhiệt độ nóng chảy: ${data[x].melting_temperature}°C</p>`
          }
          if (data[x].electronegativity !== '') {
            result += `<p>− Độ âm điện: ${data[x].electronegativity}</p>`
          }
          if (data[x].ion_power !== '') {
            result += `<p>− Năng lượng ion: ${data[x].ion_power}</p>`
          }
          result += '</div>'
          break;
        }
      } else {
        if (data[x].formula === atomic || data[x].english_name.split('; ').map(x => x.toUpperCase()).includes(atomic.toUpperCase())) {
          result += `<div class=card><p>${data[x].formula.replace(/(\d+)/g, '<sub>$1</sub>')}</p><p>− Name: ${data[x].english_name}</p>`;
          if (data[x].mass !== '') {
            result += `<p>− Mass: ${data[x].mass} g/mol</p>`
          }
          if (data[x].weight !== '') {
            result += `<p>− Weight: ${data[x].weight} kg/m<sup>3</sup>`
          }
          if (data[x].languages.en.color !== '') {
            result += `<p>− Color: ${data[x].languages.en.color}</p>`
          }
          if (data[x].languages.en.status !== '') {
            result += `<p>− Status: ${data[x].languages.en.status}</p>`
          }
          if (data[x].boiling_temperature !== '') {
            result += `<p>− Boiling temperature: ${data[x].boiling_temperature}°C</p>`
          }
          if (data[x].melting_temperature !== '') {
            result += `<p>− Melting temperature: ${data[x].melting_temperature}°C</p>`
          }
          if (data[x].electronegativity !== '') {
            result += `<p>− Electronegativity: ${data[x].electronegativity}</p>`
          }
          if (data[x].ion_power !== '') {
            result += `<p>− Ion power: ${data[x].ion_power}</p>`
          }
          result += '</div>';
          break
        }
      }
    }
    output.innerHTML = result;
  }
})