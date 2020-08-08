import React, { Component } from 'react'
import Product from './Product'
import Title from './Title';
import { storeProducts } from '../data';
import { ProductConsumer } from '../context';

export default class Productlist extends Component {
    state = {
        products: storeProducts
    };
    render() {
        return (
            <React.Fragment>
                    <div className="py-5">
                        <div className="container">
                            <Title name="first" title="products" />
                            <div className="row">
                                <ProductConsumer>
                                    {
                                    x => {
                                        return x.products.map (
                                          prod => {
                                            return <Product key={prod.id} product={prod}/>
                                          }
                                        )
                                      }
                                    }
                                </ProductConsumer>

                            </div>
                        </div>
                    </div>
                </React.Fragment>
        )
    }
}
