import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onChange);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onChange);
  }

  render() {
    const { onClose, largeImageURL } = this.props;
    return createPortal(
      <Overlay onClick={onClose}>
        <ModalWindow>
          <img src={largeImageURL} alt="" />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
