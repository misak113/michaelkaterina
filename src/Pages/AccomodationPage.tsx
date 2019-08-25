import React from 'react';
import classNames from 'classnames';
import './AccomodationPage.css';
import { Carousel } from 'react-responsive-carousel';
import statekUPrahyImage from './statek-u-prahy.jpg';
import penzionNaAmericeImage from './penzion-na-americe.webp';
import penzionPetraImage from './penzion-petra.jpg';

const AccomodationPage: React.FC = () => {
	const accomodationImageElement = (className: string) => (
		<Carousel infiniteLoop={true} autoPlay={true} showThumbs={false} showStatus={false} className={classNames("accomodationIimage", className)}>
			<div>
				<img src={statekUPrahyImage} />
			</div>
			<div>
				<img src={penzionNaAmericeImage} />
			</div>
			<div>
				<img src={penzionPetraImage} />
			</div>
		</Carousel>
	);
	return <div className="accomodation">
		{accomodationImageElement('before')}
		<h2>Ubytování</h2>
		<p>
			Jak už víte, nepodaří se nám zajistit ubytování v místě svatby všem. Našli jsme ale hezké penziony ve vesnici vedle, do kterých vám ve večerních hodinách zajistíme odvoz, popř. i s autem. 
		</p>
		<p>
			Pokud jste měli o ubytování zájem, napsali jsme vám do zprávy název penzionu, ve kterém budete přespávat. Pokoj jsme vám zamluvili na jméno, aby na každého vyzbylo místo. Už si jej tedy nemusíte rezervovat. Kdybyste si náhodou ubytování rozmysleli, dejte nám prosím vědět.
		</p>
		{accomodationImageElement('after')}
		<table className="table list">
			<tbody>
				<td>
					<h2><a href="http://www.statekuprahy.cz/" target="_blank">Statek u Prahy</a></h2>
					<p>
						Check-in: 11:00 - 18:00<br/>
						Check-out: 10:00
					</p>
					<p>
						Ubytování pro rodinu a svědky. Snídaně je součástí pobytu.
					</p>
				</td>
				<td>
					<h2><a href="https://www.na-americe.cz/" target="_blank">Penzion na Americe</a></h2>
					<p>
						Check-in: 12:00<br/>
						Check-out: 10:00
					</p>
					<p>
						<b>Lze platit kartou.</b><br/>
						Parkovat můžete na dvoře, který je součástí penzionu.
					</p>
					<p>
						Snídaně není součástí pobytu. Pokud o ni budete mít zájem,
						zavolejte si prosím do penzionu. Snídaně se podává
						mezi 8:00 - 10:00 a cena za osobu je 100 korun.
					</p>
				</td>
				<td>
					<h2><a href="http://www.petra-penzion.cz/" target="_blank">Restaurace a penzion Petra</a></h2>
					<p>
						Check-in: 11:30<br/>
						Check-out: 12:00
					</p>
					<p>
						<b>Nelze platit kartou.</b><br/>
						Parkovat můžete na dvoře, který je součástí penzionu.
					</p>
					<p>
						Snídaně není součástí pobytu. Pokud o ni budete mít zájem,
						zavolejte si prosím do penzionu. Snídaně se podává
						mezi 8:00 - 10:00 a cena za osobu je 100 korun.
					</p>
				</td>
			</tbody>
		</table>
	</div>;
};
export default AccomodationPage;
