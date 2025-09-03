// banco.ts

export interface ITransacionavel {
  depositar(valor: number): void;
  sacar(valor: number): void;
  consultarSaldo(): number;
}

export abstract class Conta implements ITransacionavel {
  protected titular: string;
  protected saldo: number;

  constructor(titular: string, saldoInicial: number = 0) {
    this.titular = titular;
    this.saldo = saldoInicial;
  }

  depositar(valor: number): string {
    if (valor <= 0) {
      return "O valor do depósito deve ser positivo.";
    }
    this.saldo += valor;
    return `Depósito de R$${valor.toFixed(
      2
    )} realizado. Novo saldo: R$${this.saldo.toFixed(2)}`;
  }

  consultarSaldo(): number {
    return this.saldo;
  }

  public abstract sacar(valor: number): void;
}

export class ContaCorrente extends Conta {
  private limiteChequeEspecial: number;

  constructor(titular: string, saldoInicial: number = 0, limite: number = 100) {
    super(titular, saldoInicial);
    this.limiteChequeEspecial = limite;
  }

  public sacar(valor: number): string {
    const saldoDisponivel = this.saldo + this.limiteChequeEspecial;
    if (valor <= 0) {
      return "O valor do saque deve ser positivo.";
    }
    if (valor > saldoDisponivel) {
      throw new Error(
        `Saldo insuficiente. Disponível para saque (saldo + limite): R$${saldoDisponivel.toFixed(
          2
        )}`
      );
    }
    this.saldo -= valor;
    return `Saque de R$${valor.toFixed(
      2
    )} realizado. Novo saldo: R$${this.saldo.toFixed(2)}`;
  }
}

export class ContaPoupanca extends Conta {
  public sacar(valor: number): string {
    if (valor <= 0) {
      return "O valor do saque deve ser positivo.";
    }
    if (valor > this.saldo) {
      throw new Error(
        `Não foi possível sacar o valor R$${valor.toFixed(
          2
        )} na poupança. Saldo atual: R$${this.saldo.toFixed(2)}`
      );
    }
    this.saldo -= valor;
    return `Saque de R$${valor.toFixed(
      2
    )} realizado. Novo saldo: R$${this.saldo.toFixed(2)}`;
  }
}
