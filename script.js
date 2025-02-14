const nomeClienteInput = document.getElementById('nomeCliente');
const resultadoDiv = document.getElementById('resultado');
const botaoPesquisa = document.getElementById('botaoPesquisa');
const fileInput = document.createElement('input');
fileInput.type = 'file';

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const csvData = event.target.result;
        const lines = csvData.split('\n');
        const headers = lines[0].split(',');
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j].trim()] = values[j]?.trim();
            }
            data.push(obj);
        }

        botaoPesquisa.addEventListener('click', () => {
            const nomeCliente = nomeClienteInput.value.trim().toLowerCase();

            if (!nomeCliente) {
                resultadoDiv.textContent = 'Por favor, digite um nome.';
                return;
            }

            const resultados = data.filter(cliente => {
                const nomeCompleto = cliente.nome?.trim().toLowerCase();
                // Verifica se o nome do cliente (em minúsculas) inclui a string de pesquisa (em minúsculas)
                return nomeCompleto?.includes(nomeCliente); 
            });

            if (resultados.length > 0) {
                let resultadosHTML = "<h2>Resultados da pesquisa:</h2>";
                resultadosHTML += "<ul>";
                resultados.forEach(cliente => {
                    const csi = cliente.csi ? cliente.csi.trim() : "Não informado";
                    resultadosHTML += `<li><strong>Nome:</strong> ${cliente.nome} <br> <strong>CSI:</strong> ${csi} </li>`;
                });
                resultadosHTML += "</ul>";
                resultadoDiv.innerHTML = resultadosHTML;
            } else {
                resultadoDiv.textContent = 'Cliente não encontrado.';
            }
        });
    };

    reader.readAsText(file);
});

document.body.appendChild(fileInput);