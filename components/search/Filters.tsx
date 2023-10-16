import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { parseRange } from "apps/commerce/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} class="flex items-center gap-2 py-4">
      <div aria-checked={selected} class="checkbox w-5 h-5" />
      <span class="text-[#59574C] text-sm font-normal">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul
      class={`flex flex-wrap ${flexDirection} pl-5 bg-[#EDEDED] divide-y`}
    >
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url} class="py-4 mr-4">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col  py-4 w-[300px] divide-y relative">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li class="flex flex-col gap-4 py-4">
            <details class="flex gap-2 flex-col group">
              <summary class="marker:content-none cursor-pointer flex group-open:mb-4">
                <span class="text-[#59574C] font-bold text-sm capitalize pl-4">
                  {filter.label}
                </span>
                <Icon
                  width={20}
                  height={20}
                  strokeWidth={1.3}
                  id="ArrowUp"
                  class="rotate-[180deg] group-open:rotate-[360deg] absolute right-5"
                />
              </summary>
              <FilterValues {...filter} />
            </details>
          </li>
        ))}
    </ul>
  );
}

export default Filters;
