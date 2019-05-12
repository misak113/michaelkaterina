import React, { ReactNode, useState } from 'react';
import { withCart, ICartValue } from "../Context/CartContext";
import classNames from 'classnames';
import './CartButton.css';
import { ORDER_SENT } from '../Pages/CartPage';

type IProps = { children?: ReactNode } & ICartValue;

const CartButton: React.FC<IProps> = (props: IProps) => {
	const [orderSent] = useState<boolean | undefined>(!!localStorage.getItem(ORDER_SENT) || undefined);

	return <div className="shoppingCart">
		<i
			className={classNames("fa fa-shopping-cart", {
				'active': props.items.length > 0,
			})}
		/>
		{!orderSent && props.items.length > 0 && window.location.pathname !== '/kosik' ? (
			<div
				className="popover fade show bs-popover-bottom"
			>
				<div className="arrow"></div>
				<h3 className="popover-header"></h3>
				<div className="popover-body">
					Právě jste si přidali nezapomenutelný zážitek do vašeho košíku.<br/>
					Pro dokončení pokračujte do objednávky.
					<a
						href="/kosik"
						className="btn btn-primary"
					>
						<i className="fa fa-shopping-cart"/>
						<br/>
						Dokončit objednávku
					</a>
				</div>
			</div>
		) : null}
	</div>;
}
export default withCart(CartButton);
