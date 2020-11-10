const PRODUTOS = "_PRODUTOS";

export function ErroValidacao(errors) {
  this.errors = errors;
}

export default class produtoService {
  validar = (produto) => {
    const errors = [];

    if (!produto.nome) {
      errors.push("O campo nome é obrigatório.");
    }

    if (!produto.sku) {
      errors.push("O campo sku é obrigatório.");
    }

    if (!produto.preco || produto.preco <= 0) {
      errors.push("O preço tem que ser maior que zero (0).");
    }

    if (errors.length > 0) {
      console.log("entrou");
      throw new ErroValidacao(errors);
    }
  };

  deletar = (sku) => {
    const index = this.obterIndex(sku);
    if (!index !== null) {
      const produtos = this.obterProdutos();
      produtos.splice(index, 1);
      localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
      return produtos;
    }
  };

  obterIndex = (sku) => {
    let index = null;

    console.log("no obter " + sku);
    this.obterProdutos().forEach((produto, i) => {
      if (produto.sku === sku) {
        index = i;
      }
    });

    console.log("retornando" + index);
    return index;
  };

  salvar = (produto) => {
    this.validar(produto);

    let produtos = localStorage.getItem(PRODUTOS);
    if (!produtos) {
      produtos = [];
    } else {
      produtos = JSON.parse(produtos);
    }

    const index = this.obterIndex(produto.sku);

    if (index === null) {
      console.log("add");
      produtos.push(produto); //Adicionand um novo produto
    } else {
      console.log("edit");
      produtos[index] = produto; //Editando um produto sendo o index a posição no vetor onde esta o produto
    }

    localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
  };

  obterProdutos = () => {
    const produtos = localStorage.getItem(PRODUTOS);

    if (!produtos) {
      return [];
    }

    return JSON.parse(produtos);
  };
}
