import "./App.css";

import React, { Component } from "react";

import Serchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery.jsx";
import ImageGalleryItem from "./components/ImageGalleryItem.jsx";
import Modal from "./components/Modal.jsx";
import pictureFind from "./services/apiService";

export default class App extends Component {
  state = {
    pictureName: null,
    pictures: [],
    reqStatus: "idle",
    //idle, pending, resolved, rejected
  };

  componentDidUpdate(_, prevState) {
    if (prevState.pictureName !== this.state.pictureName) {
      pictureFind(this.state.pictureName).then((response) =>
        this.setState({ pictures: response.data.hits })
      );
    }
  }

  handleFormSubmit = (pictureName) => {
    this.setState({ pictureName });
  };

  render() {
    return (
      <div>
        <Serchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery>
          <ImageGalleryItem />
        </ImageGallery>
        <Modal />
      </div>
    );
  }
}
