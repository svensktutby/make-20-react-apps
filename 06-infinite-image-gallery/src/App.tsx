import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 } from 'uuid';

import './App.css';
import { Image, ImageType } from './components/Image/Image';

const apiKey = process.env.REACT_APP_API_KEY;

export const App: FC = () => {
  const baseUrl = 'https://api.unsplash.com/';

  const [images, setImages] = useState<Array<ImageType>>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const getPhotos = useCallback(() => {
    let apiUrl = `${baseUrl}photos/?`;
    if (query) apiUrl = `${baseUrl}search/photos/?query=${query}`;
    apiUrl += `&client_id=${apiKey}`;
    apiUrl += `&page=${page}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const imagesFromApi = data.results ?? data;

        // if page is 1, then we need a whole new array of images
        if (page === 1) {
          setImages(imagesFromApi);
          return;
        }

        // if page > 1, then we are adding for our infinite scroll
        setImages((prevState) => prevState.concat(imagesFromApi));
      });
  }, [page, query]);

  const searchPhotos = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    getPhotos();
  };

  useEffect(() => {
    getPhotos();
  }, [getPhotos, page]);

  const queryHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // return an error if there is no access key
  if (!apiKey) {
    return (
      <a className="error" href="https://unsplash.com/developers">
        Required: Get Your Unsplash API Key First
      </a>
    );
  }

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form onSubmit={searchPhotos}>
        <input
          type="text"
          placeholder="Search Unsplash..."
          value={query}
          onChange={queryHandler}
        />
        <button type="button">Search</button>
      </form>

      <InfiniteScroll
        dataLength={images.length}
        next={() => {
          setPage((prevPage) => prevPage + 1);
        }}
        hasMore
        loader={<h4>Loading...</h4>}
      >
        <div className="image-grid">
          {images.map((image) => (
            <Image key={v4()} image={image} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
