import React from 'react';
import firebase from 'firebase';

interface IProps {

}

export interface IDatabaseValue {
	firebaseApp: firebase.app.App;
}

export const DatabaseContext = React.createContext<IDatabaseValue>({} as IDatabaseValue);

export class DatabaseProvider extends React.Component<IProps> {

	private firebaseApp: firebase.app.App;

	constructor(props: IProps) {
		super(props);
		this.firebaseApp = firebase.initializeApp({
			apiKey: "AIzaSyAzBVOpciZoGV6f762jS5Re-IORAySMSA4",
			authDomain: "michaelkaterina-5e505.firebaseapp.com",
			databaseURL: "https://michaelkaterina-5e505.firebaseio.com",
			projectId: "michaelkaterina-5e505",
			storageBucket: "michaelkaterina-5e505.appspot.com",
			messagingSenderId: "706648470676",
			appId: "1:706648470676:web:3483f17f5242355e"
		});
	}

	public render() {
		return (
			<DatabaseContext.Provider value={{ firebaseApp: this.firebaseApp }}>
				{this.props.children}
			</DatabaseContext.Provider>
		);
	}
}

export const withDatabase = <TOwnProps extends {}>(WrappedComponent: React.ComponentType<TOwnProps & IDatabaseValue>) => (
	(props: TOwnProps) => (
		<DatabaseContext.Consumer>
			{(value: IDatabaseValue) => <WrappedComponent {...props} {...value} />}
		</DatabaseContext.Consumer>
	)
);
