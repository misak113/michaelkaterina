import React from 'react';
import classNames from 'classnames';
import './GiftsPage.css';
import giftsImage from './gifts.jpg';

const GiftsPage: React.FC = () => {
	const giftsImageElement = (className: string) => (
		<img src={giftsImage} className={classNames("giftsIimage", className)} alt="Svatební dary"/>
	);
	return <div className="gifts">
		{giftsImageElement('before')}
		<h2>Svatební dary</h2>
		<p>
			Jelikož už spolu nějaký čas obýváme jednu domácnost, máme vše z většiny vybavené.
			Proto bychom vás raději poprosili o obálku. A kdybyste nám do ní i něco malého dali,
			o to větší radost bychom měli 😊
		</p>
		{giftsImageElement('after')}
	</div>;
};
export default GiftsPage;
