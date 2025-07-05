import type { IBook } from "@/types";
import bookPlaceholder from "../assets/book-placeholder.png";
import { Button } from "./ui/button";
import { BorrowModal } from "./BorrowModal";
import { EditBookModal } from "./EditModal";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import Swal from "sweetalert2";
import { toastify } from "@/utils/alerts";

interface IProps {
  book: IBook;
}
const BookCard = ({ book }: IProps) => {
  const [deleteBook] = useDeleteBookMutation();

  const deleteHandler = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53e3e",
      cancelButtonColor: "#3182ce",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteBook(id);
        if ("data" in res && res.data?.success) {
          toastify("success", "Book deleted successfully!");
        } else {
          toastify("error", "Failed to delete the book.");
        }
      }
    });
  };

  return (
    <div className="relative max-w-[300px] h-[450px] mx-auto rounded-3xl shadow-lg border border-gray-300 bg-gradient-to-br from-white via-indigo-50 to-indigo-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 flex flex-col p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Book Image */}
      <div className="flex justify-center items-center h-48 bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={bookPlaceholder}
          alt={book.title}
          className="max-h-full object-contain"
        />
      </div>

      {/* Availability Badge */}
      <span
        className={`absolute top-4 left-6 px-4 py-1 rounded-full text-sm font-semibold shadow-md ${
          book.available
            ? "bg-green-500 text-white shadow-green-400"
            : "bg-gray-400 text-gray-200 shadow-gray-400"
        }`}
      >
        {book.available ? "Available" : "Unavailable"}
      </span>

      {/* Book Details */}
      <div className="mt-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-200 truncate">
            {book.title}
          </h3>
          <p className="mt-1 text-indigo-700 dark:text-indigo-400 font-medium">
            by {book.author}
          </p>
          <p className="text-sm text-indigo-600 dark:text-indigo-300 mt-2">
            <span className="font-semibold">Genre:</span> {book.genre}
          </p>
          <p className="text-sm text-indigo-600 dark:text-indigo-300">
            <span className="font-semibold">ISBN:</span> {book.isbn}
          </p>
          <p className="text-sm text-indigo-600 dark:text-indigo-300">
            <span className="font-semibold">Copies:</span> {book.copies}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between gap-3">
          {/* Borrow Button */}
          <BorrowModal book={book}>
            <Button
              className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-500 hover:to-green-700 transition"
              aria-label={`Borrow ${book.title}`}
            >
              Borrow
            </Button>
          </BorrowModal>

          {/* Edit Button */}
          <EditBookModal book={book}>
            <Button
              className="flex-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-700 transition"
              aria-label={`Edit ${book.title}`}
            >
              Update
            </Button>
          </EditBookModal>

          {/* Delete Button */}
          <Button
            onClick={() => deleteHandler(book._id)}
            className="flex-1 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:from-red-500 hover:to-red-700 transition"
            aria-label={`Delete ${book.title}`}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
