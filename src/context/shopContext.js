import React, { Component } from "react";
import Client from "shopify-buy";

const ShopContext = React.createContext();

const client = Client.buildClient({
	domain: "projecttofu.myshopify.com",
	storefrontAccessToken: "9f4c3852c8d9bcce091726007a160769"
});

export class ShopProvider extends Component {
	state = {
		product: {},
		products: [],
		checkout: {},
		isCartOpen: false,
		isMenuOpen: false
	};

	componentDidMount() {
		if (localStorage.checkout_id) {
			this.fetchCheckout(localStorage.checkout_id);
		} else {
			this.createCheckout();
		}
	}

	createCheckout = async () => {
		const checkout = await client.checkout.create();
		localStorage.setItem("checkout_id", checkout.id);
		this.setState({ checkout: checkout });
	};

	fetchCheckout = (checkoutId) => {
		client.checkout.fetch(checkoutId).then((checkout) => {
			this.setState({ checkout: checkout });
		});
	};

	addItemtoCheckout = async (variantId, quantity) => {
		const lineItemsToAdd = [
			{
				variantId: variantId,
				quantity: parseInt(quantity, 10)
			}
		]
		const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd)
		this.setState({ checkout: checkout })

		this.openCart();
	};

	removeLineItem = async (lineItemIdsToRemove) => {
		const checkout = await client.checkout.removeLineItems(this.state.checkout.id, lineItemIdsToRemove)
		this.setState({ checkout: checkout })
	};

	fetchAllProducts = async () => {
		const products = await client.product.fetchAll();
		this.setState({ products: products });
		console.log(products);
	};

	fetchProductWithHandle = async (handle) => {
		const product = await client.product.fetchByHandle(handle);
		this.setState({ product: product });
		console.log(product);
	};

	closeCart = () => { this.setState({ isCartOpen: false})};

	openCart = () => { this.setState({ isCartOpen: true })};

	closeMenu = () => { this.setState({ isMenuOpen: false })};

	openMenu = () => { this.setState({ isMenuOpen: true })};

	render() {
		return (
			<ShopContext.Provider
				value={{
					...this.state,
					fetchAllProducts: this.fetchAllProducts,
					fetchProductWithHandle: this.fetchProductWithHandle,
                    addItemtoCheckout: this.addItemtoCheckout,
                    removeLineItem: this.removeLineItem,
                    closeCart: this.closeCart,
                    openCart: this.openCart,
                    closeMenu: this.closeMenu,
                    openMenu: this.openMenu
				}}>
				{this.props.children}
			</ShopContext.Provider>
		);
	}
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;