import React from 'react';

declare global {
	interface History {
		onpushstate?: ({ state }: { state: any }) => void;
	}
}

(function(history){
	var pushState = history.pushState;
	history.pushState = function (state: any, title: string, url?: string | null) {
		if (typeof history.onpushstate == "function") {
			history.onpushstate({state: state});
		}
		return pushState.apply(history, [state, title, url]);
	};
})(window.history);

const Anchor = (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
	<a {...props} onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		if (props.href && props.href.indexOf('https://www.facebook.com') !== 0) {
			window.history.pushState(undefined, '', props.href);
		}
	}}>{props.children}</a>
);
export default Anchor;
