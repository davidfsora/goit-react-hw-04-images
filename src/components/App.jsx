import { useState } from "react";
import useModal from "../hooks/useModal";
import useFetchImages from "../hooks/useFetchImages";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";

const PIXABAY_KEY = '38599637-94ee16ac1abf8bf26f0455f90';
const per_page = 12;
let page = 1;

export const App = () => {

	const [pics, setPics] = useState({
		data: [],
		err: null,
		totalHits: 0,
	});

	const [searchQuery, setSearchQuery] = useState('');
	const { showModal, handleshowModal, handleCloseModal } = useModal();
	const [currentPic, setCurrentPic] = useState({});
	const [loading, setLoading] = useState(false);

	const handleInput = (evt) => setSearchQuery(evt.target.value);

	const handleSearch = (evt) => {
		evt.preventDefault();
		page = 1;
		setPics((prev) => ({ ...prev, data: [] }));
		HandleFetchImages();
	}

	
	function HandleFetchImages() {
		const URL = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${PIXABAY_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`;
		const { data, error } = useFetchImages({ url: URL, method: "GET" });
		setLoading(true);
		
		if (error) {
			alert(error);
		} else {
			setPics((prev) => ({
				...prev,
				data: [...prev.data, ...data.hits],
				totalHits: data.totalHits,
			}));
		}
		setLoading(false);
	};

	const handleLoadMore = () => {
		page = page + 1;
		HandleFetchImages();
	}

	console.log('pics.data', pics.data);
	return (
		<div>
			<Searchbar
				searchQuery={searchQuery}
				handleSearch={handleSearch}
				handleInput={handleInput}
			></Searchbar>
			<ImageGallery>
				{
					!!pics.data && pics.data.length > 0 && pics.data.map((pic, index) => {
						// console.log(pic.id)
						return (
							<ImageGalleryItem
								picture={pic}
								key={pic.id}
								handleshowModal={handleshowModal}
								setCurrentPic={setCurrentPic}
							></ImageGalleryItem>
						);
					})
				}
			</ImageGallery>
			<Modal
				showModal={showModal}
				handleCloseModal={handleCloseModal}
				currentPic={currentPic}
			></Modal>
			<Button
				totalHits={pics.totalHits}
				perPage={per_page}
				page={page}
				handleLoadMore={handleLoadMore}
				loading={loading}
			></Button>
			<Loader
				loading={loading}
			></Loader>
		</div>
	);
};
