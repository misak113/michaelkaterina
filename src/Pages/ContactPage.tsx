import React, { useState } from 'react';
import './ContactPage.css';
import contactImage from './contact.jpg';
const facebookLogo = require('../facebook-logo.png');

const ContactPage: React.FC = () => {
	const [showAddress, setShowAddress] = useState(false);

	return <div className="contact">
		<img src={contactImage} className="contactImage" alt="Michael a Kateřina"/>
		<h2>Naše kontakty</h2>
		<p>
			Pro případ, že budete něco potřebovat, neváhejte nám dát vědět.
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
					<td colSpan={2} style={{ textAlign: 'center' }}>
						<a
							target="_blank"
							className="nav-link"
							href="https://www.facebook.com/events/362213487833947/"
						>
							<img src={facebookLogo} width="20" height="20" /> Facebook Událost
						</a>
					</td>
				</tr>
				<tr>
					<th>
						Adresa
					</th>
					<td>
						{showAddress
							? <>Ratibořská 752/30, <br/> Praha 8 - Bohince, <br/> 181 00</>
							: <button className="btn btn-info" onClick={(event) => {
								event.preventDefault();
								setShowAddress(true);
							}}>Chcete nám něco poslat?</button>
						}
					</td>
				</tr>
			</tbody>
		</table>
	</div>;
};
export default ContactPage;
