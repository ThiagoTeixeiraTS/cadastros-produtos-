import React, { Component } from "react";
import ProdutoService from "../../app/produtoService";

import ProdutosTable from "../produtos/produtosTable";
import Card from "../../components/card";

import { withRouter } from "react-router-dom";

class ConsultaProdutos extends Component {
  state = {
    produtos: [],
  };

  constructor() {
    super();
    this.service = new ProdutoService();
  }

  componentDidMount() {
    const produtos = this.service.obterProdutos();
    this.setState({ produtos: produtos });
  }

  preparaEditar = (sku) => {
    console.log("sku", sku);
    this.props.history.push(`/cadastro-produtos/${sku}`);
  };

  deletarProduto = (sku) => {
    const produtos = this.service.deletar(sku);
    this.setState({ produtos });
  };

  render() {
    return (
      <Card header={"Consulta de Produtos"}>
        <ProdutosTable
          produtos={this.state.produtos}
          editarAction={this.preparaEditar}
          deletarAction={this.deletarProduto}
        />
      </Card>
    );
  }
}

export default withRouter(ConsultaProdutos);
