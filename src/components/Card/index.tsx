import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Dispatch, useCallback, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IMovies, Props } from '../../inteface/GeneralInterface.types';
import { getMovieByFromList } from '../../pages/MovieList/redux/actions';
import './index.scss';

function MovieCard({ props }: Props<IMovies>): JSX.Element {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch: Dispatch<any> = useDispatch();
  const setDataMovie = useCallback((movies: IMovies) => dispatch(getMovieByFromList(movies)), [dispatch]);

  const history = useHistory();
  const handleClick = (imdbId: string) => history.push(`detail/${imdbId}`);

  function handlePickMovie(imdbId: string) {
    handleClick(imdbId);
    setDataMovie(props);
  }

  return (
    <div>
      <div id="movie--container" className="movie--card--container">
        <img onClick={handleShow} id={`movie--${props.Title}`} alt={props.Title} src={props.Poster} />
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img id={`movie--${props.Title}`} alt={props.Title} src={props.Poster} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handlePickMovie(props.imdbID)}>
            See Movie
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const connector = connect(null, {
  getMovieByFromList,
});

export default connector(MovieCard);
