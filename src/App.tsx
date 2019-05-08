import React, { useState, useEffect } from 'react';
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

const pages = [
	{
		name: 'O svatbě',
		path: '/',
		render: () => <HomepagePage/>,
	},
	{
		name: 'Místo',
		path: '/misto',
		render: () => <LocationPage/>,
	},
	{
		name: 'Dary',
		path: '/dary',
		disabled: true,
		render: () => <GiftsPage/>,
	},
	{
		name: 'Ubytování',
		path: '/ubytovani',
		render: () => <AccomodationPage/>,
		disabled: true,
	},
	{
		name: 'Harmonogram',
		path: '/harmonogram',
		render: () => <AgendaPage/>,
		disabled: true,
	},
	{
		name: <i className="shoppingCart fa fa-shopping-cart"/>,
		path: '/kosik',
		render: () => <CartPage/>,
	},
];

const App: React.FC = () => {
	const [currentPath, changePath] = useState(window.location.pathname);
	useEffect(() => {
		window.history.onpushstate = () => setTimeout(() => changePath(window.location.pathname));
	});
	const currentPage = pages.find((page) => page.path === currentPath);
	return (
		<div className="App">
			<header className="App-header">
				<ul className="nav justify-content-center">
					{pages.map((page) => (
						<li key={page.path} className="nav-item">
							<Anchor
								className={classNames("nav-link", {
									'active': page.path === currentPath,
									'disabled': page.disabled || false,
								})}
								href={page.path}
							>
								{page.name}
								{page.path === currentPath ? <span className="sr-only">(current)</span> : null}
							</Anchor>
						</li>
					))}
				</ul>
			</header>
			<section className="container">
				{currentPage ? (
					currentPage.render()
				) : (
					<>
						<h1>Stránka nenalezena</h1>
						<p>Tato stránka nebyla nalezena. Prosím pokračujte na stránce <Anchor href="/">O svatbě</Anchor></p>
					</>
				)}
			</section>
		</div>
	);
}

export default App;
