const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`;
const selectEstado =  document.getElementById('estado');
const selectMunicipio = document.getElementById('municipio');
const mapa = document.getElementById('mapa');

fetch(url)
    .then(res => res.json()
    .then(estados=> {
        //carrega as opções do estado
        estados.forEach(estado => {
            const opcao = document.createElement('option');
            opcao.value = estado.sigla;
            opcao.textContent = estado.nome;
            selectEstado.appendChild(opcao);
    });
}))

selectEstado.addEventListener('change',() =>{
    const ufEstado = selectEstado.value;
    //se o estado não for selecionado ainda, ele para por aqui e retorna para o começo, ou seja não continua 
    // no carregamento dos municipios.
    if(!ufEstado) return;

    selectMunicipio.innerHTML = '<option value="">Selecione o Município</option>';
    selectMunicipio.disabled = true;
    //carrega as opções do municipio
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufEstado}/municipios`)
        .then(res => res.json()
        .then(municipios =>{
            municipios.forEach(municipio =>{
                const opcao = document.createElement('option');
                opcao.value = municipio.id;
                opcao.textContent = municipio.nome;
                selectMunicipio.appendChild(opcao);
            })
            selectMunicipio.disabled = false;
        }))
})
//Assim que escolher as opções de municipio, a url muda para carregar o mapa com a api interna.
selectMunicipio.addEventListener('change', ()=>{
    const ufEstado = selectEstado.value;
    const municipio = selectMunicipio.options[selectMunicipio.selectedIndex].text;
    //Funciona da mesma forma que o primeiro if
    if(!ufEstado || !municipio) return;
    //encodeURIComponent serve para evitar erros de espaçamento quando é passado o nome do municipio.
    fetch(`http://localhost:3000/mapsData/?sigla=${ufEstado}&nomeMunicipio=${encodeURIComponent(municipio)}`)
        .then(res => res.json()
        .then(data=>{
            console.log("Dados recebidos:", data);
            mapa.innerHTML = `
                <svg 
                    viewBox="${data.viewBoxEstado}" xmlns="http://www.w3.org/2000/svg" width="500" height="400">
                    <path d="${data.pathEstado}" fill="#ccc"/>
                    <path d="${data.pathMunicipio}" fill="red"/>
                </svg>`;
        })
        .catch(err =>{
            mapa.innerHTML = '<p>Erro ao carregar o mapa.</p>';
            console.log(err);
        })
    )
})