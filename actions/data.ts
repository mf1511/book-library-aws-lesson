import { IBook } from "@/types";
import "server-only";

export const getBooks = async () => {
  try {
    const response = await fetch(`${process.env.AWS_API_URL}/books`, {
      cache: "no-store",
    }).then(async function (res) {
      const status = res.status;
      const data = await res.json();
      if (status === 200) {
        return { data, status };
      } else {
        throw new Error("Failed to fetch books");
      }
    });
    return response;
  } catch (error) {
    console.error("Error fetching books:", error);
    return { data: "Failed to fetch books" };
  }
};

export const getBook = async (id: string) => {
  try {
    const response = await fetch(`${process.env.AWS_API_URL}/books/${id}`).then(
      async function (res) {
        const status = res.status;
        const data = await res.json();
        if (status === 200) {
          return { data, status };
        } else {
          throw new Error("Failed to fetch book");
        }
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching book:", error);
    return { data: "Failed to fetch book" };
  }
};

export const putBook = async (data: IBook) => {
  try {
    const response = await fetch(`${process.env.AWS_API_URL}/books`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to put book");
    }

    return await response.json();
    // .then(async function (res) {
    // const status = res.status
    // const data = await res.json()
  } catch (error) {
    console.error("Error putting book:", error);
    return { message: "Failed to put book" };
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await fetch(`${process.env.AWS_API_URL}/books/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting book:", error);
    return { message: "Failed to delete book" };
  }
};
