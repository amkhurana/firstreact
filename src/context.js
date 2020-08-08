import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'

const ProductContext = React.createContext();

class ProductProvider extends Component {
    // products:storeProducts,
    state= {
        products:[],
        detail:detailProduct,
        cart:[],
        modalOpen:false,
        modalProduct:detailProduct,
        cartSubTotal:0,
        cartTax: 0,
        cartTotal: 0
    }

    componentDidMount() {
        this.setProducts();
    }

    getItem = (id) => {
        return this.state.products.find(item => item.id ===id)
    };

    setProducts = () => {
        let prodlist = [];
        storeProducts.forEach(item => {
            const obj = {...item};
            prodlist = [...prodlist, obj];
        })
        this.setState(() => {
            return {products:prodlist}
        })
    };

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() =>
        {
            return {detail:product}
        })
    };

    addCart = (id) => {
        let temp1 = [...this.state.products];
        const index = temp1.indexOf(this.getItem(id));
        const prod = temp1[index];
        prod.inCart = true;
        prod.count = prod.count + 1;
        const price = prod.price;
        prod.total = price * prod.count;
        this.setState(() => {
            return {products:temp1, cart:[...this.state.cart, prod]}
        }, () => {
            this.addTotals();
        })
    }

    openModal = (id) => {
        const prod = this.getItem(id);
        this.setState(() => {
            return { modalProduct:prod, modalOpen: true };
        });
    };

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false };
        });
    };

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selecteditem = tempCart.find(obj => obj.id === id);
        const index = tempCart.indexOf(selecteditem);
        const item = tempCart[index];
        item.count = item.count + 1;
        item.total = item.total + item.price;
        this.setState(() => {
            return {cart: [...tempCart]}
        }, () => {
            this.addTotals();
        })
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selecteditem = tempCart.find(obj => obj.id === id);
        const index = tempCart.indexOf(selecteditem);
        const item = tempCart[index];
        item.count = item.count - 1;
        if (item.count === 0) {
            this.removeitem(id)
        }
        else
        {
            item.total = item.total - item.price;
            this.setState(() => {
                return {cart: [...tempCart]}
            }, () => {
                this.addTotals();
            })
        }
    
    }

    clearCart = () => {
        this.setState(() => {
            return {
                cart: []
            };
        }, () => {
            this.setProducts();
        })
    };

    removeitem = id => {
       let temp = [...this.state.products];
       let tempCart = [...this.state.cart];

       tempCart = tempCart.filter(obj => obj.id !== id);
       const index = temp.indexOf(this.getItem(id))
       let robj = temp[index];
       robj.inCart = false;
       robj.count = 0;
       robj.total = 0;

       this.setState(() => {
           return {
               cart: [...tempCart],
               products:[...temp]
           }
       }, () => {
           this.addTotals();
       })
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(obj => (
            subTotal += obj.total
        ));

        const temp = subTotal * .1;
        const tax = parseFloat(temp.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal:subTotal,
                cartTax:tax,
                cartTotal:total
            }
        })
    }

    tester = () => {
        console.log('State Products :', this.state.products[0].inCart);
        console.log('Data Products :', storeProducts[0].inCart);

        const temp1 = [...this.state.products];
        temp1[0].inCart = true;
        this.setState(() => {
            return {products:temp1}
        }, () => {
            console.log('State Products :', this.state.products[0].inCart);
            console.log('Data Products :', storeProducts[0].inCart);
        })
    }

    render() {
        return (
            <ProductContext.Provider value={
                {
                    ...this.state,
                    handleDetail: this.handleDetail, 
                    addCart: this.addCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    clearCart: this.clearCart,
                    removeitem: this.removeitem,
                }
             }>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
