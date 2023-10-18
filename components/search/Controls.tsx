import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { Signal, useSignal } from "@preact/signals";
import FiltersDesktop from "./FiltersDesktop.tsx";

import type { ProductListingPage } from "apps/commerce/types.ts";
import { useUI } from "../../sdk/useUI.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  {
    filters,
    breadcrumb,
    displayFilter,
    sortOptions,
  }: Props,
) {
  const open = useSignal(false);
  const { displayDropdown } = useUI();

  const teste = () => {
    displayDropdown.value = !displayDropdown.value;
    console.log("teste", displayDropdown.value);
  };

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-between items-center bg-[#DADBBA] px-4 py-7">
              <h1>
                <span class="font-normal text-base text-[#12100C]">
                  Filtros
                </span>
              </h1>
              <Button
                class="btn btn-ghost p-0"
                onClick={() => open.value = false}
              >
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-between mb-4  sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px]">
        <div class="flex flex-col py-2 sm:gap-4 sm:border-none md:flex-row md:justify-between md:w-full">
          <div class="flex flex-row items-center sm:p-0">
            <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
          </div>
          <div class="flex gap-3 justify-between  ">
            <button
              class={`${
                displayFilter ? "" : "sm:hidden"
              } flex border-[0.5px] border-[#000] p-3 rounded-0 text-xs uppercase text-[#12100c] w-[45%] justify-between`}
              onClick={() => {
                open.value = true;
              }}
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
            <div class="flex gap-4 justify-end w-[45%] md:w-full">
              <FiltersDesktop filters={filters} />
              {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
