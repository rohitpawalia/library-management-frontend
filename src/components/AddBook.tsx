import { useState } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  available: boolean;
}

interface AddBookProps {
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

function AddBook({ setBooks }: AddBookProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedYear, setPublishedYear] = useState("");

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h2 className="font-serif text-3xl font-bold">
          Add a New Book
        </h2>

        <p className="mt-1 text-sm text-[#6b5b50]">
          Add a book to your collection
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          fetch(`${import.meta.env.VITE_API_URL}/books`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              author,
              genre,
              publishedYear: Number(publishedYear),
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              setBooks((currentBooks) => [
                ...currentBooks,
                data.book,
              ]);

              // Clear form
              setTitle("");
              setAuthor("");
              setGenre("");
              setPublishedYear("");
            });
        }}
        className="space-y-5"
      >
        {/* Inputs */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* Title */}
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Book Title
            </span>

            <input
              type="text"
              placeholder="e.g. The Great Gatsby"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-xl border border-[#d8cbbb] bg-[#fdf8f1] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:ring-2 focus:ring-[#8b5e3c]/20"
            />
          </label>

          {/* Author */}
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Author
            </span>

            <input
              type="text"
              placeholder="e.g. F. Scott Fitzgerald"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              className="rounded-xl border border-[#d8cbbb] bg-[#fdf8f1] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:ring-2 focus:ring-[#8b5e3c]/20"
            />
          </label>

          {/* Genre */}
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Genre
            </span>

            <input
              type="text"
              placeholder="e.g. Classic"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              className="rounded-xl border border-[#d8cbbb] bg-[#fdf8f1] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:ring-2 focus:ring-[#8b5e3c]/20"
            />
          </label>

          {/* Published Year */}
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Published Year
            </span>

            <input
              type="number"
              placeholder="e.g. 1960"
              value={publishedYear}
              onChange={(event) =>
                setPublishedYear(event.target.value)
              }
              className="rounded-xl border border-[#d8cbbb] bg-[#fdf8f1] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:ring-2 focus:ring-[#8b5e3c]/20"
            />
          </label>

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-[#6f4e37] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#593d2b] hover:shadow-md sm:w-auto"
        >
          ➕ Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;