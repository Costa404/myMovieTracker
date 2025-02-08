export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre: string[];
  is_popular: boolean;
}

export interface Review {
  review_id: string;
  username: string;
  movie_id: number;
  movie_title: string;
  movie_image: string;
  review: string;
  rating: number;
  profile_picture: string;
}

export interface MovieReview {
  movie_id: number;
  author_details: {
    name: string;
    rating: number;
    username: string;
    avatar_path: string | null;
  };
  content: string;
  created_at: string;
}

export interface ApiReview {
  review_id: string;
  username: string;
  movie_id: number;
  movie_title: string;
  movie_image: string;
  review: string;
  rating: number;
  profile_picture: string;
}

export interface RecommendedMovie {
  poster_path: string;
  title: string;
  movie_id: number;
}
