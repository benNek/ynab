export interface Fields {
  DATE: string;
  RECIPIENT: string;
  DESCRIPTION: string;
  AMOUNT: string;
  DEBIT_OR_CREDIT: string;
}

// TODO: add validation
export function transform(
  fields: Fields,
  rows: unknown[],
  isDebitFn: (field: string) => boolean,
) {
  const newRows = [`"Date","Payee","Memo","Amount"`];
  for (const row of rows) {
    const payee = row[fields.RECIPIENT];
    if (!payee?.trim()?.length) {
      continue;
    }

    // const isDebit = row[FIELDS.DEBIT_OR_CREDIT] === "D";
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
