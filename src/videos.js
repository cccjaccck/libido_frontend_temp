import axios from "axios";

const key = "AIzaSyD0JNbYifMidDLg2um6dLfSt5cHmUUJ0ok";

export const getYoutubeVideos = async (pageToken, maxResults = 10) => {
  try {
    const res = await axios({
      method: "get",
      url: "https://www.googleapis.com/youtube/v3/videos?",
      params: {
        // part: "snippet,statistics,contentDetails",
        part: "snippet",
        regionCode: "kr",
        chart: "mostPopular",
        maxResults: maxResults,
        key,
        pageToken,
      },
    });
    const data = {
      nextPageToken: res.data.nextPageToken,
      videos: res.data.items.map(({ id, snippet }) => ({
        id,
        url: `https://www.youtube.com/embed/${id}`,
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        thumbnail: snippet.thumbnails.medium.url,
        publishedAt: snippet.publishedAt,
        type: "YOUTUBE",
      })),
    };
    return data;
  } catch (e) {
    console.log("getYoutubeApi Error: ", e);
  }
};

export const getYoutubeSearch = async (term, pageToken, maxResults = 10) => {
  try {
    const res = await axios({
      method: "get",
      url: "https://www.googleapis.com/youtube/v3/search?",
      params: {
        part: "snippet",
        type: "video",
        maxResults,
        videoCategoryId: 20,
        key,
        pageToken,
        q: term,
      },
    });
    const data = {
      nextPageToken: res.data.nextPageToken,
      videos: res.data.items.map(({ id, snippet }) => ({
        id: id.videoId,
        url: `https://www.youtube.com/embed/${id.videoId}`,
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        thumbnail: snippet.thumbnails.medium.url,
        publishedAt: snippet.publishedAt,
        type: "YOUTUBE",
      })),
    };
    return data;
  } catch (e) {
    console.log("getRelatedVideo Error: ", e.response);
  }
};
