
import  { Layout as cardLayout} from "$store/components/product/ProductCard.tsx";
  import {useState} from "preact/hooks";
  import type { Product } from "apps/commerce/types.ts";
  import { Container } from "deco-sites/notta/components/ui/Container.tsx";
  import Button from "deco-sites/notta/components/ui/Button.tsx";
  import ProductShelf from "$store/components/product/ProductShelf.tsx";
  

interface Shelf {
    products: Product[] | null;
    title?: string;
    description?: string;
    layout?: {
      headerAlignment?: "center" | "left";
      headerfontSize?: "Normal" | "Large";
    };
    cardLayout?: cardLayout;
}
 export interface Props {
    Shelf: Shelf[],
  
 }


export default function TabProductShelfController ({Shelf}: Props) {
      const [activeProduct,setActiveProduct] = useState <Shelf | undefined | null > (Shelf[0] || null)

      function SetActiveProduct (title: string | undefined){ 
        if(title){
          const current_shelf = Shelf.find((item) => item.title === title)
          
          setActiveProduct(current_shelf)
        }
      }

      const button_title = Shelf.map((item) => item.title) || []

    return(
          <Container>
            {   button_title.length && (
                    <Container classes={" flex  gap-2 justify-center items-center"}>
                        {
                            button_title.map((item,index) => 
                                <Button onClick={()=> SetActiveProduct(item)} class={`btn no-animation ${item === activeProduct?.title ? "bg-black" : ""}`}  key={index}>
                                {item}
                                </Button>
                            )
                        }
                    </Container>
                ) }
               {
                activeProduct && (
                    <ProductShelf
                    products={activeProduct.products}
                    cardLayout={activeProduct.cardLayout}
                    description={activeProduct.description}
                    layout={activeProduct.layout}
                    />
                )
               }
          </Container>
    )
}