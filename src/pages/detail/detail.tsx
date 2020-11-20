import React, { useCallback, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { GeneralTemplate } from '../../components/GeneralTemplate';
import { RootState } from '../../store';
import { fetchMovieSingle } from '../MovieList/redux/actions';
import { MovieSingle } from '../MovieList/redux/types';
import './index.scss';
type ConnectorProps = {
  reduxState: MovieSingle;
};

function DetailMovies(props: ConnectorProps) {
  const dispatch: Dispatch<any> = useDispatch();
  const fetchById = useCallback((id: string) => dispatch(fetchMovieSingle(id)), [dispatch]);
  const { detailed, Movies } = props.reduxState;
  const { id }: { id?: string } = useParams();

  function handleInitialState() {
    if (id) {
      fetchById(id);
    }
  }

  useEffect(() => {
    console.log(props.reduxState.isLoad);
  }, [props]);

  useEffect(() => {
    handleInitialState();
  }, [id]);

  return (
    <GeneralTemplate title={detailed.Title || Movies.Title} withHeader={true} isDetail={true}>
      <div className="detail--container">
        <img
          id={`movie--${detailed.Title || Movies.Title}`}
          alt={detailed.Title || Movies.Title}
          src={detailed.Poster || Movies.Poster}
        />
        <div className="movie--detail">
          <div className="title--section">
            <h3>{detailed.Title || Movies.Title}</h3>
            <p>{Movies.Genre}</p>
          </div>

          <b>{Movies.Actors}</b>
          <div>{Movies.Writer}</div>
          <br />
          <br />
          <h6>{Movies.Plot}</h6>
        </div>
      </div>
    </GeneralTemplate>
  );
}

const mapStateToProps = (state: RootState) => ({
  reduxState: state.singleReducer,
});

const connector = connect(mapStateToProps, {
  fetchMovieSingle,
});

export default connector(DetailMovies);
