
import { Layout as cardLayout} from "$store/components/product/ProductCard.tsx";
  import type { Product } from "apps/commerce/types.ts";
  import { Container } from "deco-sites/notta/components/ui/Container.tsx";
import TabProductShelfController from "$store/islands/TabProductShelfController.tsx";
  
  
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
      Shelf: Shelf[]
   }
  
  
   
  function TabProductShelf ({
    title,
    Shelf
  }:Props){
      
  
    
      return(
         <Container>
          <TabProductShelfController
            Shelf={Shelf}
          />
    
         </Container>
      )
  }
  
  export default TabProductShelf
  
  