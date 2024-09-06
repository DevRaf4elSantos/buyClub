// Criação Objetos
let produtos = [
    {
    nome : 'teclado',
    valor : 199.90, 
    qtdEstoque : 10,
    img : 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSL-dA3mxDIi0Sbgmwk2EmeoYhlzDLXcxlfdj8jSYk3TxW-JDL1GnNkFCSIZUCKUcPrzpJM7vSoEwSl8JZz87fXuSOxYre4Yc4YzY4ikPmKEiW_zEEG-CdzxXZSmjj3gg&usqp=CAc'
    },
    {
    nome : 'mouse',
    valor : 99.90, 
    qtdEstoque : 15,
    img: 'https://http2.mlstatic.com/D_NQ_NP_645433-MLB50191479110_062022-O.webp'
    },
    {
    nome : 'mousepad',
    valor : 199.90, 
    qtdEstoque : 10,
    img : 'https://images.kabum.com.br/produtos/fotos/386885/mousepad-gamer-havit-800x500mm-rgb-usb-preto-mp903_1666894308_gg.jpg'
    },
];

let clientes = [
    {
        nome : 'Usuario1',
        saldo : 575.90, 
        produtosCarrinho : []
    },
    {
        nome : 'Usuario2',
        saldo : 879, 
        produtosCarrinho : []
    },
    {
        nome : 'Administrador',
        saldo : 1280, 
        produtosCarrinho : []
    },
];

class Bd{
    grava(d){
        localStorage.setItem(d.nome, JSON.stringify(d))
    } 
    dados(d){
        
        let dados = localStorage.getItem(d)

        let carrinho = document.getElementById('carrinho')

        if(dados){
            let dadosConvertidos = JSON.parse(dados)
            carrinho.innerHTML = dadosConvertidos.produtosCarrinho.length
        }
        
    }
    
}
const bd = new Bd()

// criando usuarios

let nomeUsuario 
let saldoUsuario
let carrinhoProdutos

const selectMenu = document.getElementById('users')


for(cliente in clientes){

    nomeUsuario = clientes[cliente].nome
    saldoUsuario = clientes[cliente].saldo
    carrinhoProdutos = clientes[cliente].produtosCarrinho

    let elemento = document.createElement('option')
    elemento.className = 'dropdown-item'
    elemento.textContent = nomeUsuario
    elemento.setAttribute("value", nomeUsuario) 

    selectMenu.appendChild(elemento)
    selectMenu.className = " none"

}

// Saudação
let saudacao = document.createElement('h2')

function saudar(value){
    let main = document.getElementById('main')
    saudacao.innerHTML = ""
    bd.dados(value)

    if(value){
        saudacao.className = 'text-center'
        saudacao.innerHTML = `Seja bem vind@ ${value}`   
        selectMenu.className = " none" 
    }
    
    else{
        saudacao.innerHTML = `Escolha um usuário válido`
    }
    main.appendChild(saudacao)
}

function mostrar(){
    return selectMenu.className = " show"
}

// Card Produtos

let caixa = document.getElementById('caixa')
let produtoNome
let produtoPreco
let produtoEstoque
let produtoImagem

produtos.map(produto => {
    let card = document.createElement('div')
    card.classList = 'card mt-2 mr-1 col-10 col-sm-5 col-md-3 col-lg-3 text-center '

    let cardBody = document.createElement('div')
    cardBody.classList = 'card-body'
    
    produtoNome = produto.nome
    produtoPreco = produto.valor
    let vPreco = parseInt(produtoPreco)
    produtoEstoque = produto.qtdEstoque
    produtoImagem = produto.img
    
    let imgCard = document.createElement('img')
    imgCard.setAttribute('src', produtoImagem)
    imgCard.classList = 'card-img-top align-self-center'
    imgCard.style.width = '70%'
    imgCard.style.height = '200px'

    let titulo = document.createElement('h3')
    titulo.classList = 'card-title'
    titulo.innerHTML = produtoNome.toUpperCase() 

    let estoque = document.createElement('span')
    estoque.innerHTML = `Estoque: ${produtoEstoque}`
    estoque.className = 'mt-3 mr-3'

    let preco = document.createElement('span')
    preco.innerHTML = `R\$ ${vPreco.toFixed(2)}`
    preco.className = 'mt-3 mr-3 text-danger'
    
    let simboloCarrinho = document.createElement('i')
    simboloCarrinho.classList = "fa-solid fa-cart-shopping fa-x2l"
    simboloCarrinho.style.color = '#000'

    let adicionarCarrinho = document.createElement('button')
    adicionarCarrinho.classList = 'btn btn-outline-warning'
    adicionarCarrinho.appendChild(simboloCarrinho)
    adicionarCarrinho.id = produtoNome
    
    adicionarCarrinho.addEventListener("click", () => {
        let dados =  adicionarCarrinho.id
        adicionarAoCarrinho(dados)
    });

    caixa.appendChild(card)
    card.appendChild(imgCard)
    card.appendChild(cardBody)
    cardBody.appendChild(titulo)
    cardBody.appendChild(estoque)
    cardBody.appendChild(preco)
    cardBody.appendChild(adicionarCarrinho)
})

// Carrinho de compras
let carrinho = document.getElementById('carrinho')


function mostrarItensCarrinho(cliente){
    let qtdCarrinho =  carrinhoProdutos.length
    carrinho.innerHTML = qtdCarrinho
    if(cliente != null){
        carrinho.innerHTML = cliente[0].produtosCarrinho.length
    }
}

let item
let usuario
function adicionarAoCarrinho(produtoNome){
    usuario = document.getElementById('users')
    if(usuario.value){

        item = produtos.filter(prod => prod.nome == produtoNome)

        let usuarioAtivo = clientes.filter(cliente => cliente.nome == usuario.value) 

        let dado = usuarioAtivo[0].produtosCarrinho
        
        mostrarItensCarrinho(usuarioAtivo)

        bd.dados(dado)
        
        let limite = item[0].qtdEstoque--
        
        if( limite > 0){
            dado.push(item[0])
            bd.grava(usuarioAtivo[0])  
        }

    }else{
        $('#modal').modal('show')
    }
}

let carrinhoLista = document.getElementById("carrinho")
