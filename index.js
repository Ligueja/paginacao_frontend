const tabela = document.getElementById("tabela");
const menuPaginacao = document.getElementById("menu_paginacao");
let pagina = 1;



const instance = axios.create({
    baseURL: "http://localhost:3030",
  });


function adicionarUsuariosTabela(usuarios) {
    if (tabela.rows.length > 1) {
      var quantiaDeCabecalhos = 1;
      var quantiaDeLinhas = tabela.rows.length;
  
      for (var i = quantiaDeCabecalhos; i < quantiaDeLinhas; i++) {
        tabela.deleteRow(quantiaDeCabecalhos);
      }
    }
  
    usuarios.forEach((usuario) => {
      const linha = document.createElement('tr')
  
      const celulaNome = document.createElement('td')
      celulaNome.innerHTML = usuario.nome
  
      const celulaEmail = document.createElement('td')
      celulaEmail.innerHTML = usuario.email
  
      linha.appendChild(celulaNome)
      linha.appendChild(celulaEmail)
      
      tabela.appendChild(linha)
    })
    
  }


async function carregarUsuarios() {
    let url = `/usuarios`
  
    url += `?pagina=${pagina}`

    const resposta = await instance.get(url)
    const usuarios = resposta.data.usuarios

    adicionarUsuariosTabela(usuarios)
}



function voltar() {
    pagina--;
    carregarUsuarios();
  }
  
  function proximo() {
    pagina++;
    carregarUsuarios();
  }


function criarMenuPaginacao() {
    const botaoAnterior = document.createElement('button')
    botaoAnterior.innerHTML = 'Anterior'
    botaoAnterior.addEventListener('click', voltar)
  
    const botaoProximo = document.createElement('button')
    botaoProximo.innerHTML = 'Próximo'
    botaoProximo.addEventListener('click', proximo)
  
    menuPaginacao.appendChild(botaoAnterior)
    menuPaginacao.appendChild(botaoProximo)
  }


carregarUsuarios()


criarMenuPaginacao()