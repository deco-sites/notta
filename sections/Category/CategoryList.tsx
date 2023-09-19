import Header from "$store/components/ui/SectionHeader.tsx";
import {Container} from "$store/components/ui/Container.tsx"
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Category {
  tag?: string;
  label: string;
  description?: string;
  href?: string;
  image?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  list?: Category[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}
function CardText(
  { tag, label, description, alignment, classes }: {
    tag?: string;
    label?: string;
    classes?: string;
    description?: string;
    alignment?: "center" | "left";
  },
) {
  return (
    <div
      class={`flex flex-col ${
        alignment === "center" ? "text-center" : "text-left" 
      } ${classes}`}
    >
      {tag && <div class="text-sm text-primary">{tag}</div>}
      {label && <h3 class="text-lg text-white uppercase ">{label}</h3>}
      {description && <div class="text-sm text-white">{description}</div>}
    </div>
  );
}

function CategoryList(props: Props) {
  const id = useId();
  const {
    list = [
      {
        tag: "10% off",
        label: "Feminino",
        description: "Moda feminina direto de Milão",
        href: "/feminino",
        image:
          "https://ik.imagekit.io/decocx/tr:w-680,h-680/https:/ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fdcb3c8f-d629-485e-bf70-8060bd8a9f65",
        buttonText: "Ver produtos",
      },
    ],
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "top",
        textAlignment: "center",
      },
    },
  } = props;

  return (
    <div
      id={id}
      class="container lg:max-w-full py-2 flex flex-col gap-8 lg:gap-10 text-base-content px-2  lg:py-3 overflow-x-auto"
    >
      <Container classes="grid grid-cols-4 gap-2 w-max md:w-full">
        {list?.slice(0,4).map((
          { tag, label, description, href, image, buttonText },
          index,
        ) => (
          <Container
          key={index}
            classes="flex flex-col gap-4 col-span-1 first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
          >
            <a
              href={href}
              class="flex flex-col gap-4 lg:w-full w-40 lg:h-auto relative"
            >
              {layout.categoryCard?.textPosition === "top" &&
                (
                  <CardText
                    tag={tag}
                    label={label}
                    classes="absolute bottom-4 left-3 z-10"
                    description={description}
                    alignment={layout?.categoryCard?.textAlignment}
                  />
                )}
              {image &&
                (
                  <figure>
                    <Image
                      class="card rounded-none w-full"
                      src={image}
                      alt={description || label || tag}
                      width={160}
                      height={195}
                      loading="lazy"
                    />
                  </figure>
                )}
              {layout.categoryCard?.textPosition === "bottom" &&
                (
                  <CardText
                    tag={tag}
                    label={label}
                    description={description}
                    alignment={layout?.categoryCard?.textAlignment}
                  />
                )}
            </a>
            {buttonText &&
              <a href={href} class="btn">{buttonText}</a>}
          </Container>
        ))}
      </Container>
    </div>
  );
}

export default CategoryList;
