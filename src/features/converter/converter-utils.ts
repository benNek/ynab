import { Bank } from "@/types/bank.ts";
import { SebConverter } from "@/features/converter/seb-converter.ts";
import { SwedbankConverter } from "@/features/converter/swedbank-converter.ts";
import type { Transaction } from "@/types/transaction.ts";
import Papa from "papaparse";
import type { BankConverter } from "@/features/converter/bank-converter.ts";

export interface Fields {
  DATE: string;
  RECIPIENT: string;
  DESCRIPTION: string;
  AMOUNT: string;
  DEBIT_OR_CREDIT: string;
}

export function convert(bank: Bank, data: string): string {
  const converter = getConverter(bank);
  try {
    return converter.convert(data);
  } catch (error) {
    throw Error("Failed to convert bank data");
  }
}

export function parseTransactions(data: string): Array<Transaction> {
  const res = Papa.parse(data, { header: true });

  return res.data.map((row) => {
    return {
      date: row?.Date,
      payee: row?.Payee,
      memo: row?.Memo,
      amount: row?.Amount,
    };
  });
}

// TODO: add validation
export function transform(
  fields: Fields,
  rows: unknown[],
  isDebitFn: (field: string) => boolean,
  shouldSkip: (row: unknown) => boolean,
) {
  const newRows = [`"Date","Payee","Memo","Amount"`];
  for (const row of rows) {
    if (shouldSkip(row)) {
      continue;
    }

    const payee = row[fields.RECIPIENT] ?? "Unknown";
    const isDebit = isDebitFn(row[fields.DEBIT_OR_CREDIT]);
    const amount = isDebit ? `-${row[fields.AMOUNT]}` : row[fields.AMOUNT];
    const date = row[fields.DATE];
    const memo = row[fields.DESCRIPTION] ?? "";
    const newRow = `"${formatField(date)}","${formatField(payee)}","${formatField(memo)}","${amount}"`;
    newRows.push(newRow);
  }

  return newRows.join("\n");
}

function getConverter(bank: Bank): BankConverter {
  switch (bank) {
    case Bank.SEB:
      return new SebConverter();
    case Bank.SWEDBANK:
      return new SwedbankConverter();
    default:
      throw new Error("Unknown bank type " + bank);
  }
}

function formatField(value: string) {
  return value.replaceAll('"', "");
}
