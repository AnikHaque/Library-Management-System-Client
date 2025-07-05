export type IBookFormInput = {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number | string;
};

export type IBookBorrowData = {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
};
