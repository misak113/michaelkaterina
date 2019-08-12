import React, { useState } from 'react';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';
import HomepagePage from './Pages/HomepagePage';
import LocationPage from './Pages/LocationPage';
import GiftsPage from './Pages/GiftsPage';
import AccomodationPage from './Pages/AccomodationPage';
import AgendaPage from './Pages/AgendaPage';
import Anchor from './Anchor';
import CartPage from './Pages/CartPage';
import { CartProvider, CartContext, ICartValue } from './Context/CartContext';
import CartButton from './Component/CartButton';
import ContactPage from './Pages/ContactPage';
import { DatabaseProvider } from './Context/DatabaseContext';
import Product from './Component/Product';
const facebookLogo = require('./facebook-logo.png');

const cartItemRef = React.createRef<HTMLAnchorElement>();

const scrollTopAfterNavigate = 400;

const pages = [
	{
		name: 'O svatbě',
		path: '/',
		render: () => <HomepagePage/>,
		onClick: () => window.scroll(0, scrollTopAfterNavigate),
	},
	{
		name: 'Místo',
		path: '/misto',
		render: () => <LocationPage/>,
		showProductOnSide: true,
		onClick: () => window.scroll(0, scrollTopAfterNavigate),
	},
	{
		name: 'Dary',
		path: '/dary',
		disabled: false,
		render: () => <GiftsPage/>,
		showProductOnSide: true,
		onClick: () => window.scroll(0, scrollTopAfterNavigate),
	},
	{
		name: 'Ubytování',
		path: '/ubytovani',
		render: () => <AccomodationPage/>,
		disabled: false,
		showProductOnSide: true,
		onClick: () => window.scroll(0, scrollTopAfterNavigate),
	},
	{
		name: 'Harmonogram',
		path: '/harmonogram',
		render: () => <AgendaPage/>,
		disabled: false,
		showProductOnSide: true,
		onClick: () => window.scroll(0, scrollTopAfterNavigate),
	},
	{
		name: 'Kontakt',
		path: '/kontakt',
		render: () => <ContactPage/>,
		hiddenInMenu: false,
		showProductOnSide: true,
		onClick: () => window.scroll(0, scrollTopAfterNavigate),
	},
	{
		name: <img src={facebookLogo} width="20" height="20" />,
		path: 'https://www.facebook.com/events/362213487833947/',
	},
	{
		name: <CartButton buttonRef={cartItemRef} />,
		path: '/kosik',
		render: () => <CartPage/>,
	},
];

const App: React.FC = () => {
	const [currentPath, changePath] = useState(window.location.pathname);
	window.onpopstate = window.history.onpushstate = () => setTimeout(() => changePath(window.location.pathname));
	const currentPage = pages.find((page) => page.path === currentPath);
	return (
		<DatabaseProvider>
			<CartProvider toRef={cartItemRef}>
				<div className="App">
					<header className="nameHead">
						Katerina &amp; Michael
					</header>
					<header className="App-header">
						<ul className="nav justify-content-center">
							{pages.filter((page) => !page.hiddenInMenu).map((page) => (
								<li key={page.path} className={classNames("nav-item", {
									'active': page.path === currentPath,
								})}>
									<Anchor
										className={classNames("nav-link", {
											'disabled': page.disabled || false,
										})}
										onClick={page.onClick}
										href={page.path}
										target={page.path.indexOf('https://www.facebook.com') === 0 ? '_blank' : undefined}
									>
										{page.name}
										{page.path === currentPath ? <span className="sr-only">(current)</span> : null}
									</Anchor>
								</li>
							))}
						</ul>
						<hr/>
					</header>
					<CartContext.Consumer>
						{(value: ICartValue) => (
							value.items.length === 0 && currentPage && currentPage.showProductOnSide && (
								<Product className="sideProduct"/>
							)
						)}
					</CartContext.Consumer>
					<section className="container content">
						{currentPage ? (
							currentPage.render && currentPage.render()
						) : (
							<>
								<h1>Stránka nenalezena</h1>
								<p>Tato stránka nebyla nalezena. Prosím pokračujte na stránce <Anchor href="/">O svatbě</Anchor></p>
							</>
						)}
						<div className="clearfix"/>
					</section>
					<footer className="App-footer"></footer>
				</div>
			</CartProvider>
		</DatabaseProvider>
	);
}

export default App;
