import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { withCart, ICartValue } from "../Context/CartContext";
import productImage from './product.jpg';
import arrowImage from './arrow.png';
import './Product.css';

type IProps = { children?: ReactNode; className?: string } & ICartValue;

const addToCartButton = React.createRef<HTMLAnchorElement>();

const Product: React.FC<IProps> = (props: IProps) => {
	const cartItem = {
		id: 'wedding',
		name: 'Svatba Kateřiny a Michaela',
		description: <>
			<p>
				Během dne <b>28. září</b> bude rezonovat bujaré veselí. A bude to právě to svatební,<br/>
				při kterém se její radostná empatie a jeho fascinující logika spojí v jedno.<br/>
				A s trochou pohádkového optimismu se již nikdy nerozpojí ♥
			</p>
			<p>
				Celý den bude probíhat na <b>Statku u Prahy</b> od <b>jedné hodiny</b> odpolední<br/>
				a oběma budoucím novomanželům bude ctí, když jej od začátku až <br/>
				do konce prožijete s nimi.
			</p>
		</>,
	};
	return <div className={classNames("card product", props.className)}>
		<img src={productImage} className="card-img-top" alt="Michael a Kateřina se berou"/>
		<div className="card-body">
			<h5 className="card-title">{cartItem.name}</h5>
			<hr/>
			<p className="card-text">{cartItem.description}</p>
			<div className="priceWrapper">
				<span className="price">0&nbsp;Kč</span>
				<a
					ref={addToCartButton}
					href="#"
					className="btn btn-secondary"
					onClick={(event) => {
						event.preventDefault();
						props.addItem(cartItem, addToCartButton);
					}}
				>
					Tenhle den si nenechám ujít! <i className="fa fa-cart-plus"/>
				</a>
			</div>
		</div>
		<img src={arrowImage} className="arrow" alt="Šup do košíku"/>
	</div>;
}
export default withCart(Product);
