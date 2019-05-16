import React from 'react';
import classNames from 'classnames';
import './LocationPage.css';

const planImage = require('./planek.jpg');

const LocationPage: React.FC = () => {
	const locationElement = (className: string) => (
		<div className={classNames("mapouter", className)}>
			<div className="gmap_canvas">
				<iframe
					id="gmap_canvas"
					src="https://maps.google.com/maps?q=Statek%20u%20Prahy&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
					frameBorder={0}
					scrolling="no"
					marginHeight={0}
					marginWidth={0}
				/>
				<a href="https://www.emojilib.com">emojilib.com</a>
			</div>
		</div>
	);
	return <div className="location">
		{locationElement('before')}
		<h2>Místo konání</h2>
		<p>
			Na okraji městysu jménem Škvorec, který je jen pár kilometrů
			od hlavního města, stojí velký statek s příhodným
			jménem - <a target="_blank" href="http://www.statekuprahy.cz">Statek u Prahy</a>.
		</p>
		<p>
			Celý prostor je moderně zrekonstruovaný
			a skládá se z velké zahrady, na které bude probíhat obřad a samozřejmě také statku,
			v němž se bude odehrávat následná hostina i večerní párty.
			Na druhé straně areálu je restaurace,
			která nebude součástí svatebního veselí, ale do budoucna vám ji určitě
			doporučujeme navštívit 😊
		</p>
		<h2>JAK SE SEM DOSTAT Z PRAHY?</h2>
		<p>
			Doporučujeme jet po dálnici E50. U Doubravic sjet směrem na Říčany, skrz které dojedete až za námi do Škvorce.
			Několik parkovacích míst je přímo u Statku. Pokud budou po vašem příjezdu zaplněna, 
			postavte auto na parkoviště k hostinci U Zálabských, jenž je kousek od Statku - <i>Masarykovo náměstí 49</i>.
		</p>
		<p>
			Pokud dáte přednost hromadné dopravě, doporučujeme jet vlakem z <i>Hlavního nádraží</i>, vystoupit v Úvalech a přes zastávku <i>Úvaly</i>,
			<i>U Mlýna</i> dojet autobusem až na <i>Škvorec, nám.</i> Odtud je statek vzdálen jen asi 150 metrů chůze.
		</p>
		{locationElement('after')}
	</div>;
};
export default LocationPage;
