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

  depositar(valor: number): void {
    if (valor <= 0) {
      console.error("O valor do depósito deve ser positivo.");
      return;
    }
    this.saldo += valor;
    console.log(
      `Depósito de R$${valor.toFixed(
        2
      )} realizado. Novo saldo: R$${this.saldo.toFixed(2)}`
    );
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

  public sacar(valor: number): void {
    const saldoDisponivel = this.saldo + this.limiteChequeEspecial;
    if (valor <= 0) {
      console.error("O valor do saque deve ser positivo.");
      return;
    }
    if (valor > saldoDisponivel) {
      throw new Error(
        `Saldo insuficiente. Disponível para saque (saldo + limite): R$${saldoDisponivel.toFixed(
          2
        )}`
      );
    }
    this.saldo -= valor;
    console.log(
      `Saque de R$${valor.toFixed(
        2
      )} realizado. Novo saldo: R$${this.saldo.toFixed(2)}`
    );
  }
}

export class ContaPoupanca extends Conta {
  public sacar(valor: number): void {
    if (valor <= 0) {
      console.error("O valor do saque deve ser positivo.");
      return;
    }
    if (valor > this.saldo) {
      throw new Error(
        `Saldo insuficiente. Saldo atual: R$${this.saldo.toFixed(2)}`
      );
    }
    this.saldo -= valor;
    console.log(
      `Saque de R$${valor.toFixed(
        2
      )} realizado. Novo saldo: R$${this.saldo.toFixed(2)}`
    );
  }
}
