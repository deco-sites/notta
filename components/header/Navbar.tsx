import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import Image from "apps/website/components/Image.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { INavItem } from "./NavItem.tsx";
import NavItem from "./NavItem.tsx";
import { headerHeightDesktop, headerHeightMobile } from "./constants.ts";

function Navbar({ items, searchbar, logo }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div class="md:hidden flex flex-row justify-between items-center w-full px-4 gap-2 bg-gradient-to-b from-[#000000d8] to-transparent backdrop-blur-[1px] pt-6 pb-12">
        <div class="flex gap-2 w-[76px]">
          <MenuButton />
          <SearchButton />
        </div>

        {logo && (
          <a
            href="/"
            class="inline-flex items-center"
            style={{ minHeight: headerHeightMobile }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={94} height={28} />
          </a>
        )}

        <div class="flex gap-3">
          <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" size={24} strokeWidth={1.1} />
          </a>
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex bg-gradient-to-b from-[rgba(0,0,0,0.77)] to-transparent backdrop-blur-[1px] pt-6 pb-6">
        <div class="md:flex flex-row w-full justify-between items-center  max-w-screen-xl px-10 m-auto">
          <div class="flex justify-center">
            {items.map((item) => <NavItem item={item} />)}
          </div>
          <div class="flex-none w-44">
            {logo && (
              <a
                href="/"
                aria-label="Store logo"
                class="block px-4 pb-5 w-[203px]"
              >
                <Image src={logo.src} alt={logo.alt} width={203} height={44} />
              </a>
            )}
          </div>
          <div class="flex-none w-44 flex items-center justify-end gap-2">
            <SearchButton />
            <Searchbar searchbar={searchbar} />
            <a
              class="btn btn-circle btn-sm btn-ghost"
              href="/login"
              aria-label="Log in"
            >
              <Icon id="User" size={24} strokeWidth={1} />
            </a>
            <a
              class="btn btn-circle btn-sm btn-ghost"
              href="/wishlist"
              aria-label="Wishlist"
            >
              <Icon
                id="HeartWhite"
                size={24}
                strokeWidth={1}
                fill="none"
              />
            </a>
            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
            {platform === "wake" && <CartButtonWake />}
            {platform === "shopify" && <CartButtonShopify />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
