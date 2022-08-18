
const config = {
   YOUTUBE:'YOUTUBE',
   VIMEO:'VIMEO',
   FAVOURITE:'favourite',
   filterFromAToZ:'filterFromAToZ',
   filterFromZToA:'filterFromZToA',
   filterFromOldToNew:'filterFromOldToNew',
   filterFromNewToOld:'filterFromNewToOld',
   alertAllDelete:'Do you want to delete all videos?',
   alertSingleDelete:'Do you want to delete this video?',
   toastSuccses:"Demo loaded correctly",
   toastWarning:'You have already uploaded the demo',
   toastInputIncorect:'Incorrect input!',
   YouTubeMovieUrl:'https://www.youtube.com/watch?v=',
   VimeoMovieUrl:'https://www.vimeo.com/',
   VimeoFetchUrl: 'https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/',
   YouTubFetchUrl:'https://www.googleapis.com/youtube/v3/videos?id=',
   YouTubeSnipetPartUrl:'&part=snippet,statistics&fields=items(id,snippet(title,thumbnails(default(url))),statistics(viewCount,likeCount))',

}

export default config;