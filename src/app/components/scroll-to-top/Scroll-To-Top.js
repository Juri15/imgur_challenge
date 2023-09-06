import React, { useEffect, useState } from "react";
import "./Scroll-To-Top.scss";
import ScrollTop from "../../../assets/svg/scroll-top.svg";

const ScrollToTop = () => {
	const [scrollView, setScrollView] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const shouldShowScrollButton = window.scrollY > 250;
			if (shouldShowScrollButton !== scrollView) {
				setScrollView(shouldShowScrollButton);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scrollView, setScrollView]);

	const scrollToTop = () => {
		const scrollSpeed = 400;
		const scrollDuration = scrollSpeed / 25;
		const scrollStep = -window.scrollY / scrollDuration;

		const scrollInterval = setInterval(() => {
			if (window.scrollY !== 0) {
				window.scrollBy(0, scrollStep);
			} else {
				clearInterval(scrollInterval);
			}
		}, 15);
	};

	return (
		scrollView && (
			<div className="ig-scroll-to-top">
				<button type="button" onClick={scrollToTop}>
					<img src={ScrollTop} alt="Scroll to top" />
				</button>
			</div>
		)
	);
};

export default ScrollToTop;
