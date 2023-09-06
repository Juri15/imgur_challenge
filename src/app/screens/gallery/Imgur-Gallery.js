import React from "react";
import GalleryFilters from "./gallery-filters/Gallery-Filters";
import GalleryList from "./gallery-list/Gallery-List";

const ImgurGallery = () => {
	return (
		<section className="ig-wrapper">
			<GalleryFilters />
			<GalleryList />
		</section>
	);
};
export default ImgurGallery;
