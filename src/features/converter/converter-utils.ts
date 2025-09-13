import { Bank } from "@/types/bank.ts";
import { SebConverter } from "@/features/converter/seb-converter.ts";
import { SwedbankConverter } from "@/features/converter/swedbank-converter.ts";

export interface Fields {
  DATE: string;
  RECIPIENT: string;
  DESCRIPTION: string;
  AMOUNT: string;
  DEBIT_OR_CREDIT: string;
}

export function convert(bank: Bank, data: string): string {
  switch (bank) {
    case Bank.SEB:
      return new SebConverter().convert(data);
    case Bank.SWEDBANK:
      return new SwedbankConverter().convert(data);
    default:
      throw new Error("Unknown bank type " + bank);
  }
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

    const payee = row[fields.RECIPIENT];
    const isDebit = isDebitFn(row[fields.DEBIT_OR_CREDIT]);
    const amount = isDebit ? `-${row[fields.AMOUNT]}` : row[fields.AMOUNT];
    const date = row[fields.DATE];
    const memo = row[fields.DESCRIPTION];
    const newRow = `"${formatField(date)}","${formatField(payee)}","${formatField(memo)}","${amount}"`;
    newRows.push(newRow);
  }

  return newRows.join("\n");
}

function formatField(value: string) {
  return value.replaceAll('"', "");
}
