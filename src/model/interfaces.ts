export interface Permission {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  token: string;
  permissions: Permission[];
}

export interface DrawerItem {
  id: number;
  label: string;
  icon: string;
  route: string;
  permissions?: string[];
  disabled?: boolean;
}

export interface Status {
  id: number;
  status: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number
  genre: string;
  publisher: string;
  volumes: number;
  avgRating: number;
  imgUrl: string;
  interactions: Interaction[];
}

export interface Interaction {
  id: number;
  rating: number;
  bookmarked: boolean;
  comment: string;
  user: User;
  book: Book;
  status: Status;
}
