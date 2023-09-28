
import { Layout as cardLayout} from "$store/components/product/ProductCard.tsx";
  import type { Product } from "apps/commerce/types.ts";
  import { Container } from "deco-sites/notta/components/ui/Container.tsx";
import TabProductShelfController from "$store/islands/TabProductShelfController.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx"; 

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
      title?: string;
      Shelf: Shelf[];
       /** 
       @format color
      * @title Base
       * @default "transparent"
    */
   backgroundColor?: string;
   }
  
  
   
  function TabProductShelf ({
    title,
    Shelf,
    backgroundColor = "transparent"
  }:Props){
     const setShelfId = Shelf.map(item => ({...item,id:Math.floor(Math.random()* 1000)})) 

    const platform = usePlatform();
    
      return(
         <section style={{background:`${backgroundColor}`}}   class={`lg:mt-10 lg:mb-20 container mx-auto   relative lg:py-10`} >
          <TabProductShelfController
            Shelf={setShelfId}
            platform={platform}
          />
    
         </section>
      )
  }
  
  export default TabProductShelf
  
  