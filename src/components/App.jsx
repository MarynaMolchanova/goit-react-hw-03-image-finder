import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from './GlobalStyles';
import { AppBox } from './App.styled';

import { SearchBar } from 'components/SearchBar/SearchBar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { fetchSearchImage } from '../services/Api';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    value: '',
    images: [],
    page: 1,
    isLoading: false,
    isLoadMore: false,
  };

  handelForm = event => {
    if (this.state.value !== event) {
      this.setState({
        value: event,
        images: [],
        page: 1,
        isLoadMore: false,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { value, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const response = await fetchSearchImage(value, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
        isLoadMore: true,
      }));
      this.responseFetch(response);
    } catch (error) {
      toast.error('An error occurred. Please, reload the page');
    } finally {
      this.setState({ isLoading: false });
    }
  }

  responseFetch = ({ totalHits, hits }) => {
    const PER_PAGE = 12;
    if (this.state.page === 1 && totalHits !== 0) {
      toast.success(`Hooray! We found ${totalHits} images`);
      this.setState({ isLoadMore: true });
    }
    if (totalHits === 0) {
      toast.warn(`Sorry, there are no images matching your search query. Please try again.`);
      this.setState({ isLoadMore: false });
    } else if (hits.length < PER_PAGE) {
      toast.info('These are all the pictures what we found. Try something else');
      this.setState({ isLoadMore: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoadMore: false,
    }));
  };

  render() {
    const { isLoading, images, isLoadMore } = this.state;
    return (
      <AppBox>
        <GlobalStyle />
        <SearchBar onSubmit={this.handelForm} isSubmitting={isLoading} />
        {images.length !== 0 && <ImageGallery items={images} />}
        {isLoading && <Loader />}
        {isLoadMore && <Button onClick={this.loadMore} />}
        <ToastContainer autoClose={3000} />
      </AppBox>
    );
  }
}
