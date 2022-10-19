

function klik(nr) {
    var wyswietlacz = document.getElementById("wyswietlacz");
    var nowe = document.getElementById(nr).value;
    if(wyswietlacz.innerHTML.length<14) {
        wyswietlacz.style.color="whitesmoke";
        wyswietlacz.innerHTML+=nowe;
    }
    
    else
    wyswietlacz.style.color="red";
}

function wynik() {
    var str = wyswietlacz.innerHTML;
    wyswietlacz.innerHTML=Math.round(eval(str)*1000)/1000;
}