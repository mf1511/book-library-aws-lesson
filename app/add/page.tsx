"use client";
import React, { useState } from "react";
import { IBook } from "@/types";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { putBookToDB } from "@/actions/actions";

const AddPage = () => {
  const router = useRouter();
  const [book, setBook] = useState<IBook>({
    id: Math.floor(1000 * Math.random() * 9000).toString(),
    title: "",
    author: "",
    price: 0,
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await putBookToDB(book);
      router.push("/");
      router.refresh();
      console.log(book);
    } catch (error) {
      console.log(error);
      setError("Failed to edit book");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (book) {
      const newBook: IBook = {
        ...book,
        [name]: name === "price" ? parseFloat(value) : value,
      };
      console.log("newBook", newBook);
      setBook(newBook);
    }
  };

  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4 ">Add Book</h2>
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
      </main>
    </div>
  );
};

export default AddPage;
