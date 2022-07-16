


export const getUrlYT = videoId => {


	const fetchUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${"AIzaSyAdhgdhqdLwgz6ow0-jVb-08MJbsUDgPlo"}
  &part=snippet,contentDetails,statistics,status`;

	const movieUrl = `https://www.youtube.com/watch?v=${videoId}`;

	return { fetchUrl, movieUrl };
};

export const formItemYT = (data, provider, movieUrl) => {
	// destructure response
	const {
		snippet: {
			localized: { title },
			thumbnails: {
				medium: { url: imageUrl },
			},
			publishedAt,
		},
		statistics: { likeCount: likes, viewCount: views },
	} = data.items[0];

	const newItem = {
		id: new Date().getTime(),
		title,
		provider,
		movieUrl,
		imageUrl,
		publishedAt,
		likes,
		views,
		favourite: false,
	};

	return console.log(newItem);
};
