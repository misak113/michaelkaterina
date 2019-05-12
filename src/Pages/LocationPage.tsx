import React from 'react';

const LocationPage: React.FC = () => {
	return <div>
		<h2>Místo konání</h2>
		<p>
			Naše svatba se bude odehrávat na krásném místě ve Škvorci.<br/>
			Více informací naleznete na stránkách <a target="_blank" href="http://www.statekuprahy.cz">Statku u Prahy</a>.
		</p>
		<div className="mapouter" style={{
			position: "relative",
			textAlign: "right",
			height: "500px",
			width: "600px",
		}}>
			<div className="gmap_canvas" style={{
				overflow: "hidden",
				background: "none!important",
				height: "500px",
				width: "600px"
			}}>
				<iframe
					width={600}
					height={500}
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
	</div>;
};
export default LocationPage;
