
export const getUrlVimeo = videoId => {


	const fetchUrl = `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${videoId}`;

	const movieUrl = `https://www.vimeo.com/${videoId}`;
	return { fetchUrl, movieUrl };
};

export const formItemVimeo = (data, provider, movieUrl) => {
	// destructure response
	const { title, thumbnail_url: imageUrl, upload_date: publishedAt } = data;
	const likes = undefined;
	const views = undefined;

	// form a new item from response
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
