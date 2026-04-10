export interface Kino {
  id: string;
  title: string;
  description: string;
  descriptionShort: string;
  rating: number;
  author: string;
  genre: string;
  price: number;
  image: string;
  duration: number;
}

export interface Schedule {
  id: string;
  filmId: string;
  day: string;
  time1: string | null;
  time2: string | null;
  time3: string | null;
}

export interface FilmScheduleProps {
  film: Kino;
  handleClick: (schedule: Schedule) => void;
}

interface FilmSuccessProps {
  film: Kino;
  selectedDate: { day: string; time: string };
  selectedSeats: Array<{ row: number; seat: number }>;
  contacts: { email: string; phone: string };
}
