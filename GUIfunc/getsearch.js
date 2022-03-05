const button = document.querySelector('.searching');

(async () => {
  button.addEventListener('click',clickEvent => {
    const elemetnt = document.getElementById('search');
    let sarchurl = "../html/serchreslut.html";
    sarchurl += "?q="+elemetnt.value;
    location.href = sarchurl;
  });
})();