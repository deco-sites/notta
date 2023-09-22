import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  console.log(item);
  return (
    <div
      class="grid grid-rows-1 gap-4 mx-3 border-b pb-4"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <Image
        {...image}
        style={{ aspectRatio: "108 / 150" }}
        width={85}
        height={127}
        class="h-full object-contain rounded"
      />

      <div class="flex flex-col gap-3">
        <div class="flex justify-between items-center">
          <span class="text-black font-bold text-sm ">{name}</span>
        </div>
        <div class="flex gap-1 flex-col">
          <span class="line-through text-base-300 text-xs font-bold">
            {formatPrice(list, currency, locale)}
          </span>
          <span class="text-sm font-[Helvetica] text-[#363636] font-bold">
            {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
          </span>
        </div>
        <div class="flex justify-between">
          {!isGift &&
            (
              <>
                <QuantitySelector
                  disabled={loading || isGift}
                  quantity={quantity}
                  onChange={withLoading(async (quantity) => {
                    const analyticsItem = itemToAnalyticsItem(index);
                    const diff = quantity - item.quantity;

                    await onUpdateQuantity(quantity, index);

                    if (analyticsItem) {
                      analyticsItem.quantity = diff;

                      sendEvent({
                        name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                        params: { items: [analyticsItem] },
                      });
                    }
                  })}
                />

                <Button
                  disabled={loading || isGift}
                  loading={loading}
                  class="underline bg-transparent text-[#7B8794] font-[Helvetica] text-xs border-none"
                  onClick={withLoading(async () => {
                    const analyticsItem = itemToAnalyticsItem(index);

                    await onUpdateQuantity(0, index);

                    analyticsItem && sendEvent({
                      name: "remove_from_cart",
                      params: { items: [analyticsItem] },
                    });
                  })}
                >
                  REMOVER
                </Button>
              </>
            )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
