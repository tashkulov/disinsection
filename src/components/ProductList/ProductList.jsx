import React, {useCallback, useEffect, useState} from 'react';
import ProductItem from "../ProductItem/ProductItem.jsx";
import {useTelegram} from "../../hooks/useTelegram.js";
import './PorductList.css'
const products = [
    {
        id: 1,
        title: "Levi's 501 Original Fit Jeans",
        description: 'Классические джинсы Levi\'s 501 с прямым кроем',
        price: 7990
    },
    {
        id: 2,
        title: 'Nike Air Max 270',
        description: 'Спортивные кроссовки Nike Air Max 270',
        price: 1990
    },
    {
        id: 3,
        title: 'Adidas Originals T-shirt',
        description: 'Футболка Adidas Originals с логотипом',
        price: 2990
    },
    {
        id: 4,
        title: 'Tommy Hilfiger Hoodie',
        description: 'Толстовка Tommy Hilfiger с капюшоном',
        price: 6990
    },
    {
        id: 5,
        title: 'Uniqlo Ultra Light Down Jacket',
        description: 'Легкий пуховик Uniqlo Ultra Light Down',
        price: 8990
    },
    {
        id: 6,
        title: 'Zara Slim Fit Chinos',
        description: 'Чиносы Zara Slim Fit с карманами',
        price: 3990
    },
    {
        id: 7,
        title: 'H&M Cotton Shirt',
        description: 'Хлопковая рубашка H&M с длинным рукавом',
        price: 1990
    },
    {
        id: 8,
        title: 'Puma Running Shorts',
        description: 'Спортивные шорты Puma для бега',
        price: 1490
    },
    {
        id: 9,
        title: 'New Balance 574',
        description: 'Кроссовки New Balance 574 в классическом стиле',
        price: 9990
    },
    {
        id: 10,
        title: 'Gap Basic Hoodie',
        description: 'Базовая толстовка Gap с капюшоном',
        price: 4990
    }
];

const getTotalPrice=(items)=>{
    return items.reduce((acc,item)=>{
        return acc+=item.price
    },0)
}


const ProductList = () => {
    const [addedItems,setAddedItems]=useState([]);
    const {tg,queryId}=useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products:addedItems,
            totalPrice:getTotalPrice(addedItems),
            queryId,
        };
        fetch('http://localhost:5173/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        })
    }, [ tg]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);

        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);


    const  onAdd=(product)=>{

        const  alreadyAdded =addedItems.find(item=>item.id===product.id)
        let newItems=[];

        if(alreadyAdded){
            newItems=addedItems.filter(item=>item.id !== product.id );
        }else{
            newItems=[...addedItems,product]
        }

        setAddedItems(newItems)

        if(newItems.length===0){
            tg.MainButton.hide();

        }else{
            tg.MainButton.show();
            tg.MainButton.setParams({
                text:`Купить ${getTotalPrice(newItems)}`
            })
        }
    }


    return (
        <div className={'list'}>
            {products.map(item=>(
                <ProductItem
                product={item}
                onAdd={onAdd}
                className={'item'}
                />
            ))}


        </div>
    );
};

export default ProductList;