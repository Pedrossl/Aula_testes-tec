import { Conta, ContaCorrente, ContaPoupanca } from "./banco";

const prompt = require("prompt-sync")();
let contaCorrente: Conta | null = null;
let contaPoupanca: Conta | null = null;

function main() {
  while (true) {
    console.log("\n--- MENU BANCO ---");
    console.log("1. Criar Conta Corrente");
    console.log("2. Criar Conta Poupança");
    console.log("3. Depositar");
    console.log("4. Sacar");
    console.log("5. Consultar Saldo");
    console.log("6. Sacar da Poupança");
    console.log("7. Depositar na Poupança");
    console.log("8. Consultar Saldo da Poupança");
    console.log("0. Sair");
    const opcao = prompt("Escolha uma opção: ");
    switch (opcao) {
      case "1": {
        const titular = prompt("Titular: ");
        const saldo = Number(prompt("Saldo inicial: "));
        const limite = Number(prompt("Limite cheque especial: "));
        contaCorrente = new ContaCorrente(titular, saldo, limite);
        console.log("Conta Corrente criada!");
        break;
      }
      case "2": {
        const titular = prompt("Titular: ");
        const saldo = Number(prompt("Saldo inicial: "));
        contaPoupanca = new ContaPoupanca(titular, saldo);
        console.log("Conta Poupança criada!");
        break;
      }
      case "3": {
        if (!contaCorrente) {
          console.log("Crie uma conta corrente primeiro!");
          break;
        }
        const valor = Number(prompt("Valor do depósito: "));
        const msg = contaCorrente.depositar(valor);
        console.log(msg);
        break;
      }
      case "4": {
        if (!contaCorrente) {
          console.log("Crie uma conta corrente primeiro!");
          break;
        }
        const valor = Number(prompt("Valor do saque: "));
        try {
          const msg = contaCorrente.sacar(valor);
          console.log(msg);
        } catch (e: any) {
          console.log(e.message);
        }
        break;
      }
      case "5": {
        if (!contaCorrente) {
          console.log("Crie uma conta corrente primeiro!");
          break;
        }
        console.log(
          "Saldo atual: R$",
          contaCorrente.consultarSaldo().toFixed(2)
        );
        break;
      }
      case "6": {
        if (!contaPoupanca) {
          console.log("Crie uma conta poupança primeiro!");
          break;
        }
        const valor = Number(prompt("Valor do saque na poupança: "));
        try {
          const msg = contaPoupanca.sacar(valor);
          console.log(msg);
        } catch (e: any) {
          console.log(e.message);
        }
        break;
      }
      case "7": {
        if (!contaPoupanca) {
          console.log("Crie uma conta poupança primeiro!");
          break;
        }
        const valor = Number(prompt("Valor do depósito na poupança: "));
        const msg = contaPoupanca.depositar(valor);
        console.log(msg);
        break;
      }
      case "8": {
        if (!contaPoupanca) {
          console.log("Crie uma conta poupança primeiro!");
          break;
        }
        console.log(
          "Saldo atual da poupança: R$",
          contaPoupanca.consultarSaldo().toFixed(2)
        );
        break;
      }
      case "0":
        console.log("Saindo...");
        return;
      default:
        console.log("Opção inválida!");
    }
  }
}

main();
