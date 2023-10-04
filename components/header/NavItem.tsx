import Image from "apps/website/components/Image.tsx";
import { headerHeightMobile } from "./constants.ts";
import { LinkHasTags } from "./Header.tsx";
export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

export interface IProps {
  item: INavItem;
  linkHastags?: LinkHasTags[];
}

function NavItem(
  { item, linkHastags }: IProps,
) {
  const { href, label, children, image } = item;

  return (
    <li class="group flex items-center">
      <a href={href} class="px-4 py-6">
        <span class="group-hover:underline  text-xs font-normal text-white uppercase nav-item-desktop">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div>
            <div
              class="fixed hidden hover:flex  group-hover:flex flex-col bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen  mt-[95px]"
              style={{ top: "0px", left: "0px" }}
            >
              <div class="flex gap-20  justify-between m-auto pt-6 w-full flex-row-reverse max-w-7xl pl-8 pr-10">
                {image?.src && (
                  <Image
                    class="rounded-lg"
                    src={image.src}
                    alt={image.alt}
                    width={248}
                    height={300}
                    loading="lazy"
                  />
                )}
                <ul class="flex w-[90%] items-start justify-between gap-6">
                  {children.map((node) => (
                    <li class="">
                      <a
                        class="hover:underline"
                        href={node.href}
                      >
                        {node.label.toLocaleLowerCase() ==
                            "Sale".toLocaleLowerCase()
                          ? (
                            <span class="text-[#EA94AB] font-bold uppercase">
                              {node.label}
                            </span>
                          )
                          : (
                            <span class="text-[#000] font-bold uppercase">
                              {node.label}
                            </span>
                          )}
                      </a>

                      <ul class="flex flex-col gap-1 mt-4">
                        {node.children?.map((leaf) => (
                          <li>
                            <a class="hover:underline" href={leaf.href}>
                              <span class="text-xs font-normal text-[#4F4F4F] capitalize">
                                {leaf.label}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              {linkHastags?.length !== undefined && linkHastags?.length > 0 &&
                (
                  <div class="w-full max-w-[1200px]  m-auto border-t border-[#aaaaaac0]">
                    <ul class="flex gap-8 py-4 ">
                      {linkHastags?.map((linkHastags, index) => (
                        <li key={index}>
                          <a
                            class="text-[#DAE020] text-base font-bold py-2 px-4"
                            href={linkHastags?.href}
                          >
                            {linkHastags?.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
