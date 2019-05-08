import React, { ReactNode } from 'react';
import { withCart, ICartValue } from "../Context/CartContext";
import productImage from './product.jpg';
import './Product.css';

type IProps = { children?: ReactNode } & ICartValue;

const addToCartButton = React.createRef<HTMLAnchorElement>();

const Product: React.FC<IProps> = (props: IProps) => {
	const cartItem = {
		name: 'Svatba Kateřiny a Michaela',
	};
	return <div className="card product">
		<img src={productImage} className="card-img-top" alt="Michael a Kateřina se berou"/>
		<div className="card-body">
			<h5 className="card-title">{cartItem.name}</h5>
			<p className="card-text">Nezapomenutelný zážitek, na který budete ještě dlouho vzpomínat.</p>
			<a
				ref={addToCartButton}
				href="#"
				className="btn btn-success"
				onClick={(event) => {
					event.preventDefault();
					props.addItem(cartItem, addToCartButton);
				}}
			>
				<i className="fa fa-cart-plus"/>
				<br/>
				Přidat do košíku
			</a>
			<h3>0,-&nbsp;Kč</h3>
		</div>
	</div>;
}
export default withCart(Product);
