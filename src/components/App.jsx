import useFetchImages from '../hooks/useFetchImages';
import useModal from '../hooks/useModal';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

export const App = () => {
	const { showModal, handleshowModal, handleCloseModal } = useModal();
	const {pics, currentPic, setCurrentPic, loading, handleInput, searchQuery,handleSearch, handleLoadMore, page, per_page} = useFetchImages();
  return (
    <div>
      <Searchbar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleInput={handleInput}
      ></Searchbar>
      <ImageGallery>
        {!!pics.data &&
          pics.data.length > 0 &&
          pics.data.map((pic, index) => {
            // console.log(pic.id)
            return (
              <ImageGalleryItem
                picture={pic}
                key={pic.id}
                handleshowModal={handleshowModal}
                setCurrentPic={setCurrentPic}
              ></ImageGalleryItem>
            );
          })}
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
      <Loader loading={loading}></Loader>
    </div>
  );
};
