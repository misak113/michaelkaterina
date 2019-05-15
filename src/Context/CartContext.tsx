import React, { useState, ReactNode } from 'react';
import _ from 'lodash';
import './CartContext.css';

export interface ICartItem {
	id: string;
	name: string;
	description?: any;
}

export interface ICartValue {
	items: ICartItem[];
	addItem: (item: ICartItem, fromRef?: React.RefObject<HTMLElement>) => Promise<void>;
	removeItem: (item: ICartItem) => Promise<void>;
}

export const CartContext = React.createContext<ICartValue>({} as ICartValue);

interface IOwnProps {
	children: ReactNode;
	toRef: React.RefObject<HTMLElement>;
}

function getElementCoordination(element: HTMLElement) {
	const targetEl = element.getBoundingClientRect();
	const doc = document.documentElement!;
	const docTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
	const docLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	return {
		top: targetEl.top + docTop,
		left: targetEl.left + docLeft,
	};
}

const CART_ITEMS = 'CART_ITEMS';

export function CartProvider(props: IOwnProps) {
	const storedCartItemsString = localStorage.getItem(CART_ITEMS);
	const storedCartItems = storedCartItemsString ? JSON.parse(storedCartItemsString) : [];
	const [items, setItems] = useState<ICartItem[]>(storedCartItems);
	const addItem = async (addedItem: ICartItem, fromRef?: React.RefObject<HTMLElement>) => {
		setTimeout(() => {
			const newCartItems = [...items.filter((item) => item.id !== addedItem.id), _.omit(addedItem, 'description')];
			localStorage.setItem(CART_ITEMS, JSON.stringify(newCartItems));
			setItems(newCartItems);
		}, 2e3);

		if (fromRef && fromRef.current) {
			const fromCoordination = getElementCoordination(fromRef.current);
			const floatElement = document.createElement('i');
			floatElement.innerHTML = 'Zážitek';
			floatElement.className = 'cartItem fa fa-box';
			floatElement.style.top = fromCoordination.top + 'px';
			floatElement.style.left = fromCoordination.left + 'px';
			document.body.appendChild(floatElement);
			setTimeout(() => {
				if (props.toRef.current) {
					const toCoordination = getElementCoordination(props.toRef.current);
					floatElement.style.top = toCoordination.top + 'px';
					floatElement.style.left = toCoordination.left + 'px';
				}
			}, 200);
			setTimeout(() => {
				floatElement.parentElement!.removeChild(floatElement);
			}, 2e3);
		}
	};
	const removeItem = async (removedItem: ICartItem) => {
		const newCartItems = items.filter((item) => item.id !== removedItem.id);
		localStorage.setItem(CART_ITEMS, JSON.stringify(newCartItems));
		setItems(newCartItems);
	};
	return (
		<CartContext.Provider value={{ addItem, removeItem, items }}>
			{props.children}
		</CartContext.Provider>
	);
}

export const withCart = <TOwnProps extends {}>(WrappedComponent: React.ComponentType<TOwnProps & ICartValue>) => (
	(props: TOwnProps) => (
		<CartContext.Consumer>
			{(value: ICartValue) => <WrappedComponent {...props} {...value} />}
		</CartContext.Consumer>
	)
);
