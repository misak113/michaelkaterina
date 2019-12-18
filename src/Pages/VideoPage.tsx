import React, { useState } from 'react';
import classNames from 'classnames';
import './VideoPage.css';

const videoRef = React.createRef<HTMLVideoElement>();

const VideoPage: React.FC = () => {
	const [videoMuted, setVideoMuted] = useState(true); 
	return <div className="video">
		<h2>Svatební video</h2>
		<p>
			Užijte si krátký sestřih našich zážitků ze svatebního dne ♥
		</p>
		<div className={'controls'}>
			<button className={'btn btn-dark'} onClick={() => setVideoMuted(!videoMuted)}>
				{videoMuted ? 'Zapnout zvuk' : 'Ztišit'}
			</button>
		</div>
		<div className="videoWrapper">
			<video
				ref={videoRef}
				src="https://signageostest.blob.core.windows.net/michaelkaterina/videos/SvatbaSkvorec.mp4"
				autoPlay={true}
				controls={true}
				muted={videoMuted}
			/>
		</div>
	</div>;
};
export default VideoPage;
