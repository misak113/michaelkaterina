import React from 'react';
import classNames from 'classnames';
import './AgendaPage.css';
import agendaImage from './agenda.jpg';

const AgendaPage: React.FC = () => {
	const agendaImageElement = (className: string) => <img src={agendaImage} className={classNames("agendaImage", className)} alt={'Statek u Prahy'}/>;
	return <div className="agenda">
		<h2>Co na sebe?</h2>
		<p>
			Nebazírujeme na žádných barvách ani střizích. Vemte si zkrátka to, co vám sluší a v čem se cítíte dobře. Abyste si tak celý den užili v naprostém pohodlí ♥
		</p>
		<p>
			Kdybyste ale náhodou někdo chtěl opravdu ladit, většina dne se ponese v odstínech eukalyptové zelené a světlounké rúžové :)
		</p>

		<h2>Na místě</h2>
		<p>
			Velká část nápojů půjde navrub novomanželům a bude je možné vychutnávat až do noci. Něco ostřejšího už by ale barman připsal na váš účet.
			Dopředu proto hlásíme, že na místě nepůjde platit kartou a popřípadě bude třeba mít u sebe hotovost.
		</p>
		<p>
			Místo u stolu máme i pro ty nejmenší miminka. S kočárkem by to ovšem mohlo být v rámci koordinace trochu nekomfortní. Bylo by tedy lepší, kdyby děti mohly být u stolu ve vajíčku a kočárek by zůstal stranou. Pokud by to ale bez něj nešlo, dejte nám vědět a nějak to vymyslíme :)
		</p>

		<h2>Harmonogram svatebního dne</h2>
		
		{agendaImageElement('before')}
		<table className="table">
			<tbody>
				<tr>
					<th>12:00 - 12:30</th>
					<td>Příjezd hostů</td>
				</tr>
				<tr>
					<th>13:00</th>
					<td>Svatební obřad</td>
				</tr>
				<tr>
					<th>13:45</th>
					<td>Společné focení</td>
				</tr>
				<tr>
					<th>14:15</th>
					<td>Přípitky a slavnostní oběd</td>
				</tr>
				<tr>
					<th>15:00</th>
					<td>Odpolední program a odpočinek</td>
				</tr>
				<tr>
					<th>16:30</th>
					<td>Krájení dortu</td>
				</tr>
				<tr>
					<th>16:45</th>
					<td>Novomanželské focení v přírodě</td>
				</tr>
				<tr>
					<th>18:45</th>
					<td>Házení kytice</td>
				</tr>
				<tr>
					<th>20:00</th>
					<td>První novomanželský tanec</td>
				</tr>
				<tr>
					<th>21:00</th>
					<td>Oficiální zahájení párty</td>
				</tr>
			</tbody>
		</table>
		{agendaImageElement('after')}
	</div>;
};
export default AgendaPage;
