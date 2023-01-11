const handleSubmit = (event) => {
    event.preventDefault();
    const nome = document.querySelector('textarea[name=nome]').value;
    const mensagem = document.querySelector('textarea[name=msg]').value;
    fetch('https://api.sheetmonkey.io/form/eJP734LDjojFFx6Ztu1g4N', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ nome, mensagem }),
    }).then(function eraseText() {
        document.getElementById("myForm").reset();
    })}
document.querySelector('form').addEventListener('submit', handleSubmit);
