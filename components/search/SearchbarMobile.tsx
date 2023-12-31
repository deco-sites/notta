/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useAutocomplete } from "apps/vtex/hooks/useAutocomplete.ts";
import { useEffect, useRef } from "preact/compat";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default O que você está procurando?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

function SearchbarMobile({
  placeholder = "O que você está procurando?",
  action = "/s",
  name = "q",
  query,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions, loading } = useAutocomplete();
  const { products = [], searches = [] } = suggestions.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const notFound = !hasProducts && !hasTerms;

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  return (
    <div
      class="w-[345px]  md:w-[460px] grid  container px-4 py-6 overflow-y-hidden"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form id={id} action={action} class="join bg-[#F6F6F6] rounded-lg">
        <Button
          type="submit"
          class="join-item bg-[#F6F6F6] border-none"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : <Icon id="MagnifyingGlassBlack" size={24} strokeWidth={1.1} />}
        </Button>
        <input
          ref={searchInputRef}
          id="search-input"
          class="input border-none bg-[#F6F6F6] rounded-lg p-0 outline-none focus:outline-none w-[80%] text-[#111] font-normal text-sm font-[Helvetica] placeholder:text-xs"
          name={name}
          defaultValue={query}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setSearch(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />
        <Button
          type="button join-item"
          class="btn-ghost btn-square hidden sm:inline-flex"
          onClick={() => displaySearchPopup.value = false}
        >
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button>
      </form>

      {notFound
        ? (
          <div class="flex flex-col gap-4 w-full">
            {
              /* <span
              class="font-medium text-xl text-center"
              role="heading"
              aria-level={3}
            >
              Nenhum resultado encontrado
            </span>
            <span class="text-center text-base-300">
              Vamos tentar de outro jeito? Verifique a ortografia ou use um
              termo diferente
            </span> */
            }
          </div>
        )
        : (
          <div class="overflow-y-scroll mt-4 h-[300px] top-[170px] px-4 absolute z-10 bg-white">
            <div class="gap-2 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[150px_1fr]">
              <div
                class={hasTerms ? "flex flex-col gap-6" : "hidden"}
              >
                <span
                  class="font-bold uppercase text-base text-[#626262]"
                  role="heading"
                  aria-level={3}
                >
                  Sugestões
                </span>
                <ul id="search-suggestion" class="flex flex-col pl-3 gap-2">
                  {searches.slice(0, 2).map(({ term }) => (
                    <li>
                      <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                        {
                          /* <span>
                          <Icon
                            id="MagnifyingGlassBlack"
                            size={24}
                            strokeWidth={1.1}
                          />
                        </span> */
                        }
                        <span class="capitalize text-[#626262] font-normal text-sm">
                          {term}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                class={hasProducts
                  ? "flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden"
                  : "hidden"}
              >
                <span
                  class="font-bold uppercase text-base text-[#626262]"
                  role="heading"
                  aria-level={3}
                >
                  Produtos
                </span>

                {products.map((product, index) => (
                  <div key={index}>
                    <a href={product.url} class="flex gap-4">
                      <div>
                        <img
                          src={product?.image?.[0].url}
                          alt="Product image"
                          width={66}
                          height={80}
                          class="max-w-none rounded"
                        />
                      </div>
                      <div class="flex flex-col gap-[6px]">
                        <h2 class="text-[#626262] font-[Helvetica] font-normal text-[12px]">
                          {product?.name}
                        </h2>
                        <p>
                          {product?.offers?.lowPrice !== undefined
                            ? product.offers.lowPrice.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                            : "Preço indisponível"}
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default SearchbarMobile;
