import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/globalState";
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import ProductItem from '../ProductItem';
import { CarouselItem } from "../CarouselItem";

function ProductList() {

    const [state, dispatch] = useStoreContext();
    const { loading, data: productData } = useQuery(QUERY_ALL_PRODUCTS);
    const { products } = state;

    useEffect(() => {
        if (productData) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: productData.allProducts
            });
        };
    }, [dispatch, productData])

    const { currentCategory } = state;

    function selectCategory() {
        // console.log(state)
        if (!currentCategory.id) {
            return products;
        } else {
            //TODO: for this to work, we need to have a category reference id in the product model
            return products.filter((item) => item.category.some(category => category._id === currentCategory.id));
        }
    }
    // console.log(selectCategory())
    return (
        <>
            {selectCategory().map((item) => (

                <ProductItem
                    key={item._id}
                    _id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.imageSource}

                />
            ))}


        </>
    )
}
export default ProductList;