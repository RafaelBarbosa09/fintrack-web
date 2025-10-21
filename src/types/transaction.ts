export enum TransactionType {
  INCOME = "ENTRADA",
  EXPENSE = "SAÍDA",
}

export type Category = {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  categoryId?: string;
  category?: Category;
  createdAt: Date;
  updatedAt?: Date;
};

