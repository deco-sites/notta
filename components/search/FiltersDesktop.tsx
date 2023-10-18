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
import { useUI } from "../../sdk/useUI.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  console.log(selected);
  return (
    <a href={url} class="flex items-center gap-2">
      {/* <div aria-checked={selected} class="checkbox w-5 h-5" /> */}
      <span
        class={`item-filter-dropdown-${selected} text-[#59574C] text-sm font-normal`}
      >
        {label}
      </span>
      {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";
  console.log(values);
  // const valueNoBrand = values.filter(values)

  return (
    <ul
      class={`flex flex-wrap gap-4 ${flexDirection}`}
    >
      {key !== "marca" &&
        values.map((item) => {
          const { url, selected, value, quantity } = item;

          if (key === "cor" || key === "tamanho") {
            return (
              <a href={url} class="">
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

function FiltersDesktop({ filters }: Props) {
  const { displayDropdown } = useUI();
  const teste = () => {
    displayDropdown.value = !displayDropdown.value;
  };

  return (
    <div class="hidden md:flex">
      <button
        class="flex justify-between w-[125px] border-[0.5px] border-[#000] p-3 rounded-0 text-xs uppercase text-[#12100c]"
        onClick={teste}
      >
        Filtros
        <Icon
          width={16}
          height={16}
          strokeWidth={2}
          id="ArrowDownFilter"
          class=""
        />
      </button>
      {displayDropdown.value
        ? (
          <ul class="dropdown-filter flex flex-row bg-white left-0  divide-x w-full top-16 absolute z-10 py-9">
            {filters
              .filter(isToggle)
              .map((filter) => (
                filter.label != "Marca" &&
                (
                  <li class="flex flex-row gap-4 max-w-[255px] px-9">
                    <div class="flex flex-col gap-8">
                      <span class="text-[#6e6d63] font-bold text-sm capitalize">
                        {filter.label}
                      </span>
                      <div class="flex ">
                        <FilterValues {...filter} />
                      </div>
                    </div>
                  </li>
                )
              ))}
          </ul>
        )
        : <></>}
    </div>
  );
}

export default FiltersDesktop;
