import { Card } from "@/components/ui/card.tsx";
import swedbankSvg from "../assets/swedbank.svg?url";
import sebSvg from "../assets/seb.svg?url";
import { Bank } from "@/types/bank.ts";

type Props = {
  activeBank: Bank;
  onBankSelectionChange: (bankType: Bank) => void;
};

type Option = {
  bank: Bank;
  imageSrc: string;
  width: number;
};

const BANK_OPTIONS: Array<Option> = [
  {
    bank: Bank.SWEDBANK,
    imageSrc: swedbankSvg,
    width: 144,
  },
  {
    bank: Bank.SEB,
    imageSrc: sebSvg,
    width: 72.88,
  },
];

export default function BankSelection({
  activeBank,
  onBankSelectionChange,
}: Props) {
  return (
    <div className="flex gap-8">
      {BANK_OPTIONS.map((bank) => {
        const isActive = activeBank === bank.bank;
        return (
          <BankProvider
            key={bank.bank.toString()}
            bank={bank.bank}
            src={bank.imageSrc}
            width={bank.width}
            isActive={isActive}
            onClick={onBankSelectionChange}
          />
        );
      })}
    </div>
  );
}

type ProviderProps = {
  bank: Bank;
  src: string;
  width: number;
  isActive: boolean;
  onClick: (bank: Bank) => void;
};

function BankProvider({ bank, src, width, isActive, onClick }: ProviderProps) {
  return (
    <button className="cursor-pointer" onClick={() => onClick(bank)}>
      <Card className={`px-4 ${isActive && "bg-accent"}`}>
        <img
          src={src}
          alt="Swedbank Icon"
          className="h-8"
          width={width + "px"}
        />
      </Card>
    </button>
  );
}
