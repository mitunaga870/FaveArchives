const button = document.querySelector('.searching');

(async () => {
  button.addEventListener('click',clickEvent => {
    const elemetnt = document.getElementById('search');
    const fileer = document.getElementById('filler');
    let sarchurl = "../html/serchreslut.html";
    sarchurl += "?q="+elemetnt.value;
    sarchurl += "&f="+fileer.value;
    location.href = sarchurl;
  });
})();