

function klik(nr) {
    var wyswietlacz = document.getElementById("wyswietlacz");
    var nowe = document.getElementById(nr).value;

    wyswietlacz.innerHTML+=nowe;
}

function wynik() {
    var str = wyswietlacz.innerHTML;
    wyswietlacz.innerHTML=Math.round(eval(str)*1000)/1000;
}