import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const { displayCart } = useUI();
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };

  return (
    <div class="indicator">
      <span class="indicator-item bg-white px-1 rounded-full text-black font-bold w-4 h-4 text-[11px] top-[3px] left-[10px]">
        {totalItems > 9 ? "9+" : totalItems}
      </span>

      <Button
        class="p-0 outline-none min-h-full bg-transparent border-none hover:bg-transparent h-6"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        <Icon
          class="icon-cart"
          id="ShoppingCart"
          size={24}
          height={21}
          strokeWidth={1.1}
        />
      </Button>
    </div>
  );
}

export default CartButton;
