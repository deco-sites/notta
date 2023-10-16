import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);

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
      <div class="flex flex-col justify-between mb-4  sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px] sm:border-b sm:border-base-200">
        <div class="flex flex-col  border-b border-base-200 py-2 sm:gap-4 sm:border-none">
          <div class="flex flex-row items-center sm:p-0">
            <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
          </div>
          <div class="flex gap-3 justify-between">
            <button
              class={`${
                displayFilter ? "" : "sm:hidden"
              } flex border-[0.5px] border-[#000] p-3 rounded-0 text-xs uppercase text-[#12100c] w-[45%] gap-3`}
              onClick={() => {
                open.value = true;
              }}
            >
              Filtros
              <Icon
                width={20}
                height={16}
                strokeWidth={2}
                id="ArrowDownFilter"
                class=""
              />
            </button>
            {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
