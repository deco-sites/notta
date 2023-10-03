import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export type Item = {
  label: string;
  href?: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row  gap-32 ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-4">
                  <span class="text-[#12100C] text-sm font-bold uppercase">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-4 flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      <li>
                        <a
                          href={item.href}
                          class="block text-[#12100C] text-xs font-normal link link-hover capitalize"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden ">
            {sections.map((section) => (
              <>
                <li>
                  <details class="flex gap-3 flex-col group">
                    <summary class="marker:content-none flex justify-center p-4 relative">
                      <span class="text-base text-[#12100C] font-bold uppercase">
                        {section.label}
                      </span>
                      <Icon
                        width={24}
                        height={24}
                        strokeWidth={1}
                        id="ArrowUp"
                        class="rotate-[180deg] group-open:rotate-[360deg] absolute right-5"
                      />
                    </summary>
                    <ul
                      class={`flex flex-col gap-3 items-center pb-8`}
                    >
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="text-[#12100C] text-xs font-normal flex justify-center capitalize"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              </>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
