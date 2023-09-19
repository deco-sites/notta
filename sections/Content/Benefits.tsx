import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
export interface Props {
  title?: string;
  description?: string;
  benefits?: Array<{
    label: string;
    icon: ImageWidget;
    description: string;
  }>;
  layout?: {
    variation?: "Simple" | "With border" | "Color reverse";
    headerAlignment?: "center" | "left";
  };
}
 const viewWidth = window.screen
 console.log(viewWidth);
 
export default function Benefits(
  props: Props,
) {
  const {
    title = "",
    description = "",
    benefits = [{
      icon: "Truck",
      label: "Frete Grátis",
      description: "Lorem Ipsum Dolor Sit Amet, consectur adipiscing elit.",
    }, {
      icon: "Discount",
      label: "Feito a mão",
      description: "Lorem Ipsum Dolor Sit Amet, consectur adipiscing elit.",
    }, {
      icon: "ArrowsPointingOut",
      label: "Compra Segura",
      description: "Lorem Ipsum Dolor Sit Amet, consectur adipiscing elit.",
    },
    {
      icon: "ArrowsPointingOut",
      label: "Embalagens Customizadas",
      description: "Lorem Ipsum Dolor Sit Amet, consectur adipiscing elit.",
    }],
    layout,
  } = props;

  const listOfBenefits = benefits.map((benefit, index) => {
    const reverse = layout?.variation === "Color reverse";
    const benefitLayout = !layout?.variation || layout?.variation === "Simple"
      ? "tiled"
      : "piledup";

    return (
      <div
        class={` col-span-1 ${
          reverse ? "bg-primary text-primary-content p-4 lg:px-8 lg:py-4" : ""
        } flex gap-4 items-center ${
          benefitLayout == "piledup" ? "flex-col items-center text-center" : ""
        }  ${
          !reverse ? "lg:pb-0" : ""
        }`}
      >
        <div class="flex-none">
          <img
            src={benefit.icon}
            class={reverse ? "text-base-100" : "text-primary"}
            width={48}
            height={48}
          />
        </div>
        <div class="flex-auto flex flex-col gap-1 lg:gap-2">
          <div
            class={`text-base lg:text-xl leading-7 ${
              reverse ? "text-base-100" : "text-base-content"
            }`}
          >
            {benefit.label}
          </div>
          <p
            class={`text-sm leading-5 ${
              reverse ? "text-base-100" : "text-neutral"
            } ${benefitLayout == "piledup" ? "hidden lg:block" : ""}`}
          >
            {benefit.description}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      {!layout?.variation || layout?.variation === "Simple"
        ? (
          <div class="w-full container px-4 py-8 flex flex-col gap-8 lg:gap-10 lg:py-10 lg:px-0">
            <Header
              title={title}
              description={description}
              alignment={layout?.headerAlignment || "center"}
            />
            <div class="w-full flex justify-center">
              <div class="flex flex-col gap-4 lg:gap-8 w-full lg:grid grid-flow-col auto-cols-fr">
                {listOfBenefits}
              </div>
            </div>
          </div>
        )
        : ""}
      {layout?.variation === "With border" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full py-6 px-4 border border-base-300 lg:gap-8 lg:grid-flow-col lg:auto-cols-fr lg:p-10">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
      {layout?.variation === "Color reverse" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-4 gap-4 w-full lg:gap-8 ">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
