import React, { useState } from 'react';
import classNames from 'classnames';
import './ImagesPage.css';
import { Carousel } from 'react-responsive-carousel';
import jQuery from 'jquery';
const MdDownload = require('react-ionicons/lib/MdDownload');

const imageFilenames: string[] = require('./imagesFileNames.json');

const PAGE_COUNT = 20;
//export const IMAGE_BASE_URL = 'http://localhost:9080'; // dev version with "npx static-server ."
export const IMAGE_BASE_URL = 'https://signageostest.blob.core.windows.net/michaelkaterina';

const toppedFilenames = [
	'D75_9451.jpg',
	'D75_9441.jpg',
	'D75_9475.jpg',
	'D75_9479.jpg',
	'D75_9511.jpg',
	'HB2_1038.jpg',
	'HB2_1215.jpg',
	'HB2_1246.jpg',
	'HB2_1201.jpg',
	'HB2_1284.jpg',
	'HB2_1321.jpg',
	'HB2_1380.jpg',
	'HB2_1444.jpg',
	'HB2_1462.jpg',
	'HB2_1503.jpg',
	'HB2_1550.jpg',
	'HB2_1582.jpg',
	'HB2_1688.jpg',
	'HB2_1709.jpg',
	'HB2_1762.jpg',
	'HB2_1825.jpg',
	'HB2_1881.jpg',
	'HB2_1982.jpg',
	'HB2_2077.jpg',
	'HB2_2017.jpg',
	'HB2_2132.jpg',
	'HB2_2153.jpg',
	'HB2_2226.jpg',
	'HB2_2354.jpg',
	'HB2_2312.jpg',
	'HB2_2364.jpg',
	'HB2_2397.jpg',
	'HB2_2543.jpg',
	'HB2_2584.jpg',
	'HB2_2568.jpg',
	'HB2_2638.jpg',
	'HB2_2596.jpg',
	'HB2_2692.jpg',
	'HB2_2719.jpg',
	'HB2_2734.jpg',
	'HB2_2757.jpg',
	'HB2_2780.jpg',
	'HB2_2871.jpg',
	'HB2_2852.jpg',
	'HB2_2498.jpg',
	'HB2_2453.jpg',
	'HB2_2904.jpg',
	'HB2_2930.jpg',
	'HB2_2963.jpg',
	'HB2_3198.jpg',
	'HB2_3244.jpg',
	'HB2_3317.jpg',
	'HB2_3457.jpg',
	'HB2_3706.jpg',
	'HB2_3595.jpg',
	'HB2_3846.jpg',
	'HB2_3863.jpg',
	'HB2_3976.jpg',
	'HB2_3924.jpg',
	'HB2_4103.jpg',
	'HB2_4033.jpg',
	'HB2_4359.jpg',
	'HB2_4310.jpg',
	'HB2_4619.jpg',
	'HB2_4547.jpg',
	'HB2_4879.jpg',
	'HB2_4862.jpg',
	'HB2_4901.jpg',
	'HB2_4980.jpg',
	'HB2_5099.jpg',
	'HB2_5161.jpg',
	'HB2_5367.jpg',
	'HB2_4879.jpg',
];

function isTopped(filename: string): unknown {
	return toppedFilenames.indexOf(filename) !== -1;
}

const carouselRef = React.createRef<HTMLDivElement>();

const ImagesPage: React.FC = () => {
	const [startImageIndex, setStartImageIndex] = useState(0);
	const [currentItemRelativeIndex, setCurrentItemRelativeIndex] = useState(0);
	const preLoadedFilenames = imageFilenames.slice(startImageIndex, startImageIndex + PAGE_COUNT);
	const countTopped = preLoadedFilenames.filter((filename: string) => isTopped(filename)).length;
	const realPageCount = PAGE_COUNT - countTopped * 2 + 1;
	const loadedFilenames = preLoadedFilenames.slice(0, realPageCount);

	return <div className="images">
		<h2>Svatební fotografie</h2>
		<p>
			Projděte si zpětně všechno, co se na svatbě dělo ♥ Možná, že jste na něco zapomněli :)
		</p>
		<div ref={carouselRef}>
		<Carousel
			infiniteLoop={true}
			autoPlay={true}
			stopOnHover={true}
			axis={"horizontal"}
			showThumbs={false}
			showStatus={false}
			className={classNames("carouselWrapper")}
			selectedItem={currentItemRelativeIndex}
		>
			{loadedFilenames.map((filename: string) => {
				const fullImageUri = `${IMAGE_BASE_URL}/photos/${filename}`;
				const imageUri = `${IMAGE_BASE_URL}/thumbnails/1200x800/${filename}`;
				return (
					<div key={filename} className="imageCarousel">
						<a href={fullImageUri} className={"download"} target='_blank' download={filename} onClick={async (event) => {
							event.preventDefault();
							const response = await fetch(fullImageUri);
							const blob = await response.blob();
							const a = document.createElement("a");
							document.body.appendChild(a);
							a.style.display = "none";
							const blobUrl = window.URL.createObjectURL(blob);
							a.href = blobUrl;
							a.download = filename;
							a.click();
						    window.URL.revokeObjectURL(blobUrl);
						}}>
							<MdDownload fontSize={'60px'} color="white" title="Stáhnout" />
						</a>
						<img src={imageUri}/>
					</div>
				);
			})}
		</Carousel>
		</div>
		<div className="imagesWrapper">
			{loadedFilenames.map((filename: string, index: number) => {
				const resolution = isTopped(filename) ? '400x266' : '200x133';
				const largeImageUri = `${IMAGE_BASE_URL}/thumbnails/1200x800/${filename}`;
				const imageUri = `${IMAGE_BASE_URL}/thumbnails/${resolution}/${filename}`;
				return (
					<a
						href={largeImageUri}
						target="_blank"
						key={filename}
						className={classNames("imagePreview", { 'topped': isTopped(filename) })}
						onClick={(event) => {
							if (window.document.body.clientWidth >= 500) {
								event.preventDefault();
								setCurrentItemRelativeIndex(index);
								const scrollTop = carouselRef.current!.getBoundingClientRect().top + window.scrollY;
								jQuery('html, body').animate({ scrollTop }, 300);
							}
						}}
					>
						<img src={imageUri} />
					</a>
				);
			})}
		</div>
		<div className={'controls'}>
			{startImageIndex > 0 && <button className={'btn btn-dark'} onClick={() => setStartImageIndex(
				Math.max(0, startImageIndex - PAGE_COUNT)
			)}>
				Načíst předchozí fotky
			</button>}
			{startImageIndex < imageFilenames.length - PAGE_COUNT && <button className={'btn btn-dark'} onClick={() => setStartImageIndex(
				Math.min(imageFilenames.length - PAGE_COUNT, startImageIndex + realPageCount)
			)}>
				Načíst další fotky
			</button>}
		</div>
	</div>;
};
export default ImagesPage;
