import PropTypes from 'prop-types';
import { Component } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';

import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  openModal = () => {
    this.setState({
      showModal: true,
    });
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.setState({
        showModal: false,
      });
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.setState({
        showModal: false,
      });
    }
  };

  render() {
    const { showModal } = this.state;
    const { largeImageURL, webformatURL, tags } = this.props;
    return (
      <div>
        <Item>
          <Image src={webformatURL} alt={tags} loading="lazy" onClick={this.openModal} />
        </Item>
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleBackdropClick}
            onChange={this.handleKeyDown}
          />
        )}
      </div>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
