import React, { ReactNode } from 'react';
import './HomepagePage.css';
import Product from '../Component/Product';

type IProps = { children?: ReactNode };

const HomepagePage: React.FC<IProps> = (props: IProps) => {
	return <div className="homepage">
		<Product/>
	</div>;
};
export default HomepagePage;
