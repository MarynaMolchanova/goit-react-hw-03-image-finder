import { Component } from 'react';
import { RxMagnifyingGlass } from 'react-icons/rx';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar, SearchForm, Button, Input } from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  handelInputChange = event => {
    this.setState({
      value: event.currentTarget.value.toLowerCase(),
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.value.trim() === '') {
      return toast.error('Please, enter the request!');
    }
    this.props.onSubmit(this.state.value.trim());
    // this.resetInputValue();
  };

  // resetInputValue = () => {
  //   this.setState({
  //     value: '',
  //   });
  // };

  render() {
    const { value } = this.state;
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleFormSubmit}>
          <Button type="submit" disabled={this.props.isSubmitting}>
            <RxMagnifyingGlass />
          </Button>
          <Input
            type="text"
            onChange={this.handelInputChange}
            value={value}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
