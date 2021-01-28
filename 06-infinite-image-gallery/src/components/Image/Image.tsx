import React, { FC } from 'react';

import './Image.css';

export type ImageType = {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null | string;
  alt_description: null | string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  categories: [];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: [];
  sponsorship: null | string;
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: null | string;
    twitter_username: string;
    portfolio_url: null | string;
    bio: string;
    location: string;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
  };
};

type ImagePropsType = { image: ImageType };

export const Image: FC<ImagePropsType> = ({ image }) => {
  return (
    <a
      className="image"
      key={image.id}
      href={image.links.html}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description ? image.alt_description : 'Description'}
      />
    </a>
  );
};
