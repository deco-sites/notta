import { Product } from "apps/commerce/types.ts";

// import ProductCard, {
//   Layout as cardLayout,
// } from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import ProductCardCategory, {
  Layout as cardLayout,
} from "$store/components/product/ProductCardCategory.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;
  layout?: cardLayout;
}

function ProductGallery({ products, layout }: Props) {
  const platform = usePlatform();

  return (
    <div class="grid grid-cols-2 gap-2 items-center sm:grid-cols-4">
      {products?.map((product) => (
        product.image?.filter((image) => image.name !== "medida")?.map((
          image,
          index,
        ) => (
          <ProductCardCategory
            product={product}
            preload={index === 0}
            layout={layout}
            platform={platform}
            index={index}
          />
        ))
      ))}
    </div>
  );
}

export default ProductGallery;
