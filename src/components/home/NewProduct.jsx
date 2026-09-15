import React, { useEffect, useState } from 'react'
import { listproductBy } from '../../api/product'
import ProductCard from '../card/ProductCard'
import SwiperShowProduct from '../../utils/SwiperShowProduct'
import { SwiperSlide } from 'swiper/react'

const NewProduct = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        loadData()
    }, [])


    const loadData = () => {
        listproductBy('updatedAt', "desc", 6)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    console.log(data)

    return (
        <SwiperShowProduct>
            {
                data?.map((item, index) =>
                    <SwiperSlide>
                        <ProductCard item={item} key={index} />
                    </SwiperSlide>
                )
            }
        </SwiperShowProduct>
    )
}

export default NewProduct
