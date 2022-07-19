import { formItemVimeo, getUrlVimeo } from './fetchVimeo';
import { formItemYT, getUrlYT } from './fetchYT';




const switchGetUrl = (provider, videoId) => {
	console.log(provider);
	switch (provider) {
		case "YOUTUBE":
			return getUrlYT(videoId);
		case "VIMEO":
			return getUrlVimeo(videoId);
		default:
			throw new Error(`Wrong provider: ${provider}`);
	}
};

const formItem = (data, provider, movieUrl) => {
	console.log(provider);
	switch (provider) {
		case "YOUTUBE":
			return formItemYT(data, provider, movieUrl);
		case "VIMEO":
			return formItemVimeo(data, provider, movieUrl);
		default:
			throw new Error(`Wrong: ${provider}`);
	}
};

const fetchItem = async (provider, videoId) => {
	const { fetchUrl, movieUrl } = switchGetUrl(provider, videoId);

	const response = await fetch(fetchUrl);
	const data = await response.json();
	console.log(data);
	return formItem(data, provider, movieUrl);
};

export default fetchItem;
