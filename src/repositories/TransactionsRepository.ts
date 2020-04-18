import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income: number = this.transactions.reduce(
      (accumulator, transaction) => {
        const { type, value } = transaction;

        if (type === 'income') {
          // eslint-disable-next-line no-param-reassign
          accumulator += value;
        }

        return accumulator;
      },
      0,
    );

    const outcome: number = this.transactions.reduce(
      (accumulator, transaction) => {
        const { type, value } = transaction;

        if (type === 'outcome') {
          // eslint-disable-next-line no-param-reassign
          accumulator += value;
        }

        return accumulator;
      },
      0,
    );

    this.balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
