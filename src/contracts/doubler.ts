import {
  Address,
  beginCell,
  Cell,
  Contract,
  contractAddress,
  ContractProvider,
  Sender,
  SendMode,
} from '@ton/core';

export const opCodes = {
  bet: 1001,
  win: 1002,
};

export type DoublerConfig = {};

export function doublerConfigToCell(): Cell {
  return beginCell().endCell();
}

export class Doubler implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell },
  ) {}

  static createFromAddress(address: Address) {
    return new Doubler(address);
  }

  static createFromConfig(_config: DoublerConfig, code: Cell, workchain = 0) {
    const data = doublerConfigToCell();
    const init = { code, data };
    return new Doubler(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    });
  }

  async sendBet(provider: ContractProvider, via: Sender, value: bigint, queryId: number) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeUint(1001, 32).storeUint(queryId, 64).endCell(),
    });
  }
}
