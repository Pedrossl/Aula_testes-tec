import { ContaCorrente, ContaPoupanca } from "./banco";

describe("ContaCorrente", () => {
  it("deve depositar e atualizar saldo", () => {
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
    // IMPORTANTE: Use uma função anônima () => para testar exceções com toThrow.
    // Se você usar expect(cc.sacar(500)).toThrow(), o erro será lançado imediatamente,
    // antes do Jest conseguir capturá-lo. Por isso, sempre use expect(() => cc.sacar(500)).toThrow();
    expect(() => cc.sacar(500)).toThrow();
  });
});

describe("ContaPoupanca", () => {
  it("deve depositar e atualizar saldo", () => {
    const cp = new ContaPoupanca("João", 100);
    cp.depositar(50);
    expect(cp.consultarSaldo()).toBe(150);
  });
  it("deve sacar e atualizar saldo", () => {
    const cp = new ContaPoupanca("João", 100);
    cp.sacar(80);
    expect(cp.consultarSaldo()).toBe(20);
  });
  it("deve lançar erro ao sacar acima do saldo", () => {
    const cp = new ContaPoupanca("João", 100);
    expect(() => cp.sacar(200)).toThrow(
      "Não foi possível sacar o valor R$200.00 na poupança"
    );
  });
});

describe("Outros testes", () => {
  it("deve recusar depósito negativo na corrente", () => {
    const cc = new ContaCorrente("Lucas", 100, 100);
    const msg = cc.depositar(-50);
    expect(msg).toBe("O valor do depósito deve ser positivo.");
    expect(cc.consultarSaldo()).toBe(100);
  });
  it("deve recusar depósito zero na poupança", () => {
    const cp = new ContaPoupanca("Bia", 100);
    const msg = cp.depositar(0);
    expect(msg).toBe("O valor do depósito deve ser positivo.");
    expect(cp.consultarSaldo()).toBe(100);
  });
  it("deve recusar saque negativo na corrente", () => {
    const cc = new ContaCorrente("Lucas", 100, 100);
    const msg = cc.sacar(-10);
    expect(msg).toBe("O valor do saque deve ser positivo.");
    expect(cc.consultarSaldo()).toBe(100);
  });
  it("deve recusar saque zero na poupança", () => {
    const cp = new ContaPoupanca("Bia", 100);
    const msg = cp.sacar(0);
    expect(msg).toBe("O valor do saque deve ser positivo.");
    expect(cp.consultarSaldo()).toBe(100);
  });
  it("deve permitir saque igual ao saldo na poupança", () => {
    const cp = new ContaPoupanca("Bia", 100);
    cp.sacar(100);
    expect(cp.consultarSaldo()).toBe(0);
  });
  it("deve permitir saque igual ao saldo + limite na corrente", () => {
    const cc = new ContaCorrente("Lucas", 100, 50);
    cc.sacar(150);
    expect(cc.consultarSaldo()).toBe(-50);
  });
  it("deve criar conta corrente com saldo zero", () => {
    const cc = new ContaCorrente("Ana", 0, 100);
    expect(cc.consultarSaldo()).toBe(0);
  });
  it("deve criar conta poupança com saldo inicial", () => {
    const cp = new ContaPoupanca("Carlos", 200);
    expect(cp.consultarSaldo()).toBe(200);
  });
});
