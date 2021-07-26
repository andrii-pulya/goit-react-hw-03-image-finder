import axios from "axios";

export const pictureFind = async (pictureName) => {
  let pageNumber = 1;
  axios.defaults.baseURL = "https://pixabay.com/api/";
  const myKey = "21807321-d1b9b9077da7f78b4c19cddb8";
  try {
    const request = await axios.get(
      `?key=${myKey}&q=${pictureName}&page=${pageNumber}&per_page=12&image_type=photo&orientation=horizontal`
    );
    pageNumber += 1;
    return request.data;
  } catch (error) {
    return error;
  }
};
