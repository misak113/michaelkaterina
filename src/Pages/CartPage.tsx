import React, { ReactNode, useState, useEffect } from 'react';
import _ from 'lodash';
import { withCart, ICartValue } from '../Context/CartContext';
import productImage from '../Component/product.jpg';
import './CartPage.css'
import Product from '../Component/Product';
import { withDatabase, IDatabaseValue } from '../Context/DatabaseContext';

type IProps = { children?: ReactNode } & ICartValue & IDatabaseValue;

const ORDER_EMAIL = 'ORDER_EMAIL';
const ORDER_NAME = 'ORDER_NAME';
const ORDER_NOTE = 'ORDER_NOTE';
const ORDER_FOOD = 'ORDER_FOOD';
const ORDER_PHONE = 'ORDER_PHONE';
const ORDER_CONFIRMATION = 'ORDER_CONFIRMATION';
const ORDER_PLUS_ONE = 'ORDER_PLUS_ONE';
const ORDER_PLUS_ONE_NAME = 'ORDER_PLUS_ONE_NAME';
const ORDER_CHILDREN = 'ORDER_CHILDREN';
const ORDER_CHILDREN_NAMES = 'ORDER_CHILDREN_NAMES';
export const ORDER_SENT = 'ORDER_SENT';

const CartPage: React.FC<IProps> = (props: IProps) => {

	const [email, setEmail] = useState(localStorage.getItem(ORDER_EMAIL) || undefined);
	const [name, setName] = useState(localStorage.getItem(ORDER_NAME) || undefined);
	const [note, setNote] = useState(localStorage.getItem(ORDER_NOTE) || undefined);
	const [food, setFood] = useState(localStorage.getItem(ORDER_FOOD) || undefined);
	const [phone, setPhone] = useState(localStorage.getItem(ORDER_PHONE) || undefined);
	const [confirmation, setConfirmation] = useState<boolean | undefined>(!!localStorage.getItem(ORDER_CONFIRMATION) || undefined);
	const [plusOne, setPlusOne] = useState(!!localStorage.getItem(ORDER_PLUS_ONE) || false);
	const [plusOneName, setPlusOneName] = useState(localStorage.getItem(ORDER_PLUS_ONE_NAME) || undefined);
	const [children, setChildren] = useState(localStorage.getItem(ORDER_CHILDREN) ? parseInt(localStorage.getItem(ORDER_CHILDREN)!) : 0);
	const [childrenNames, setChildrenNames] = useState<string[]>(localStorage.getItem(ORDER_CHILDREN_NAMES) ? JSON.parse(localStorage.getItem(ORDER_CHILDREN_NAMES)!) : []);
	const [orderSent, setOrderSent] = useState<boolean | undefined>(!!localStorage.getItem(ORDER_SENT) || undefined);

	const [submitingFailed, setSubmitingFailed] = useState(false);

	useEffect(
		() => {
			email && localStorage.setItem(ORDER_EMAIL, email);
			name && localStorage.setItem(ORDER_NAME, name);
			note && localStorage.setItem(ORDER_NOTE, note);
			food && localStorage.setItem(ORDER_FOOD, food);
			phone && localStorage.setItem(ORDER_PHONE, phone);
			if (confirmation !== undefined) {
				confirmation ? localStorage.setItem(ORDER_CONFIRMATION, confirmation.toString()) : localStorage.removeItem(ORDER_CONFIRMATION);
			}
			plusOne ? localStorage.setItem(ORDER_PLUS_ONE, plusOne.toString()) : localStorage.removeItem(ORDER_PLUS_ONE);
			plusOneName && localStorage.setItem(ORDER_PLUS_ONE_NAME, plusOneName);
			children && localStorage.setItem(ORDER_CHILDREN, children.toString());
			localStorage.setItem(ORDER_CHILDREN_NAMES, JSON.stringify(childrenNames));
		},
		[email, name, note, food, phone, confirmation, plusOne, plusOneName, children, childrenNames],
	);

	const createRegistrationDocument = () => ({
		name,
		email,
		note,
		food,
		phone,
		confirmation,
		plusOne,
		plusOneName,
		children,
		childrenNames,
	});

	const submitOrder = async (event: React.FormEvent<HTMLFormElement>) => {
		setSubmitingFailed(false);
		event.preventDefault();
		const documentId = Math.random().toString().substring(2);
		try {
			const document = createRegistrationDocument();
			await props.firebaseApp.database().ref(`registrations/${documentId}`).set(document);
			localStorage.setItem(ORDER_SENT, new Date().toISOString());
			setOrderSent(true);
		} catch (error) {
			console.error(error);
			setSubmitingFailed(true);
		}
	};

	const isValidEmail = (email: string) => {
		// eslint-disable-next-line
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};
	const isValid = () => {
		return (confirmation === false || (email && isValidEmail(email)))
			&& confirmation !== undefined
			&& name;
	};

	if (orderSent) {
		return <div className="cartPage">
			<h2>Objednávka úspěšně odeslána</h2>
			<p>
				Děkujeme za Vaši registraci na svatbu.<br/>
				{
					confirmation
						? 'Moc se na vás budeme těšit. Pokud budou k dispozici jakekoliv další informace, určitě se vám ihned ozveme.'
						: 'Je nám líto, že se nebudete moct zůčasnit, ale určitě si nejdeme jinou chvíli, kdy to spolu oslavíme.'
				}
				<br/><br/>
				<small>
					Pokud jste chcete provést jakékoliv změny, můžete tak učinit <a href="#" onClick={(event) => {
						event.preventDefault();
						setOrderSent(false);
					}}>klinutím zde</a><br/>
					a nebo nám dejte vědět na emailovou adresu <a href="mailto: zabka.michael@gmail.com">zabka.michael@gmail.com</a>
				</small>
			</p>
		</div>;
	}

	return <div className="cartPage">
		<h2>Nákupní košík</h2>

		{props.items.map((item) => (
			<ul key={item.id} className="list-unstyled">
				<li className="media">
					<img src={productImage} className="mr-3" alt={item.name}/>
					<div>
						<i>Cena:</i>
						<h3 className="price">0,-&nbsp;Kč</h3>
					</div>
					<div className="media-body">
						<h5 className="mt-0 mb-1">{item.name}</h5>
						{item.description}
					</div>
					<div>
						<a href="#" className="button close" onClick={(event) => {
							event.preventDefault();
							props.removeItem(item);
						}}>
							<i className="fa fa-times"/>
						</a>
					</div>
				</li>
			</ul>
		))}

		<hr/>
		{props.items.length > 0 ? <>
			<h2>Informace o vás</h2>
			<form onSubmit={submitOrder}>
				<div className="form-group">
					<label htmlFor="name"><span className="required">*</span> Jméno a Příjmení</label>
					<input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" id="name" placeholder="Váše jméno a příjmení"/>
				</div>
				<div className="custom-control custom-radio custom-control-inline">
					<input checked={confirmation === true} value={'1'} onChange={(event) => setConfirmation(event.target.checked as any)} type="radio" className="form-check-input" name="confirmation" id="confirmation-yes"/>
					<label className="form-check-label" htmlFor="confirmation-yes">Velmi rád se zůčastním</label>
				</div>
				<div className="custom-control custom-radio custom-control-inline">
					<input checked={confirmation === false} value={'0'} onChange={(event) => setConfirmation(!event.target.checked as any)} type="radio" className="form-check-input" name="confirmation" id="confirmation-no"/>
					<label className="form-check-label" htmlFor="confirmation-no">Bohužel nemohu dorazit</label>
				</div>
				<div className="form-group">
					<label htmlFor="email"><span className="required">*</span> Email</label>
					<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" id="email" placeholder="Váš email"/>
					<small id="emailHelp" className="form-text text-muted">Použijeme ho, abychom Vám mohli oznámit neočekáváné novinky</small>
				</div>
				<div className="form-group">
					<label htmlFor="phone">Telefon</label>
					<input value={phone} onChange={(event) => setPhone(event.target.value)} type="phone" className="form-control" id="phone" placeholder="Vaše telefonní číslo"/>
					<small id="phoneHelp" className="form-text text-muted">Nepotřebujeme ho nutně, ale někdy se může hodit</small>
				</div>
				<div className="form-group">
					<label htmlFor="plusOneName">Doprovod</label>
					<br/>
					<input checked={plusOne} onChange={(event) => setPlusOne(event.target.checked)} type="checkbox" className="form-check-input" id="plusOne"/>
					<label className="form-check-label" htmlFor="plusOne">Budete mít doprovod?</label>
					{plusOne ? <>
						<input value={plusOneName} onChange={(event) => setPlusOneName(event.target.value)} type="text" className="form-control" id="plusOneName" placeholder="Napište nám prosím jeho jméno"/>
					</> : null}
				</div>
				<div className="form-group">
					<label htmlFor="childrenNames">Děti</label>
					<small id="childrenHelp" className="form-text text-muted">Máte děti? Ty malé i velké moc rádi uvidíme. Napište nám, kolik jich bude a připište i jejich jména.</small>
					<br/>
					<label className="form-check-label" htmlFor="children">Kolik dětí?</label>
					<input value={children} onChange={(event) => setChildren(parseInt(event.target.value))} type="number" className="form-control" id="children" placeholder="Počet dětí"/>
					{children > 0 ? _.range(0, children).map((i: number) => (
						<input key={i} value={childrenNames[i]} onChange={(event) => {
							const newChildrenNames = [...childrenNames];
							newChildrenNames[i] = event.target.value;
							setChildrenNames(newChildrenNames);
						}} type="text" className="form-control" id="plusOneName" placeholder={`Jméno dítěte ${i + 1}`}/>
					)) : null}
				</div>
				<div className="form-group">
					<label htmlFor="food">Stravování</label>
					<textarea value={food} onChange={(event) => setFood(event.target.value)} className="form-control" id="food" placeholder="Napište svá stravovací omezení"/>
					<small id="foodHelp" className="form-text text-muted">Týká se Vás nějaké stravovací omezení či speciální návyky? Dejte nám vědět. Se všemi si zajisté poradíme.</small>
				</div>
				<div className="form-group">
					<label htmlFor="note">Poznámka</label>
					<textarea value={note} onChange={(event) => setNote(event.target.value)} className="form-control" id="note" placeholder="Je ještě něco, na co bychom neměli zapomenout?"/>
				</div>

				<button disabled={!isValid()} type="submit" className="btn btn-primary">Odeslat objednávku</button>
				{!name && <div className="alert alert-warning" role="alert">Zadejte prosím své jméno</div>}
				{(confirmation === true && (!email || !isValidEmail(email))) && <div className="alert alert-warning" role="alert">Zadejte prosím správný email</div>}
				{confirmation === undefined && <div className="alert alert-warning" role="alert">Zaškrtněte prosím, zda se zůčastníš či ne</div>}
				{submitingFailed && <div className="alert alert-danger" role="alert">
					Při odesílání objednávky nastala chyba. Opakujte prosím odeslání.<br/>
					V případě opětovného selhání prosím zkopírujte a pošlete následující informace na email: <a href="mailto: zabka.michael@gmail.com">zabka.michael@gmail.com</a>
					<pre><code>
						{JSON.stringify(createRegistrationDocument(), undefined, 2)}
					</code></pre>
				</div>}
			</form>
		</> : <>
			<h3>Nemáte v košíku žádné produkty <i className="fa fa-meh"/></h3>
			<h5>Přidejte si do košíku:</h5>
			<Product/>
		</>}
	</div>;
};
export default withDatabase(withCart(CartPage));
