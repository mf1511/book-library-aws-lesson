"use client";
import { IBook } from "@/types";
import useSWR from "swr";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import {
  deleteBookFromDB,
  getBookFromDB,
  putBookToDB,
} from "@/actions/actions";

const BookPage = ({ params }: { params: { id: string } }) => {
  const [book, setBook] = useState<IBook | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (book) {
      const newBook: IBook = {
        ...book,
        [name]: name === "price" ? parseFloat(value) : value,
      };
      setBook(newBook);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (book) await putBookToDB(book);
      router.push("/");
      router.refresh();
      console.log(book);
    } catch (error) {
      console.log(error);
      setError("Failed to edit book");
    }
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("delete");
    try {
      if (book) await deleteBookFromDB(Number(params.id));
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("Failed to delete book");
    }
  };

  // const { data, error } = useSWR(`/api/books /${params.id}`, fetcher);

  useEffect(() => {
    const fetchBook = async () => {
      const fetchedBook = await getBookFromDB(Number(params.id));
      setBook(fetchedBook);
    };
    fetchBook();
  }, [params.id]);

  return (
    <div className=" text-black">
      <Header />
      {error && (
        <div className="text-red-500 text-center bg-red-100 p-4 rounded-md mt-2">
          {error}
        </div>
      )}
      {book ? (
        <div className="p-4 flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold">{book.title} </h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={book.title}
                placeholder="Enter title"
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={book.author}
                placeholder="Enter author"
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={book.price}
                placeholder="Enter price"
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={book.description}
                placeholder="Enter description"
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors w-full mt-4"
            >
              Edit book
            </button>
          </form>
          <form action={handleDelete} className=" flex justify-left">
            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors w-full"
            >
              Delete book
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default BookPage;
