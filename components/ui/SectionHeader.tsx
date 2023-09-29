interface Props {
  title?: string;
  fontSize?: "Normal" | "Large" | "Small";
  description?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
}

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col  ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title &&
              (
                <h1
                  class={`text-base leading-8 lg:leading-10
                  ${ 
                    props.colorReverse
                      ? "text-primary-content"
                      : "text-base-content"
                  }
                  ${props.fontSize === "Normal" ? "lg:text-xl" : props.fontSize === "Large" ? "lg:text-4xl" : ""}
                `}
                >
                  {props.title}
                </h1>
              )}
            {props.description &&
              (
                <h2
                  class={`
                   text-sm
                  leading-6 lg:leading-8
                  ${
                    props.colorReverse ? "text-primary-content" : "text-neutral"
                  }
                  ${props.fontSize === "Normal" ? "lg:text-base" :  props.fontSize === "Large" ? "lg:text-xl" : ""}
                `}
                >
                  {props.description}
                </h2>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
