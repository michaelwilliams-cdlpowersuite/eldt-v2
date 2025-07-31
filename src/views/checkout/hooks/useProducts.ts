import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../api/api";

export interface Product {
    id: number;
    sku: string;
    title: string;
    shortDescription: string;
    longDescription?: string;
    price: number;
    type: 'course' | 'theory' | 'endorsement' | 'custom_unit';
    forCourse?: string;
    uiOptions?: {
        htmlTitle?: string;
        courseLabel?: string;
        isPopular?: boolean;
        icon?: string;
    };
    creditPrice?: number;
    creditPriceFormatted?: number;
    uniquePurchaseWithinCategory?: boolean;
    category?: string;
}

export const useProducts = (cdlClass?: string) => {
    return useQuery<Product[]>({
        queryKey: ["products", cdlClass],
        queryFn: () => getProducts(cdlClass),
        enabled: !!cdlClass, // Only fetch when cdlClass is provided
    });
}; 