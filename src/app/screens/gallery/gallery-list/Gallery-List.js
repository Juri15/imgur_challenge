import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { proxySelector, fetchApi } from "../../../slices/proxy/proxy";
import {
	gallerySelector,
	galleryNextPage,
} from "../../../slices/gallery/gallery";
import { Container } from "@material-ui/core";
import "./Gallery-List.scss";
import Loader from "../../../../assets/images/loader.gif";
import { AppServices } from "../../../../app.config";
import GalleryModal from "../gallery-modal/Gallery-Modal";
import LazyLoadImage from "../../../components/lazy-load-image/Lazy-Load-Image";

const GalleryList = () => {
	const dispatch = useDispatch();
	const { loading, finished, response, errors } = useSelector(proxySelector);
	const { galleryParams } = useSelector(gallerySelector);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		dispatch(fetchApi(AppServices.GALLERY.FETCH.URL, galleryParams));
	}, [dispatch, galleryParams]);

	const observer = useRef();
	const lastItemFromGalleryRef = useCallback(
		(node) => {
			if (loading || finished) return;
			if (observer.current && observer.current.root !== undefined) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) {
					dispatch(galleryNextPage());
				}
			});
			if (node) observer.current.observe(node);
		},
		[dispatch, loading, finished]
	);

	const setImage = (item) => {
		const name = !item["cover"] ? item["id"] : item["cover"];
		const thumbnail = `//i.imgur.com/${name}_d.jpg?maxwidth=300&shape=thumb`;
		const payload = {
			src: thumbnail,
			alt: name,
		};
		return <LazyLoadImage src={payload.src} alt={payload.alt} />;
	};

	const displayGallery = () => {
		if (response && response["data"]) {
			return (
				<div className="ig-grid ig-items">
					{response["data"].map((item, index) => (
						<button
							type="button"
							className="ig-item-button"
							key={`${item.id}-${index}`}
							ref={
								response["data"].length - 15 === index
									? lastItemFromGalleryRef
									: null
							}
							onClick={() => setOpenModal(item)}
							data-testid={`ig-item-button-${index}`}
						>
							<div className="ig-item">
								{setImage(item)}
								{item.title && (
									<h4 className="ig-ellipses">
										{item.title}
									</h4>
								)}
							</div>
						</button>
					))}
				</div>
			);
		}

		return (
			errors && (
				<div className="ig-error">
					{!errors["status"] && <h3>Unknown Error</h3>}
					{errors["status"] && <h3>{errors["status"]}</h3>}
					{errors["data"] && errors["data"]["error"] && (
						<p>{errors["data"]["error"]}</p>
					)}
				</div>
			)
		);
	};

	return (
		<Container maxWidth="md" className="ig-gallery-list">
			<div className="ig-content">
				{displayGallery()}
				{!finished && (
					<div
						className={`ig-load-more ${
							response && response["data"]
								? "ig-top-margin"
								: null
						}`}
					>
						<img
							src={Loader}
							alt="load more"
							referrerpolicy="no-referrer"
						/>
					</div>
				)}
			</div>
			{openModal && (
				<GalleryModal
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
			)}
		</Container>
	);
};

export default GalleryList;
