function HandleClick(){
    var copyText = document.getElementById("linkInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value)}
