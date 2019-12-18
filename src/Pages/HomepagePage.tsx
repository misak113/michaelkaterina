import React, { ReactNode } from 'react';
import './HomepagePage.css';
import { IMAGE_BASE_URL } from './ImagesPage';

type IProps = { children?: ReactNode };

const HomepagePage: React.FC<IProps> = (props: IProps) => {
	return <div className="homepage">
		<a href="/fotografie">
			<img className="image" src={`${IMAGE_BASE_URL}/thumbnails/1200x800/HB2_2077.jpg`}/>
		</a>
		<h2>Děkujeme za ten nejkrásnější zážitek</h2>
		<p>
			Za pár dnů to budou už tři měsíce, co jsme spolu s vámi prožili náš velký den.<br/>
			Přesto se k němu ve vzpomínkách pořád vracíme, dojímáme se a sem tam se i hezky zasmějeme 🖤
		</p>
		<p>
			A abychom v tom nebyli sami, rádi bychom s vámi sdíleli všechny střípky,<br/>
			které máme od našeho fotografa a kameramana k dispozici 🙂
		</p>
	</div>;
};
export default HomepagePage;
