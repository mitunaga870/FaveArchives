module.exports = () => {
    const videodiv = document.getElementById('videodiv');
    const backgraund = document.getElementById('borderlass_backgraund');
    const offbt = document.getElementById('borderlass_off');
    document.getElementById('borderless_on').addEventListener('click',()=>{
        videodiv.classList.remove('default');
        videodiv.classList.add('borderless');
        backgraund.classList.remove('none');
    });
    offbt.addEventListener('click',()=>{
        videodiv.classList.add('default');
        videodiv.classList.remove('borderless');
        backgraund.classList.add('none');

    })
}