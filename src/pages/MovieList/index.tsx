import React, { Dispatch, useCallback, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Card from '../../components/Card';
import Skeleton from '../../components/Skeleton';
import { MovieListState } from '../../inteface/GeneralInterface.types';
import { RootState } from '../../store';
import { setCount } from '../MovieList/redux/actions';
import { fetchMovie } from '../SearchMovie/redux/store/actions';
import './index.scss';
import { MovieSingle } from './redux/types';
const MovieList = (props: { reduxState: MovieListState; singleState: MovieSingle }) => {
  const { isLoading, movies, search } = props.reduxState;
  const { count } = props.singleState;
  const dispatch: Dispatch<any> = useDispatch();
  const fetchingMovie = useCallback((typing: string, page: number) => dispatch(fetchMovie(typing, page)), [dispatch]);
  const setCounter = useCallback((page: number) => dispatch(setCount(page)), [dispatch]);
  const [, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  useEffect(() => {
    if (scrollTop + window.innerHeight >= document.body.offsetHeight - 2) {
      addMore();
    }
  }, [scrollTop]);

  const addMore = () => {
    if (count < movies.totalResults && !isLoading) {
      let counter = count;
      counter = count + 1;
      setCounter(counter);
      fetchingMovie(search, counter);
    }
  };

  const movieList = () => {
    if (isLoading) {
      const listSkeleton = [0, 1, 2, 3, 4, 5].map(val => <Skeleton key={val} width={144} height={242} />);
      return <div className="movie--list--container">{listSkeleton}</div>;
    }

    if (!isLoading && search.trim().length > 0 && movies.Search && movies.Search.length > 0) {
      const listItems = movies.Search.map((value, index) => <Card key={value.imdbID + index} props={value} />);
      return <div className="movie--list--container">{listItems}</div>;
    }

    return null;
  };

  return movieList();
};

const mapStateToProps = (state: RootState) => ({
  reduxState: state.movieReducer,
  singleState: state.singleReducer,
});

const connector = connect(mapStateToProps, { setCount, fetchMovie });

export default connector(MovieList);
