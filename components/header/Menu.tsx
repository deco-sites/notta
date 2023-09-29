import Icon from "$store/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";
import { useState } from "preact/hooks";
import Searchbar from "../search/Searchbar.tsx";
import FooterMenu from "./FooterMenu.tsx";

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
            class="text-[#626262] text-sm font-normal uppercase px-2 py-5 flex justify-between items-center"
          >
            <p>{item.label}</p>
            <Icon class="rotate-180" id="ArrowLeft" size={20} strokeWidth={1} />
          </div>
          <div
            class={`fixed top-0 left-0 w-[100%] h-full bg-white shadow-lg transition-transform transform ${
              isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div>
              <Searchbar />
            </div>
            <div
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              class="text-[#626262] text-base font-bold uppercase px-2 py-5 flex gap-3 items-center"
            >
              <Icon id="ArrowLeft" size={20} strokeWidth={1} />
              {item.label}
            </div>
            <ul class="h-[70%] pb-40 bg-white divide-y overflow-y-auto">
              {itemMenu?.children?.map((node) => (
                <li class="text-[#626262] text-sm font-normal uppercase mx-4 px-2 py-5 flex justify-between items-center">
                  <MenuItemSecond item={node} />
                </li>
              ))}
            </ul>
            <FooterMenu />
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
        <div class="w-full">
          <div
            onClick={() => toggleDrawerSecond(item)}
            class="text-[#626262] text-sm font-normal uppercase  flex justify-between items-center w-full"
          >
            <p>{item.label}</p>
            <Icon class="rotate-180" id="ArrowLeft" size={20} strokeWidth={1} />
          </div>
          <div
            class={`fixed top-0 left-0  w-[100%] h-full bg-white shadow-lg transition-transform transform ${
              isDrawerOpenSecond
                ? "translate-x-0 z-[1000]"
                : "-translate-x-full"
            }`}
          >
            <div>
              <Searchbar />
            </div>
            <div
              onClick={() => setIsDrawerOpenSecond(!isDrawerOpenSecond)}
              class="text-[#626262] text-base font-bold uppercase px-2 py-5 flex gap-3 items-center"
            >
              <Icon id="ArrowLeft" size={20} strokeWidth={1} />
              {item.label}
            </div>

            <ul class="h-[70%] pb-40 bg-white overflow-y-auto">
              {itemMenuSecond?.children?.map((node) => (
                <li class="text-[#626262] text-sm font-normal uppercase mx-4 px-2 py-5 flex justify-between items-center">
                  <MenuItemSecond item={node} />
                </li>
              ))}
            </ul>
            <FooterMenu />
          </div>
        </div>
      )
      : (
        <div>
          <a
            href={item.href}
          >
            {item.label.toLocaleLowerCase() == "Sale".toLocaleLowerCase()
              ? (
                <span class="text-[#EA94AB] text-sm font-bold">
                  {item.label}
                </span>
              )
              : (
                <span class="text-[#626262] text-sm font-normal uppercase">
                  {item.label}
                </span>
              )}
          </a>
        </div>
      )
  );
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full bg-white w-[345px] re">
      <div>
        <Searchbar />
      </div>
      <ul class="h-[60%] flex flex-col mx-4  bg-white divide-y pb-40  overflow-y-auto">
        {items?.map((item) => (
          <li class="">
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <FooterMenu />
    </div>
  );
}

export default Menu;
