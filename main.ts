import { Conta, ContaCorrente, ContaPoupanca } from "./banco";

const prompt = require("prompt-sync")();
let conta: Conta | null = null;

function main() {
  while (true) {
    console.log("\n--- MENU BANCO ---");
    console.log("1. Criar Conta Corrente");
    console.log("2. Criar Conta Poupança");
    console.log("3. Depositar");
    console.log("4. Sacar");
    console.log("5. Consultar Saldo");
    console.log("0. Sair");
    const opcao = prompt("Escolha uma opção: ");
    switch (opcao) {
      case "1": {
        const titular = prompt("Titular: ");
        const saldo = Number(prompt("Saldo inicial: "));
        const limite = Number(prompt("Limite cheque especial: "));
        conta = new ContaCorrente(titular, saldo, limite);
        console.log("Conta Corrente criada!");
        break;
      }
      case "2": {
        const titular = prompt("Titular: ");
        const saldo = Number(prompt("Saldo inicial: "));
        conta = new ContaPoupanca(titular, saldo);
        console.log("Conta Poupança criada!");
        break;
      }
      case "3": {
        if (!conta) {
          console.log("Crie uma conta primeiro!");
          break;
        }
        const valor = Number(prompt("Valor do depósito: "));
        conta.depositar(valor);
        break;
      }
      case "4": {
        if (!conta) {
          console.log("Crie uma conta primeiro!");
          break;
        }
        const valor = Number(prompt("Valor do saque: "));

        conta.sacar(valor);
      }
      case "5": {
        if (!conta) {
          console.log("Crie uma conta primeiro!");
          break;
        }
        console.log("Saldo atual: R$", conta.consultarSaldo().toFixed(2));
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
