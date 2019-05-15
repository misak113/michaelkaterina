import React from 'react';
import './LocationPage.css';

const planImage = require('./planek.jpg');

const LocationPage: React.FC = () => {
	return <div className="location">
		<div className="mapouter">
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
		<h2>Místo konání</h2>
		<p>
			Na okraji městysu jménem Škvorec, která je jen pár kilometrů <br/>
			od hlavního města, stojí velký statek s příhodným<br/>
			jménem  - <a target="_blank" href="http://www.statekuprahy.cz">Statek u Prahy</a>.
		</p>
		<p>
			Celý prostor je moderně zrekonstruovaný
			a skládá se z velké zahrady, na které bude probíhat obřad a samozřejmě také statku,<br/>
			v němž se bude odehrávat následná hostina i večerní párty. <br/>
			Na druhé straně areálu je restaurace,
			která nebude součástí svatebního veselí, ale do budoucna vám ji určitě <br/>
			doporučujeme navštívit 😊
		</p>
		<h2>JAK SE SEM DOSTAT Z PRAHY?</h2>
		<p>
			Doporučujeme jet po dálnici E50. U Doubravic sjet směrem <br/>na Říčany, skrz které dojedete až za námi do Škvorce.
			Několik parkovacích míst je přímo u Statku. Pokud budou po vašem příjezdu zaplněna, 
			postavte auto na parkoviště k hostinci <br/>U Zálabských, jenž je kousek od Statku - <i>Masarykovo náměstí 49</i>.
		</p>
		<p>
			Pokud dáte přednost hromadné dopravě, doporučujeme jet vlakem z <i>Hlavního nádraží</i>, vystoupit v Úvalech a přes zastávku <i>Úvaly</i>, <br/>
			<i>U Mlýna</i> dojet autobusem až na <i>Škvorec, nám.</i> Odtud je statek vzdálen jen asi 150 metrů chůze.
		</p>
		<img src={planImage} className="plan" alt="plánek"/>
	</div>;
};
export default LocationPage;
