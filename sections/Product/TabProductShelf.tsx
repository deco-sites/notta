import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

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
    const id = useId();
  const platform = usePlatform();
 
    return(
        title &&
        <div>
            "teste"
        </div>
    )
}

export default TabProductShelf

