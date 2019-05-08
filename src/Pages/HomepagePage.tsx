import React, { ReactNode } from 'react';
import './HomepagePage.css';
import Product from '../Component/Product';

type IProps = { children?: ReactNode };

const HomepagePage: React.FC<IProps> = (props: IProps) => {
	return <div className="homepage">
		<h2>O svatbě</h2>
		<p>Rádi bychom se s vámi podělili o nezapomenutelný moment naší svatby.</p>

		<hr/>

		<Product/>
	</div>;
};
export default HomepagePage;
