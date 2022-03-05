const button = document.querySelector('.js-button');

(async () => {
    button.addEventListener('click',clickEvent => {
        const elemetnt = document.getElementById('search');
        let sarchurl = "../html/serchreslut.html";
        const keywords = elemetnt.value.split(/\s/);
        location.href = sarchurl;
    });
})();