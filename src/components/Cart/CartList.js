import React from 'react';
import CartItem from "./CartItem";

export default function CartList({value}) {
    const { cart } = value;

    return (
        <div className="container-fluid">
            {cart.map(obj => {
                return <CartItem key={obj.id} item={obj} value={value} />;
            })}
        </div>
    );
}
