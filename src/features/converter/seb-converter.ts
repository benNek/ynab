import Papa from "papaparse";
import type { BankConverter } from "./bank-converter.ts";
import { transform } from "./converter-utils.ts";

const FIELDS = {
  DATE: "DATA",
  RECIPIENT: "MOKĖTOJO ARBA GAVĖJO PAVADINIMAS",
  DESCRIPTION: "MOKĖJIMO PASKIRTIS",
  AMOUNT: "SUMA",
  CURRENCY: "VALIUTA",
  DEBIT_OR_CREDIT: "DEBETAS/KREDITAS",
};

export class SebConverter implements BankConverter {
  convert(data: string): string {
    const parseResult = Papa.parse(data, {
      header: true,
      skipFirstNLines: 1,
    });

    return transform(FIELDS, parseResult.data, (val) => val === "D");
  }
}
