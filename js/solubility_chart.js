if (LN === 'vi') {
  document.getElementsByClassName('title')[1].innerHTML = 'Bảng tính tan';
  let _vi = ['Tan trong nước', 'Không tan trong nước nhưng tan trong axit', 'Chỉ tan nhẹ trong nước, nhưng không tan trong axit', 'Không tan trong nước và chỉ tan nhẹ trong axit', 'Không tan trong nước, không tan trong axit', 'Bị phân tích trong nước', 'Phân hủy hoặc không tồn tại']
  let nt = document.getElementsByClassName('card')[13].getElementsByTagName('p');
  for (let i = 0; i < 7; i++) {
    nt[i].childNodes[1].nodeValue = ' ' + _vi[i];
  }
}
let fcBody = document.querySelector(".fix-column > .tbody");
let rcBody = document.querySelector(".rest-columns > .tbody");
let rcHead = document.querySelector(".rest-columns > .thead");
rcBody.addEventListener("scroll", function() {
  fcBody.scrollTop = this.scrollTop;
  rcHead.scrollLeft = this.scrollLeft;
}, {
  passive: true
});