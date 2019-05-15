import React, { useState } from 'react';
import classNames from 'classnames';
import './ContactPage.css';
import contactImage from './contact.jpg';
const facebookLogo = require('../facebook-logo.png');

const ContactPage: React.FC = () => {
	const [showAddress, setShowAddress] = useState(false);

	const contactImageElement = (className: string) => <img src={contactImage} className={classNames("contactImage", className)} alt="Michael a Kateřina"/>;

	return <div className="contact">
		{contactImageElement('before')}
		<h2>Naše kontakty</h2>
		<p>
			Budeme rádi, když se na nás obrátíte s jakýmkoli dotazem.
		</p>
		<table className="table">
			<tbody>
				<tr>
					<th rowSpan={2}>Michael Žabka</th>
					<td><i className="fa fa-phone"/> +420 723 922 276</td>
				</tr>
				<tr>
					<td><i className="fa fa-envelope-open"/> <a href="mailto: zabka.michael@gmail.com">zabka.michael@gmail.com</a></td>
				</tr>
				<tr>
					<th rowSpan={2}>Kateřina Švecová</th>
					<td><i className="fa fa-phone"/> +420 725 404 108</td>
				</tr>
				<tr>
					<td><i className="fa fa-envelope-open"/> <a href="mailto: svecova.svec@gmail.com">svecova.svec@gmail.com</a></td>
				</tr>
				<tr>
					<td/>
					<td>
						<a
							target="_blank"
							className="facebook nav-link"
							href="https://www.facebook.com/events/362213487833947/"
						>
							<img src={facebookLogo} width="20" height="20" /> Facebook událost
						</a>
					</td>
				</tr>
				<tr>
					<th>
						Adresa
					</th>
					<td>
						{showAddress
							? <>Ratibořská 752/30, <br/> Praha 8 - Bohnice, <br/> 181 00</>
							: <button className="btn btn-info" onClick={(event) => {
								event.preventDefault();
								setShowAddress(true);
							}}>Chcete nám něco poslat?</button>
						}
					</td>
				</tr>
			</tbody>
		</table>
		{contactImageElement('after')}
	</div>;
};
export default ContactPage;
