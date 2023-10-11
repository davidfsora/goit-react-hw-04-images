import React from 'react';
import styles from "Styles.module.css";

export default function Button({ handleLoadMore, totalHits, perPage, page, loading }) {
	return (
		<div style={{
			display: 'flex',
			justifyContent: 'center',
		}}>
			<button className={`${styles.Button} ${(loading || Math.floor(totalHits/perPage)<page) && styles['is-hidden']}`}
				onClick={handleLoadMore}>Load More
			</button>
		</div>
	);
}