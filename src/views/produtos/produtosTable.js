import React, { Component } from "react";

export default (props) => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th>Nome</th>
        <th>SKU</th>
        <th>Preco</th>
        <th>Fornecedor</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {props.produtos.map((produto, index) => {
        return (
          <tr key={index}>
            <th>{produto.nome}</th>
            <th>{produto.sku}</th>
            <th>{produto.preco}</th>
            <th>{produto.fornecedor}</th>
            <th>
              <button
                onClick={() => props.editarAction(produto.sku)}
                type="button"
                class="btn btn-outline-warning"
              >
                Editar
              </button>
              - {`   `}
              <button
                onClick={() => props.deletarAction(produto.sku)}
                type="button"
                class="btn btn-outline-danger"
              >
                Remover
              </button>
            </th>
          </tr>
        );
      })}
    </tbody>
  </table>
);
