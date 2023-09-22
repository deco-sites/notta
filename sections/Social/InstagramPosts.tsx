import type { SectionProps } from "deco/mod.ts";
import Image from "apps/website/components/Image.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";

export interface layout {
  headerAlignment?: "center" | "left";
  /** @description Default is 12 */
  numberOfPosts?: number;
  /** @description Up to 6. Default is 4 */
  postsPerLine?: number;
}

export interface Data {
  id: string;
  permalink: string;
  media_type: string;
  media_url: string;
}

export interface Props {
  title?: string;
  description?: string;
  /**
   * @description Instagram user.
   */
  instagramUser?:string;
  /**
   * @description Get it in Facebook app. Expires every 90 days.
   * @format textarea
   */
  facebookToken: string;
  layout?: layout;
}

export async function loader(
  {
    title,
    description,
    facebookToken,
    layout,
    instagramUser,
  }: Props,
  _req: Request,
) {
  const fields = ["media_url", "media_type", "permalink"];
  const joinFields = fields.join(",");
  const url =
    `https://graph.instagram.com/me/media?access_token=${facebookToken}&fields=${joinFields}`;

  const { data } = (await fetch(url).then((r) => r.json()).catch((err) => {
    console.error("error fetching posts from instagram", err);
    return { data: [] };
  })) as {
    data: Data[];
  };

  return {
    data: data.slice(0, layout?.numberOfPosts ?? 6),
    title,
    description,
    layout,
    instagramUser
  };
}

export default function InstagramPosts({
  title,
  description,
  instagramUser,
  layout,
  data = [
    {
      id: "placeholderInsta",
      permalink: "#",
      media_type: "IMAGE",
      media_url: "",
    },
  ],
}: SectionProps<typeof loader>) {
  return (
    <div class="w-full container lg:max-w-[900px] mx-auto px-4 py-8 flex flex-col gap-6 lg:gap-8 lg:py-14 lg:px-0">
      <div class="flex flex-col items-center justify-center gap-4">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
        
          {
                instagramUser && 
                <div class={"flex justify-center items-center w-full"}>
                  <a href={`https://www.instagram.com/${instagramUser.replace("@","")}`} target="_blank" class="btn btn-primary bg-transparent min-w-[148px] text-black font-normal text-sm" rel="noopener noreferrer">
                    {instagramUser}
                  </a>
                </div>
              } 
      </div>
      <div class="hidden lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6"></div>
      <div
        class={`grid grid-cols-2 lg:grid-cols-${
          layout?.postsPerLine || 3
        } gap-2 items-center justify-center place-items-center`}
      >
        {data.map((item) => (
          <a
            key={item.id}
            href={item.permalink}
            target="_blank"
            title="Visite nosso instagram"
            class=" overflow-hidden w-full max-w-[350px] col-span-1 sm:max-w-[350px] group"
          >
            {item.media_type === "IMAGE"
              ? (
                <div class="w-full pt-[100%] relative ">
                  <Image
                    class="max-w-full max-h-full object-cover w-full group-hover:scale-110 absolute top-0 left-0 h-full   transition duration-400 group-hover:brightness-90"
                    src={item.media_url ?? ""}
                    alt="Imagem do instagram"
                    width={350}
                    height={350}
                    loading="lazy"
                  />

                </div>
              )
              : (
                <div class="w-full pt-[100%] relative">
                  <video controls preload="none" class="w-full h-full object-cover absolute top-0 left-0">
                    <source src={item.media_url}></source>
                  </video>

                </div>
              )}
          </a>
        ))}
      </div>
    </div>
  );
}
