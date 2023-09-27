import Header from "$store/components/ui/SectionHeader.tsx";

export interface Form {
  placeholderEmail?: string;
  placeholderName?: string;
  placeholderBirthDate?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  form?: Form;
  layout?: {
    headerFontSize?: "Large" | "Normal";
    content?: {
      border?: boolean;
      alignment?: "Center" | "Left" | "Side to side";
      bgColor?: "Normal" | "Reverse";
    };
  };
}

const DEFAULT_PROPS: Props = {
  title: "",
  description: "",
  form: {
    placeholderEmail: "Digite seu email",
    placeholderName: "Digite seu Nome",
    placeholderBirthDate: "Digite seu Aniversário",
    buttonText: "Inscrever",
    helpText:
      'Ao se inscrever, você concorda com nossa <a class="link" href="/politica-de-privacidade">Política de privacidade</a>.',
  },
  layout: {
    headerFontSize: "Large",
    content: {
      border: false,
      alignment: "Center",
    },
  },
};

export default function Newsletter(props: Props) {
  const { title, description, form, layout } = { ...DEFAULT_PROPS, ...props };
  const isReverse = layout?.content?.bgColor === "Reverse";
  const bordered = Boolean(layout?.content?.border);

  const headerLayout = (
    <Header
      title={title}
      description={description}
      alignment={layout?.content?.alignment === "Left" ? "left" : "center"}
      colorReverse={isReverse}
      fontSize={layout?.headerFontSize}
    />
  );

  const formLayout = form && (
    <form action="/" class="flex flex-col gap-6 items-center justify-center">
      <div class="flex flex-col lg:flex-row gap-3">
        <input
          class="input input-bordered lg:w-80"
          type="text"
          placeholder={form.placeholderName}
        />
        <input
          class="input input-bordered lg:w-80"
          type="text"
          placeholder={form.placeholderEmail}
        />
        <input
          class="input input-bordered lg:w-80"
          type="text"
          placeholder={form.placeholderBirthDate}
        />
        
      </div>
      <div class="flex flex-col justify-center gap-4 items-center ">
        <button
            class={`btn ${isReverse ? "btn-accent" : "btn-primary bg-black transition duration-300 ease-in-out hover:bg-white font-normal text-white hover:text-black hover:border hover:border-black border-none rounded-none"}`}
            type="submit"
          >
            {form.buttonText}
          </button>
          {form.helpText && (
        <div
          class="text-xs text-center"
          dangerouslySetInnerHTML={{ __html: form.helpText }}
        />
        )}
      </div>
    
    </form>
  );

  const bgLayout = isReverse
    ? "bg-secondary text-secondary-content"
    : "bg-transparent";

  return (
    <div
      class={`${
        bordered
          ? isReverse ? "bg-secondary-content" : "bg-secondary"
          : bgLayout
      } ${bordered ? "p-4 lg:p-16" : "p-0"}`}
    >
      {(!layout?.content?.alignment ||
        layout?.content?.alignment === "Center") && (
        <div
          class={`container flex flex-col rounded p-4 gap-6 lg:p-16 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-center">
            {formLayout}
          </div>
        </div>
      )}
      {layout?.content?.alignment === "Left" && (
        <div
          class={`container flex flex-col rounded p-4 gap-6 lg:p-16 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-start">
            {formLayout}
          </div>
        </div>
      )}
      {layout?.content?.alignment === "Side to side" && (
        <div
          class={`container flex flex-col rounded justify-between  p-4 gap-6 lg:p-16 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-center">
            {formLayout}
          </div>
        </div>
      )}
    </div>
  );
}
