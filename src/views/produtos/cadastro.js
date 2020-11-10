import React, { Component } from "react";
import ProdutoService from "../../app/produtoService";
import { withRouter } from "react-router-dom";

import Card from "../../components/card";

const estadoInicial = {
  nome: "",
  sku: "",
  descricao: "",
  preco: 0,
  fornecedor: "",
  sucesso: false,
  errors: [],
  tela: "",
  atualizando: false,
};

export default class CadastroProduto extends Component {
  state = estadoInicial;

  constructor() {
    super();
    this.service = new ProdutoService();
  }

  onChange = (event) => {
    const valor = event.target.value;
    const nomeCampo = event.target.name;

    this.setState({ [nomeCampo]: valor });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const produto = {
      nome: this.state.nome,
      sku: this.state.sku,
      descricao: this.state.descricao,
      preco: this.state.preco,
      fornecedor: this.state.fornecedor,
    };
    try {
      this.service.salvar(produto);
      this.limparCampos();
      this.setState({ sucesso: true });
    } catch (erro) {
      console.log(erro);
      const errors = erro.errors;
      this.setState({ errors: errors });
    }
  };

  limparCampos = () => {
    this.setState(estadoInicial);
  };

  componentDidMount() {
    this.setState({ tela: "Cadastrando Produto" });

    console.log("sku " + this.props.match.params.sku);
    const sku = this.props.match.params.sku;
    console.log(this.state.atualizando);
    if (sku) {
      console.log(this.state.atualizando);
      const resultado = this.service
        .obterProdutos()
        .filter((produto) => produto.sku === sku);

      if (resultado.length === 1) {
        const produtoEncontrado = resultado[0];
        this.setState({ ...produtoEncontrado, atualizando: true });
        console.log(this.state.atualizando);
      }
    }
    console.log(this.state.atualizando);
  }

  render() {
    return (
      <Card
        header={
          this.state.atualizando
            ? "Atualização de Produto"
            : "Cadastro de Produto"
        }
      >
        <form id="frmProduto" onSubmit={this.onSubmit}>
          {this.state.sucesso && (
            <div className="alert alert-dismissible alert-success">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <strong>Deu Certo! </strong> Cadastro Realizado com sucesso!.
            </div>
          )}

          {this.state.errors &&
            this.state.errors.length > 0 &&
            this.state.errors.map((msg) => {
              return (
                <div className="alert alert-dismissible alert-danger">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                  ></button>
                  <strong>Erro!</strong> {msg}
                </div>
              );
            })}

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Nome *</label>
                <input
                  type="text"
                  name="nome"
                  onChange={this.onChange}
                  value={this.state.nome}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>SKU *</label>
                <input
                  type="text"
                  name="sku"
                  disabled={this.state.atualizando}
                  onChange={this.onChange}
                  value={this.state.sku}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  className="form-control"
                  name="descricao"
                  onChange={this.onChange}
                  value={this.state.descricao}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Preço *</label>
                <input
                  type="text"
                  name="preco"
                  onChange={this.onChange}
                  className="form-control"
                  value={this.state.preco}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Fornecedor *</label>
                <input
                  type="text"
                  className="form-control"
                  name="fornecedor"
                  onChange={this.onChange}
                  value={this.state.fornecedor}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-1">
              <button type="submit" className="btn btn-success">
                {" "}
                {this.state.atualizando ? "Atualizar" : "Cadastrar"}
              </button>
            </div>

            <div className="col-md-1">
              <button onClick={this.limparCampos} className="btn btn-primary">
                Limpar
              </button>
            </div>

            <div className="col-md-1">
              <button
                onClick={this.limparCampos}
                className="btn btn-outline-success"
              >
                Limpar
              </button>
            </div>
          </div>
        </form>
      </Card>
    );
  }
}
