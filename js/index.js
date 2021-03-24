const nHTML = document.querySelector('#n');
const ipt = document.querySelector('#ipt');
const contHTML = document.querySelector('#cont');
let n = 0;
ipt.addEventListener('click', () => {
    n++;
    nHTML.innerHTML = `number=${n}`;
});