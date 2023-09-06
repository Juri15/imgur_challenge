import React, { useState, useRef, useEffect } from "react";
import "./Lazy-Load-Image.scss";

const LazyLoadImage = ({ src, alt }) => {
	const [showImage, setShowImage] = useState(false);
	const placeHolderRef = useRef(null);

	useEffect(() => {
		const io = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				setShowImage(true);
				observer.disconnect();
			});
		});

		io.observe(placeHolderRef.current);

		return () => io && io.root !== undefined && io.disconnect();
	}, [setShowImage]);

	return showImage ? (
		<img src={src} alt={alt} />
	) : (
		<div
			data-testid="ig-placeholder"
			className="ig-placeholder"
			ref={placeHolderRef}
		/>
	);
};

export default LazyLoadImage;
