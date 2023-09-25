
import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard, {
    Layout as cardLayout,
  } from "$store/components/product/ProductCard.tsx";
  import Icon from "$store/components/ui/Icon.tsx";
  import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
  import { useId } from "$store/sdk/useId.ts";
  import {useState} from "preact/hooks";
  import { useOffer } from "$store/sdk/useOffer.ts";
  import Slider from "$store/components/ui/Slider.tsx";
    import SliderJS from "$store/islands/SliderJS.tsx";
  import { usePlatform } from "$store/sdk/usePlatform.tsx";
  import type { Product } from "apps/commerce/types.ts";
  import { Container } from "deco-sites/notta/components/ui/Container.tsx";
  import Button from "deco-sites/notta/components/ui/Button.tsx";
  
  
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
  
      const [activeProduct,setActiveProduct] = useState <Shelf | undefined | null > (Shelf[0] || null)
      const id = useId();
      const platform = usePlatform()

      
  
      function SetActiveProduct (title: string | undefined){
     
        
        if(title){
          const current_shelf = Shelf.find((item) => item.title === title)
          
          setActiveProduct(current_shelf)
        }
      }
  
      const button_title = Shelf.map((item) => item.title)
  
    
      return(
         <Container>
            {
              button_title.length && (
                <Container classes={" flex  gap-2 justify-center items-center"}>
                    {
                      button_title.map((item,index) => 
                        <Button onClick={()=> SetActiveProduct(item)} class={`btn no-animation ${item === activeProduct?.title ? "bg-black" : ""}`}  key={index}>
                           {item}
                        </Button>
                      )
                    }
              </Container> )
            }
            {/* <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
          {activeProduct?.products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[270px] sm:w-[292px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={activeProduct.cardLayout}
                platform={platform}
              />
            </Slider.Item>
          ))}
        </Slider>


          <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        <SliderJS rootId={id} />
        { activeProduct?.products &&
                <SendEventOnLoad
                event={{
                name: "view_item_list",
                params: {
                    item_list_name: title,
                    items: activeProduct?.products?.map((product) =>
                    mapProductToAnalyticsItem({
                        product,
                        ...(useOffer(product.offers)),
                    })
                    ),
                },
                }}
            />
        }     
      </div> */}
         </Container>
      )
  }
  
  export default TabProductShelf
  
  