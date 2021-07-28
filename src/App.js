import "./App.css";

import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Serchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery.jsx";
import ImageGalleryItem from "./components/ImageGalleryItem.jsx";
// import Modal from './components/Modal.jsx'
import Button from "./components/Button.jsx";
import Loader from "react-loader-spinner";
import PixabayServiseApi from "./services/apiService";

const PixabayService = new PixabayServiseApi();

export default class App extends Component {
  state = {
    pictureName: null,
    pictures: [],
    reqStatus: "idle",
    //idle, pending, resolved, rejected
  };

  componentDidUpdate(_, prevState) {
    const { pictureName } = this.state;
    if (pictureName === "") {
      toast.error("Please, enter the key word!");
    } else {
      if (prevState.pictureName !== pictureName) {
        this.setState({ pictures: [], reqStatus: "pending" });
        PixabayService.resetPage();
        PixabayService.pictureFind(pictureName)
          .then((response) => {
            if (response.hits.length === 0) {
              this.setState({ reqStatus: "rejected" });
              toast.error("We tried, but can't find any");
            } else {
              this.setState({ pictures: response.hits, reqStatus: "resolved" });
            }
          })
          .catch((error) => alert(error.message));
      }
    }
  }

  handleFormSubmit = (pictureName) => {
    this.setState({ pictureName: pictureName.trim() });
  };

  handleLoadMore = () => {
    this.setState({ reqStatus: "pending" });
    PixabayService.incrementPage();
    PixabayService.pictureFind(this.state.pictureName)
      .then((response) => {
        const newImages = response.hits;
        this.setState({
          pictures: [...this.state.pictures, ...newImages],
        });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => alert(error.message));
    this.setState({ reqStatus: "resolved" });
  };

  render() {
    const { pictures, reqStatus } = this.state;
    const showGallery = pictures.length > 1;
    const showLoadMoreBtn = pictures.length >= 12;
    return (
      <div>
        <Serchbar onSubmit={this.handleFormSubmit} />

        {showGallery && (
          <ImageGallery>
            <ImageGalleryItem pictures={pictures} />
          </ImageGallery>
        )}
        {reqStatus === "pending" && (
          <div className="loaderContainer">
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000}
            />
          </div>
        )}
        {showLoadMoreBtn && <Button onClick={this.handleLoadMore} />}

        {/* <Modal largeImage={largeImage} /> */}

        <Toaster position="top-right" />
      </div>
    );
  }
}
