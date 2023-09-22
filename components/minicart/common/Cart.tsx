import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { asset } from "$fresh/runtime.ts";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
  onClose?: () => void;
  imageBag: ImageWidget;
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden"
      style={{ minWidth: "calc(min(100vw, 425px))", maxWidth: "425px" }}
    >
      {isEmtpy
        ? (
          <div class="flex flex-col gap-6 items-center">
            <div>
              <img
                height={86}
                width={86}
                src="/image/bag-dark.png"
                alt="Image Bag"
              />
            </div>
            <span class="font-normal text-base text-black font-[Helvetica]">
              Sua sacola está vazia.
            </span>
            <Button
              class="btn-outline bg-black font-[Helvetica] w-48 text-white font-normal "
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Continuar Comprando
            </Button>
          </div>
        )
        : (
          <>
            {/* Cart Items */}
            <ul
              role="list"
              class="mt-6 px-2 flex-grow overflow-y-auto flex flex-col gap-6 w-full"
            >
              {items.map((item, index) => (
                <li key={index}>
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>

            {/* Free Shipping Bar */}
            <div class="px-2 py-4 w-full">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div>

            {/* Cart Footer */}
            <footer class="w-full">
              {/* Subtotal */}
              <div class="py-2 flex flex-col">
                {discounts > 0 && (
                  <div class="flex justify-between items-center px-4">
                    <span class="text-sm">Descontos</span>
                    <span class="text-sm">
                      {formatPrice(discounts, currency, locale)}
                    </span>
                  </div>
                )}
                <div class="w-full flex justify-between text-sm px-4">
                  <span class="text-xs text-[#616E7C] font-normal font-[Helvetica]">
                    Subtotal
                  </span>
                  <span class="text-sm text-[#616E7C] font-bold font-[Helvetica]">
                    {formatPrice(subtotal, currency, locale)}
                  </span>
                </div>
                {/* <Coupon onAddCoupon={onAddCoupon} coupon={coupon} /> */}
              </div>

              {/* Total */}
              <div class="pt-4 flex flex-col justify-end items-end gap-2 mx-4">
                <div class="flex justify-between items-center w-full text-base text-[#1C1C1E] font-bold font-[Helvetica]">
                  <span class="">
                    Total
                  </span>
                  <span>
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
                {
                  /* <span class="text-sm text-base-300">
                  Taxas e fretes serão calculados no checkout
                </span> */
                }
              </div>

              <div class="flex flex-col p-4 gap-4 ">
                <a class="inline-block w-full" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="bg-black text-white font-normal font-[Helvetica] w-full rounded"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total - discounts,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    Finalizar compra
                  </Button>
                </a>
                <button
                  class="text-sm text-black font-normal font-[Helvetica] px-6 py-3 flex justify-center items-center"
                  onClick={() => {
                    displayCart.value = false;
                  }}
                >
                  Continuar comprando
                </button>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
