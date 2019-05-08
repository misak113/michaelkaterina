import ReactDOM from 'react-dom';
import React, { useState, ReactNode } from 'react';
import './CartContext.css';

export interface ICartItem {
	name: string;
}

export interface ICartValue {
	items: ICartItem[];
	addItem: (item: ICartItem, fromRef?: React.RefObject<HTMLElement>) => Promise<void>;
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

export function CartProvider(props: IOwnProps) {
	const [items, setItems] = useState<ICartItem[]>([]);
	const addItem = async (item: ICartItem, fromRef?: React.RefObject<HTMLElement>) => {
		setTimeout(() => {
			setItems([...items, item]);
		}, 2e3);

		if (fromRef && fromRef.current) {
			const fromCoordination = getElementCoordination(fromRef.current);
			const floatElement = document.createElement('i');
			floatElement.innerHTML = 'Produkt';
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
	return (
		<CartContext.Provider value={{ addItem, items }}>
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
