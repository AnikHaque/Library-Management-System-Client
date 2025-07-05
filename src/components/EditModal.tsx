import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEditBookMutation } from "@/redux/api/baseApi";
import { Textarea } from "./ui/textarea";
import Swal from "sweetalert2";
import { toastify } from "@/utils/alerts";
import type { IBookFormInput } from "@/types";

interface IProps {
  book: IBookFormInput & { _id: string }; // _id is used in submit
}

export function EditBookModal({ book }: IProps) {
  const [open, setOpen] = useState(false);
  const [editBook] = useEditBookMutation();

  const form = useForm<IBookFormInput>({
    defaultValues: {
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      copies: book.copies,
      description: book.description,
      available: book.available, // optional, keep in defaultValues if exists
    },
  });

  const id = book._id;

  const handleSubmit: SubmitHandler<IBookFormInput> = async (data) => {
    // parse copies once, fallback to 0 if invalid number
    const copiesNumber = Number(data.copies);
    const validCopies = isNaN(copiesNumber) ? 0 : copiesNumber;

    const bookData = {
      ...data,
      copies: validCopies,
      available: validCopies > 0,
    };

    try {
      const response = await editBook({ id, bookData });
      if (response?.data?.success) {
        toastify("success", "Save Changes Successful!");
      } else {
        Swal.fire({
          title: "Something went wrong!",
          text: "Please try again later.",
          icon: "error",
          draggable: true,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to save changes.",
        icon: "error",
        draggable: true,
      });
    }

    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="hover:bg-[#6255E3] hover:text-white"
          variant={"outline"}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Book Info</DialogTitle>
          <DialogDescription>
            Update book details and click Save Changes.
          </DialogDescription>
        </DialogHeader>
        <div className="border"></div>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Form {...form}>
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Author */}
            <FormField
              control={form.control}
              name="author"
              rules={{ required: "Author name is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Genre */}
            <FormField
              control={form.control}
              name="genre"
              rules={{ required: "Genre is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    {/* You could change this Input to a select dropdown for better UX */}
                    <Input {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* ISBN */}
            <FormField
              control={form.control}
              name="isbn"
              rules={{ required: "ISBN number is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>ISBN Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              rules={{ required: "Description is required!" }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Copies */}
            <FormField
              control={form.control}
              name="copies"
              rules={{
                required: "Copies is required",
                min: {
                  value: 0,
                  message: "Copies must be 0 or positive number.",
                },
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      // ensure value is a number or empty string for input control
                      value={
                        field.value === undefined || field.value === null
                          ? ""
                          : field.value
                      }
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </Form>

          <DialogFooter className="pt-4">
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
