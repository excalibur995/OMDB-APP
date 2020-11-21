import React from 'react';
import { connect } from 'react-redux';
import { GeneralTemplate } from '../../components/GeneralTemplate';
import { MovieListState } from '../../inteface/GeneralInterface.types';
import { RootState } from '../../store';
import MovieList from '../MovieList/index';
import SearchInput from '../SearchMovie/components/SearchInput';
import './home.scss';

function App(props: { movies: MovieListState }) {
  const { isFocus, isLoading } = props.movies;

  const getIsFocus = () => {
    return isFocus ? 'isFocus' : '';
  };

  const customStyles = {
    marginTop: '30px',
    marginBottom: '30px',
    paddingLeft: '20px',
    paddingRight: '20px',
  };

  return (
    <GeneralTemplate title="Omdb Movie App">
      <div className="home--container">
        <div className={`title--container ${getIsFocus()}`}>
          {!getIsFocus() && (
            <div>
              <h1>Welcome to OMDB Movie app</h1>
              <p>where your imagination is at one place</p>
            </div>
          )}
        </div>
        <SearchInput />
        <div style={customStyles}>
          <MovieList />
        </div>
      </div>
    </GeneralTemplate>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movieReducer,
});

export default connect(mapStateToProps, null)(App);
