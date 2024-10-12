import Header from "./components/Header";
import BookCard from "./components/BookCard";
import { IBook } from "@/types";
import { getBooks } from "@/actions/data";

export default async function Home() {
  // const books: IBook[] = [
  //   {
  //     id: "1",
  //     title: "Book 1",
  //     author: "Author 1",
  //     price: 10,
  //     description: "Description 1",
  //   },
  //   {
  //     id: "2",
  //     title: "Book 2",
  //     author: "Author 2",
  //     price: 20,
  //     description: "Description 2",
  //   },
  // ];

  const books = await getBooks();
  console.log("books", books);
  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-2xl font-bold">Explore our Collections</h2>
        <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {books.data &&
            books.data.map((book: IBook, index: number) => (
              <BookCard key={index} book={book} />
            ))}
        </div>
      </main>
    </div>
  );
}
