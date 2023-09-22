import { Picture, Source } from "apps/website/components/Picture.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;

  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description Adicione um link
   */
  href: string;
  action?: {
    /** @description title for the image */
    title: string;
    /** @description description for the image */
    description?: string;
    /** @description Button label */
    label: string;
  };
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  description?: string;
  /**
   * @maxItems 3
   * @minItems 3
   */
  banners?: Banner[];
  layout?: {
    /**
     * @description Aplique borda a sua imagem
     */
    borderRadius?: {
      /** @default none */
      mobile?: BorderRadius;
      /** @default none */
      desktop?: BorderRadius;
    };
    headerAlignment?: "center" | "left";
    mobile?: "Asymmetric" | "Symmetrical";
    desktop?: "Asymmetric" | "Symmetrical";
  };
}

const RADIUS: Record<string, Record<BorderRadius, string>> = {
  mobile: {
    "none": "rounded-none",
    "sm": "rounded-sm",
    "md": "rounded-md",
    "lg": "rounded-lg",
    "xl": "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    "full": "rounded-full",
  },
  desktop: {
    "none": "sm:rounded-none",
    "sm": "sm:rounded-sm",
    "md": "sm:rounded-md",
    "lg": "sm:rounded-lg",
    "xl": "sm:rounded-xl",
    "2xl": "sm:rounded-2xl",
    "3xl": "sm:rounded-3xl",
    "full": "sm:rounded-full",
  },
};

const DEFAULT_PROPS: Props = {
  "banners": [
    {
      "srcMobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/4b5b4797-8728-483f-a7af-f775b0afb01a",
      "srcDesktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/a8ba1db7-3e23-47e5-83ac-43dfbd2413fd",
      "alt": "capi",
      "href": "/capibara",
      "action":{
        "title": "PÉROLAS EM ALTA",
        "description": "A nova coleção cuidadosamente selecionada de joias deslumbrantes, projetadas para mulheres que desejam destacar sua beleza única.",
        "label": "Confira"
      }
    },
    {
      "alt": "Capybara",
      "href": "https://en.wikipedia.org/wiki/Capybara",
      "srcMobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/cabc6f7d-7f9b-4f37-9ed7-3ebe840f4087",
      "srcDesktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/9704ea7e-1810-4f3c-bd17-00e755022e57",
        "action":{
          "title": "PÉROLAS EM ALTA",
          "label": "Confira"
        }
    },
    {
      "srcMobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/3ec93523-7b64-4c23-987a-410e59e86471",
      "srcDesktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/18e739cc-31d3-4e5a-9d24-abd4a39697c2",
      "href": "https://en.wikipedia.org/wiki/Capybara",
      "alt": "Capybara",
      "action":{
        "title": "PÉROLAS EM ALTA",
        "label": "Confira"
      }
    }
  ],
  "layout": {
    "borderRadius": {
      "mobile": "3xl",
      "desktop": "2xl",
    },
    "headerAlignment": "center",
    "mobile": "Asymmetric",
    "desktop": "Asymmetric",
  },
};

function Banner(
  props: Banner & {
    borderRadius?: {
      /** @default none */
      mobile?: BorderRadius;
      /** @default none */
      desktop?: BorderRadius;
    };
    classes?: string;
  },
) {
  const { borderRadius, srcMobile, srcDesktop, alt ,href} = props;
  const {action} = props;
  const radiusDesktop = RADIUS.desktop[borderRadius?.desktop ?? "none"];
  const radiusMobile = RADIUS.mobile[borderRadius?.desktop ?? "none"];

  return (
    <div
      
      class={`overflow-hidden ${radiusDesktop} ${radiusMobile} relative`}
    >
          <CardText
        tag={action?.title}
        label={action?.label}
        classes="absolute bottom-8 left-4 z-10 max-w-[80%] md:max-w-[30%]"
        description={action?.description}
        href={href}
      />
      <a href={props.href}>
        <Picture>
            <Source
              width={190}
              height={190}
              media="(max-width: 767px)"
              src={srcMobile}
            />
            <Source
              width={640}
              height={420}
              media="(min-width: 768px)"
              src={srcDesktop || srcMobile}
            />
            <img
              class="w-full h-full object-cover"
              src={srcMobile}
              alt={alt}
              decoding="async"
              loading="lazy"
            />
        </Picture>
      </a>
    </div>
  );
}

function CardText(
  { tag, label, description, alignment, classes,href }: {
    tag?: string;
    href?: string;
    label?: string;
    classes?: string;
    description?: string;
    alignment?: "center" | "left";
  },
) {
  return (
    <div
      class={`flex flex-col gap-3  ${classes}`}
    >
      {tag && <h3 class="text-2xl font-bold text-white uppercase">{tag}</h3>}
      {description && <p class="text-sm text-white">{description}</p>}
      {href && label && <a class={"btn bg-white text-[#434A1B] rounded-none transition duration-300 ease-in-out hover:bg-black hover:text-white border-none px-6 max-w-[148px] py-3"} href={href}>{label}</a>}
    </div>
  );
}


export default function Gallery(props: Props) {
  const { title, description, banners, layout } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  const mobileItemLayout = (index: number) =>
    layout?.mobile === "Symmetrical"
      ? "row-span-3"
      : index === 0 || index === 3
      ? "row-span-3"
      : "row-span-2";

  const desktopItemLayout = (index: number) =>
    layout?.desktop === "Symmetrical"
      ? "sm:row-span-3"
      : index === 0 || index === 3
      ? "sm:row-span-3"
      : "sm:row-span-2";

  return (
    <section class="container max-w-full  py-8 flex flex-col gap-8 lg:gap-10 lg:py-10 px-0">
      {
        banners?.length == 3?
          <ul class="flex flex-wrap gap-2 md:grid md:grid-cols-2">
            {banners?.map((banner, index) => (
              <li class={`${index == 0 ? 'col-span-2 h-auto' : 'col-span-1 h-auto relative' }`}>
                <Banner {...banner} borderRadius={props.layout?.borderRadius} />
              </li>
            ))}
          </ul> 
          :
          <ul class="grid grid-flow-col grid-cols-2 grid-rows-6 gap-4 list-none">
            {banners?.map((banner, index) => (
              <li class={`${mobileItemLayout(index)} ${desktopItemLayout(index)} relative`}>
                <Banner {...banner} borderRadius={props.layout?.borderRadius} />
              </li>
            ))}
          </ul>
          
      }
    </section>
  );
}
