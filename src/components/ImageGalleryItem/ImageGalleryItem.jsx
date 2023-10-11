import React from 'react';
import styles from "Styles.module.css";

const ImageGalleryItem = ({ picture, key, handleshowModal, setCurrentPic }) => {
	console.log(key)
	const handleModalOpen = (picture) => {
		setCurrentPic(picture);
		handleshowModal();
	};

	return (
		<div>
			<li className={styles.ImageGalleryItem} key={picture.id} onClick={() => {handleModalOpen(picture)}}>
				<img src={picture.webformatURL} className={styles['ImageGalleryItem-image']} alt={picture.tags}/>
			</li>			
		</div>
	);
}

export default ImageGalleryItem;
