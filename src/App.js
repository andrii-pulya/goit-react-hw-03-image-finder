import "./App.css";

import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";

import Serchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery.jsx";
import ImageGalleryItem from "./components/ImageGalleryItem.jsx";
import Modal from "./components/Modal.jsx";
import Button from "./components/Button.jsx";
import { pictureFind } from "./services/apiService";

export default class App extends Component {
  state = {
    pictureName: null,
    pictures: [],
    reqStatus: "idle",
    //idle, pending, resolved, rejected
  };

  componentDidUpdate(_, prevState) {
    if (this.state.pictureName === "") {
      toast.error("Please, enter the key word!");
    } else {
      if (prevState.pictureName !== this.state.pictureName) {
        pictureFind(this.state.pictureName).then((response) => {
          if (response.hits.length === 0) {
            toast.error("We tried, but can't find any");
          } else {
            this.setState({ pictures: response.hits });
          }
        });
      }
    }
  }

  handleFormSubmit = (pictureName) => {
    this.setState({ pictureName: pictureName.trim() });
  };

  render() {
    const { pictures } = this.state;
    const showGallery = pictures.length > 1;
    const showLoadMoreBtn = pictures.length === 12;
    return (
      <div>
        <Serchbar onSubmit={this.handleFormSubmit} />
        {showGallery && (
          <ImageGallery>
            <ImageGalleryItem pictures={pictures} />
          </ImageGallery>
        )}
        {showLoadMoreBtn && <Button />}
        {/* <Modal /> */}

        <Toaster position="top-right" />
      </div>
    );
  }
}
