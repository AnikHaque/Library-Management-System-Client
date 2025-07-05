"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import Swal from "sweetalert2";
import { toastify } from "@/utils/alerts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookOpenIcon } from "lucide-react";
import Lottie from "lottie-react";
import bookAnimation from "../assets/books-animation.json";

type IBookFormInput = {
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

export default function AddBook() {
  const [createBook] = useCreateBookMutation();
  const form = useForm<IBookFormInput>();

  const handleSubmit: SubmitHandler<IBookFormInput> = async (data) => {
    const bookData = {
      ...data,
      copies: [Number(data.copies)],
    };

    try {
      const response = await createBook(bookData);
      if ("data" in response) {
        toastify("success", "Book added successfully!");
        form.reset();
      } else {
        throw new Error("Error creating book");
      }
    } catch (err) {
      Swal.fire({
        title: "Something went wrong",
        text: "Unable to add book. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 md:px-20 bg-[#f4f5fa]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        {/* Left Panel: Animation & Intro */}
        <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 flex flex-col justify-center items-center p-8">
          <Lottie animationData={bookAnimation} className="w-64 h-64 mb-4" />
          <h2 className="text-xl font-semibold text-indigo-800 text-center">
            Create a New Book Entry
          </h2>
          <p className="text-sm text-indigo-600 mt-2 text-center">
            Help readers discover new knowledge 📚
          </p>
        </div>

        {/* Right Panel: Form */}
        <div className="p-10">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <BookOpenIcon className="w-6 h-6 text-indigo-600" />
            Add Book Details
          </h1>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <Form {...form}>
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                rules={{ required: "Title is required" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Book title..." {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <span className="text-xs text-red-500">
                        {fieldState.error.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />

              {/* Author */}
              <FormField
                control={form.control}
                name="author"
                rules={{ required: "Author is required" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author name..." {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <span className="text-xs text-red-500">
                        {fieldState.error.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />

              {/* ISBN */}
              <FormField
                control={form.control}
                name="isbn"
                rules={{ required: "ISBN is required" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input placeholder="978-xxxx..." {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <span className="text-xs text-red-500">
                        {fieldState.error.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />

              {/* Genre */}
              <FormField
                control={form.control}
                name="genre"
                rules={{ required: "Genre is required" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700"
                      >
                        <option value="">Select genre</option>
                        <option value="FICTION">Fiction</option>
                        <option value="NON_FICTION">Non-Fiction</option>
                        <option value="SCIENCE">Science</option>
                        <option value="HISTORY">History</option>
                        <option value="BIOGRAPHY">Biography</option>
                        <option value="FANTASY">Fantasy</option>
                      </select>
                    </FormControl>
                    {fieldState.error && (
                      <span className="text-xs text-red-500">
                        {fieldState.error.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />

              {/* Copies */}
              <FormField
                control={form.control}
                name="copies"
                rules={{
                  required: "Copies required",
                  min: { value: 1, message: "Minimum 1 copy" },
                }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Copies</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1" min={1} {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <span className="text-xs text-red-500">
                        {fieldState.error.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What is this book about?"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <span className="text-xs text-red-500">
                        {fieldState.error.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />
            </Form>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-md py-2 rounded-md shadow-md transition"
            >
              ➕ Add Book
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
