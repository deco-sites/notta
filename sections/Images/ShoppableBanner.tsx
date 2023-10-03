import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  image: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
  };


  text?: string[];
  title?: string;
  link?: {
    text: string;
    href: string;
  };
}

export interface Pin {
  mobile: {
    x: number;
    y: number;
  };
  desktop?: {
    x: number;
    y: number;
  };
  link: string;
  label: string;
}

const DEFAULT_PROPS: Props = {
  link: {
    href: "#",
    text: "Ver agora",
  },
  image: {
    mobile:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/aa071a4a-fd37-4efa-abf1-f736af0409a3",
    altText: "capybara",
  },
};

export default function ShoppableBanner(props: Props) {
  const { link, text, title, image} = { ...DEFAULT_PROPS, ...props };

  return (
    <div class="container md:min-h-[684px] lg:my-10">
      <div class="flex flex-col md:flex-row gap-6 md:gap-10 h-full bg-[#DADBBA]">
        <figure  class="relative md:w-1/2">
          <Picture>
            <Source
              media="(max-width: 767px)"
              src={image?.mobile}
              width={150}
              height={150}
            />
            <Source
              media="(min-width: 768px)"
              src={image?.desktop ? image?.desktop : image?.mobile}
              width={600}
              height={684}
            />
            <img
              class="w-full object-cover"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image?.mobile}
              alt={image?.altText}
              decoding="async"
              loading="lazy"
            />
          </Picture>
        </figure>
        <div class="card-body md:w-1/2 m-auto gap-6">

              <h2 class="card-title text-3xl">{title}</h2>
              <div className="flex flex-col items-center gap-3 justify-center">
                {text?.map((item,index) => 
                  <p class="text-sm md:text-base" key={index}>{item}</p>
                )}
              </div>
              <div class="card-actions justify-start">
                <a class="btn btn-outline rounded-none md:min-w-[148px] " href={link?.href}>{link?.text}</a>
              </div>

        </div>
      </div>
    </div>
  );
}
