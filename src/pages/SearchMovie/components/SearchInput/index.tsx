import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { MovieListState } from '../../../../inteface/GeneralInterface.types';
import { RootState } from '../../../../store';
import { emptyMovie, fetchMovie, setFocus as setFocusRedux, typeMovie } from '../../redux/store/actions';
import './index.scss';

const SearchInput = (props: { movies: MovieListState }): JSX.Element => {
  const dispatch: Dispatch<any> = useDispatch();
  const toggleFocus = useCallback((isOn: boolean) => dispatch(setFocusRedux(isOn)), [dispatch]);
  const searchMovie = useCallback((typing: string) => dispatch(typeMovie(typing)), [dispatch]);
  const fetchingMovie = useCallback((typing: string, page: number) => dispatch(fetchMovie(typing, page)), [dispatch]);
  const emptyingTheMovie = useCallback(() => dispatch(emptyMovie()), [dispatch]);
  const { isFocus, search } = props.movies;

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      fetchingMovie(search, 1);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [search, fetchingMovie]);

  function onSetFocus() {
    toggleFocus(true);
  }

  function onSetBlur() {
    if (search.trim().length < 1) {
      toggleFocus(false);
    }
  }

  const isSearchFocus = (): string => {
    return isFocus ? 'isFocus' : '';
  };
  const getPlaceHolder = (): string => {
    return isFocus ? 'Do you like Batman Begins perhaps?' : "What's Your Favourite Movie";
  };

  const onGetChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    const searchText: string = event.target.value;
    if (searchText.trim().length < 1) {
      emptyingTheMovie();
    }
    searchMovie(searchText);
  };

  return (
    <div className={`input--container ${isSearchFocus()}`}>
      <div className={`search--label ${isSearchFocus()}`}>Search Your Favourite Movie</div>
      <input
        className="input--search"
        onBlur={onSetBlur}
        onFocus={onSetFocus}
        type="text"
        onChange={onGetChangeText}
        value={search}
        placeholder={getPlaceHolder()}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  movies: state.movieReducer,
});

const connector = connect(mapStateToProps, { setFocusRedux, typeMovie, fetchMovie, emptyMovie });

export default connector(SearchInput);
