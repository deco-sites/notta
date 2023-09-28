import Icon from "$store/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";
import { useState } from "preact/hooks";
import Searchbar from "../search/Searchbar.tsx";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [itemMenu, setItemMenu] = useState(item);

  const toggleDrawer = (item: INavItem) => {
    setItemMenu(item);
    console.log(item);
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    item.children !== undefined && item?.children?.length > 0
      ? (
        <div class="">
          <div
            onClick={() => toggleDrawer(item)}
            class="collapse-title text-[#626262] text-sm font-normal uppercase px-2 py-5"
          >
            {item.label}
          </div>
          <div
            class={`fixed top-0 left-0 w-[100%] h-full bg-white shadow-lg transition-transform transform ${
              isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              class="text-[#626262] text-base font-bold uppercase px-2 py-5"
            >
              {item.label}
              <Icon id="ArrowLeft" size={24} strokeWidth={1} />
            </div>
            <ul>
              {itemMenu?.children?.map((node) => (
                <li class="text-[#626262] text-sm font-normal uppercase px-2 py-5 ">
                  <MenuItemSecond item={node} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
      : (
        <div class="px-2 py-5">
          <a
            class=" text-[#626262] text-sm font-normal uppercase"
            href={item.href}
          >
            {item.label}
          </a>
        </div>
      )
  );
}
function MenuItemSecond({ item }: { item: INavItem }) {
  const [isDrawerOpenSecond, setIsDrawerOpenSecond] = useState(false);
  const [itemMenuSecond, setItemMenuSecond] = useState(item);

  const toggleDrawerSecond = (item: INavItem) => {
    setItemMenuSecond(item);
    console.log(item);
    setIsDrawerOpenSecond(!isDrawerOpenSecond);
  };

  return (
    item.children !== undefined && item?.children?.length > 0
      ? (
        <div class="">
          <div
            onClick={() => toggleDrawerSecond(item)}
            class="collapse-title text-[#626262] text-sm font-normal uppercase px-2 py-5"
          >
            {item.label}
          </div>
          <div
            class={`fixed top-0 left-0  w-[100%] h-full bg-white shadow-lg transition-transform transform ${
              isDrawerOpenSecond
                ? "translate-x-0 z-[1000]"
                : "-translate-x-full"
            }`}
          >
            <div
              onClick={() => setIsDrawerOpenSecond(!isDrawerOpenSecond)}
              class="text-[#626262] text-base font-bold uppercase px-2 py-5"
            >
              {item.label}
              <Icon id="ArrowLeft" size={24} strokeWidth={1} />
            </div>

            <ul>
              {itemMenuSecond?.children?.map((node) => (
                <li class="text-[#626262] text-sm font-normal uppercase px-2 py-5 ">
                  <MenuItemSecond item={node} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
      : (
        <div class="px-2 py-5">
          <a
            class=" text-[#626262] text-sm font-normal uppercase"
            href={item.href}
          >
            {item.label}
          </a>
        </div>
      )
  );
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full bg-white w-[345px]">
      <div>
        <Searchbar />
      </div>
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200">
        {items?.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col py-6 px-4 bg-[#F6F6F6] border-t border-[#E1E1E1]">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="UserBlack" size={24} strokeWidth={1} />
            <span class="text-xs font-normal capitalize text-[#626262]">
              Fazer Login/Registrar
            </span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/wishlist"
          >
            <Icon id="Heart" size={24} strokeWidth={1} fill="none" />
            <span class="text-xs font-normal capitalize text-[#626262]">
              Meus Favoritos
            </span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="Truck" size={24} strokeWidth={1.5} />
            <span class="text-xs font-normal capitalize text-[#626262]">
              Meus Pedidos
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
