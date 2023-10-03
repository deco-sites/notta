export type Item = {
  label: string;
  href: string;
};

export default function ExtraLinks({ content }: { content?: Item[] }) {
  return (
    <>
      {content && content?.length > 0 && (
        <div class="flex flex-row gap-5 lg:gap-20">
          {content.map((item) => (
            <a
              class="link uppercase no-underline text-white text-[10px] md:text-xs "
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
