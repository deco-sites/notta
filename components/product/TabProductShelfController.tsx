
import  { Layout as cardLayout} from "$store/components/product/ProductCard.tsx";
  import {useState} from "preact/hooks";
  import type { Product } from "apps/commerce/types.ts";
  import { Container } from "deco-sites/notta/components/ui/Container.tsx";
  import Button from "deco-sites/notta/components/ui/Button.tsx";
  import TabItemProductShelf from "$store/components/product/TabItemProductShelf.tsx";
  import { usePlatform } from "$store/sdk/usePlatform.tsx"; 

interface Shelf {
    products: Product[] | null;
    title?: string;
    id?: number;
    description?: string;
    layout?: {
      headerAlignment?: "center" | "left";
      headerfontSize?: "Normal" | "Large";
    };
    cardLayout?: cardLayout;
}
 export interface Props {
    Shelf: Shelf[],
    platform: ReturnType<typeof usePlatform>;
   
 }


export default function TabProductShelfController ({Shelf,platform}: Props) {
      const [activeProduct,setActiveProduct] = useState <  Shelf | undefined | null > (Shelf[0] || null)
      const [currentShelfid,setCurrentShelfId] = useState(`P0-${Math.trunc(Math.random() * 1e6)}`)
      function SetActiveProduct (title: string | undefined, id: number | undefined){ 
        if(title && id){
          const current_shelf = Shelf.find((item) => item.title === title && item.id === id)
          setActiveProduct(current_shelf)
          setCurrentShelfId(`P0-${Math.trunc(Math.random() * 1e6)}`)
        }
      }

      const button_title = Shelf.map((item) => ({title:item.title, id: item.id})) || []

    return(
          <Container>
            {   button_title.length > 1 && (
                    <Container classes={" flex  lg:gap-10 justify-center items-center"}>
                        {
                            button_title.map((item,index) => 
                              <Button onClick={()=> SetActiveProduct(item.title, item.id)}  class={`btn  border-none h-fit w-fit uppercase text-sm  bg-transparent hover:bg-transparent hover:underline transition duration-300 ease-in-out no-animation ${item.title === activeProduct?.title && item.id === activeProduct?.id ? "underline" : ""}`}  key={index}>
                                {item.title}
                              </Button>
                            )
                        }
                    </Container>
                ) }
               {
                activeProduct && (
                    <TabItemProductShelf
                    products={activeProduct.products}
                    cardLayout={activeProduct.cardLayout}
                    description={activeProduct.description}
                    layout={activeProduct.layout}
                    platform={platform}
                    title={activeProduct.title}
                    id={currentShelfid}
                    />
                )
               }
          </Container>
    )
}