import axios from "axios";

let pageNumber = 1;

const pictureFind = async (pictureName) => {
  axios.defaults.baseURL = "https://pixabay.com/api/";
  const myKey = "21807321-d1b9b9077da7f78b4c19cddb8";
  try {
    const request = await axios.get(
      `?key=${myKey}&q=${pictureName}&page=${pageNumber}&per_page=12&image_type=photo`
    );
    pageNumber += 1;
    return request;
  } catch (error) {
    return error;
  }
};

export default pictureFind;
