import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="w-full">
      <div class="flex justify-center items-center  text-primary bg-[#EBEDBE] p-2 rounded">
        {/* <Icon id="Truck" size={24} /> */}
        {remaining > 0
          ? (
            <span class="text-[#636100] text-sm font-[Helvetica] font-normal">
              Faltam{" "}
              <span class="font-bold">
                {formatPrice(remaining, currency, locale)}
                {" "}
              </span>
              <span>
                para você ganhar <span class="font-bold">Frete grátis!</span>
              </span>
            </span>
          )
          : <span>Você ganhou frete grátis!</span>}
      </div>
      {
        /* <progress
        class="progress progress-primary w-full"
        value={percent}
        max={100}
      /> */
      }
    </div>
  );
}

export default FreeShippingProgressBar;
