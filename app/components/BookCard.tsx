import { Button } from "@/components/ui/button";
import { IBook } from "@/types";
import Link from "next/link";

import React from "react";

const BookCard = ({ book }: { book: IBook }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h2>
      {book.author && (
        <p className="text-gray-600 italic mb-2">By {book.author}</p>
      )}
      {book.price && (
        <p className="text-lg font-bold text-blue-600">
          ${book.price.toFixed(2)}
        </p>
      )}
      <Button>
        <Link href={`/${book.id}`}>View Details</Link>
      </Button>
    </div>
  );
};

export default BookCard;
