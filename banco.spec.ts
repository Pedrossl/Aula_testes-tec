import { ContaCorrente, ContaPoupanca } from "./banco";

describe("ContaCorrente", () => {
  it("deve depositar corretamente", () => {
    const cc = new ContaCorrente("Maria", 100, 200);
    cc.depositar(50);
    expect(cc.consultarSaldo()).toBe(150);
  });

  it("deve sacar usando cheque especial", () => {
    const cc = new ContaCorrente("Maria", 100, 200);
    cc.sacar(250);
    expect(cc.consultarSaldo()).toBe(-150);
  });

  it("deve lançar erro ao sacar acima do limite", () => {
    const cc = new ContaCorrente("Maria", 100, 200);
    expect(() => cc.sacar(500)).toThrow("Saldo insuficiente");
  });
});

describe("ContaPoupanca", () => {
  it("deve depositar corretamente", () => {
    const cp = new ContaPoupanca("João", 100);
    cp.depositar(50);
    expect(cp.consultarSaldo()).toBe(150);
  });

  it("deve sacar corretamente", () => {
    const cp = new ContaPoupanca("João", 100);
    cp.sacar(80);
    expect(cp.consultarSaldo()).toBe(20);
  });

  it("deve lançar erro ao sacar acima do saldo", () => {
    const cp = new ContaPoupanca("João", 100);
    expect(() => cp.sacar(200)).toThrow("Saldo insuficiente");
  });
});
