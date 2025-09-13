import Papa from "papaparse";
import type { BankConverter } from "./bank-converter.ts";
import { transform } from "./converter-utils.ts";

const FIELDS = {
  DATE: "Data",
  RECIPIENT: "Gavėjas",
  DESCRIPTION: "Paaiškinimai",
  AMOUNT: "Suma",
  DEBIT_OR_CREDIT: "D/K",
};

export class SwedbankConverter implements BankConverter {
  convert(data: string): string {
    const parseResult = Papa.parse(data, {
      header: true,
    });

    return transform(FIELDS, parseResult.data, this.isDebit, this.shouldSkip);
  }

  isDebit(value: string): boolean {
    return value === "D";
  }

  shouldSkip(entry: unknown): boolean {
    const paymentType = entry[""];
    return paymentType != 20;
  }
}
