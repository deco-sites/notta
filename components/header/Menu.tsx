import Icon from "$store/components/ui/Icon.tsx";
import type { INavItem } from "./NavItem.tsx";
import { useState } from "preact/hooks";
// import Searchbar from "../search/Searchbar.tsx";
import SearchbarMobile from "../search/SearchbarMobile.tsx";
import FooterMenu from "./FooterMenu.tsx";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [itemMenu, setItemMenu] = useState(item);

  const toggleDrawer = (item: INavItem) => {
    setItemMenu(item);
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
            class={`fixed top-[180px] left-0 w-[100%] h-[65%] overflow-auto pb-56 bg-white transition-transform transform ${
              isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              class="text-[#626262] text-base font-bold uppercase px-2 py-5 flex gap-3 items-center"
            >
              <Icon id="ArrowLeft" size={20} strokeWidth={1} />
              {item.label}
            </div>
            <ul class="bg-white divide-y pb-10">
              {itemMenu?.children?.map((node) => (
                <li class="text-[#626262] text-sm font-normal uppercase mx-4 px-2 py-5 flex justify-between items-center">
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

  const targetDiv = document.querySelectorAll("#menu-item-second"); // Substitua 'suaDiv' pelo

  const toggleDrawerSecond = (item: INavItem) => {
    setItemMenuSecond(item);

    setIsDrawerOpenSecond(!isDrawerOpenSecond);


    if (targetDiv) {
      targetDiv.forEach((item) => (
        item.scrollTo({ top: 0, behavior: "smooth" })
      ));
    }
  };

  return (
    item.children !== undefined && item?.children?.length > 0
      ? (
        <div class="w-full ">
          <div
            onClick={() => toggleDrawerSecond(item)}
            class="text-[#626262] text-sm font-normal uppercase  flex justify-between items-center w-full"
          >
            <p>{item.label}</p>
            <Icon class="rotate-180" id="ArrowLeft" size={20} strokeWidth={1} />
          </div>
          <div
            id="menu-item-second"
            class={`fixed top-0 left-0 bottom-0 max-h-[480px] w-[100%] h-screen overflow-auto bg-white  transition-transform transform ${
              isDrawerOpenSecond
                ? "translate-x-0 z-[1000]"
                : "-translate-x-full"
            }`}
          >
            {
              /* <div class="">
              <Searchbar />
            </div> */
            }
            <div
              onClick={() => setIsDrawerOpenSecond(!isDrawerOpenSecond)}
              class="text-[#626262] text-base font-bold uppercase px-2 py-5 flex gap-3 items-center"
            >
              <Icon id="ArrowLeft" size={20} strokeWidth={1} />
              {item.label}
            </div>

            <ul class="bg-white pb-10">
              {itemMenuSecond?.children?.map((node) => (
                <li class="text-[#626262] text-sm font-normal uppercase mx-4 px-2 py-5 flex justify-between items-center">
                  <MenuItemSecond item={node} />
                </li>
              ))}
            </ul>
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
      <div class="">
        <SearchbarMobile />
      </div>
      <ul class="flex flex-col  mx-4  pb-[80px] overflow-auto h-[50%]  bg-white divide-y">
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
