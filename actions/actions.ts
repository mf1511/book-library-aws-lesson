"use server";
import { IBook } from "@/types";
import { deleteBook, getBook, getBooks, putBook } from "./data";

export const getBooksFromDB = async () => {
  const res = await getBooks();
  return res.data;
};

export const getBookFromDB = async (id: number) => {
  const res = await getBook(id.toString());
  return res.data;
};

export const putBookToDB = async (data: IBook) => {
  const res = await putBook(data);
  return res.data;
};

export const deleteBookFromDB = async (id: number) => {
  const res = await deleteBook(id.toString());
  return res.data;
};
