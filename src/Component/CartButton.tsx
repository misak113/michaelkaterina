import React, { ReactNode } from 'react';
import { withCart, ICartValue } from "../Context/CartContext";
import classNames from 'classnames';
import './CartButton.css';

type IProps = { children?: ReactNode } & ICartValue;

const CartButton: React.FC<IProps> = (props: IProps) => {
	return (
		<i
			className={classNames("shoppingCart fa fa-shopping-cart", {
				'active': props.items.length > 0,
			})}
		/>
	);
}
export default withCart(CartButton);
