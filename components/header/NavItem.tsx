import Image from "apps/website/components/Image.tsx";
import { headerHeightMobile } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
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
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 w-screen mt-[95px] flex-row-reverse"
            style={{ top: "0px", left: "0px" }}
          >
            {image?.src && (
              <Image
                class="p-6 rounded-lg"
                src={image.src}
                alt={image.alt}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="p-6">
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
        )}
    </li>
  );
}

export default NavItem;
