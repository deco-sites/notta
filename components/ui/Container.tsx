import type { ComponentChildren, JSX } from "preact";

interface Props{
    children: ComponentChildren;
    classes?: string
}


export function Container({children,classes}:Props){
    return (
        <section class={classes}>
            {children}
        </section>
    )
} 