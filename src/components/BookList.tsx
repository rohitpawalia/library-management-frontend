import { useEffect, useState } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  available: boolean;
  coverUrl: string;
}

interface BookListProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

function BookList({ books, setBooks }: BookListProps) {
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editGenre, setEditGenre] = useState("");
  const [editPublishedYear, setEditPublishedYear] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  const handleDelete = (id: string) => {
    fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setBooks((currentBooks) =>
          currentBooks.filter((book) => book._id !== id)
        );
      });
  };

  const handleBorrow = (id: string) => {
  fetch(`http://localhost:3000/books/${id}/borrow`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book._id === id ? data.book : book
        )
      );
    });
};

const handleReturn = (id: string) => {
  fetch(`http://localhost:3000/books/${id}/return`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book._id === id ? data.book : book
        )
      );
    });
};

  const handleUpdate = async () => {
    if (!editingBook) return;

    const response = await fetch(
      `http://localhost:3000/books/${editingBook._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          author: editAuthor,
          genre: editGenre,
          publishedYear: Number(editPublishedYear),
        }),
      }
    );

    const data = await response.json();

    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book._id === editingBook._id ? data.book : book
      )
    );

    setEditingBook(null);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Section Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold">
            Your Books
          </h2>

          <p className="mt-1 text-sm text-[#6b5b50]">
            Browse and manage your collection
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔎 Search books..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-xl border border-[#d8cbbb] bg-[#fdf8f1] px-4 py-3 outline-none transition focus:border-[#8b5e3c] focus:ring-2 focus:ring-[#8b5e3c]/20 sm:w-72"
        />
      </div>

      {/* Edit Form */}
      {editingBook && (
        <div className="mb-8 rounded-2xl border border-[#d8cbbb] bg-[#f7f1e8] p-6">
          <h3 className="mb-5 font-serif text-2xl font-bold">
            Edit Book
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium">
              Title
              <input
                type="text"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
                className="rounded-xl border border-[#d8cbbb] bg-[#fffaf3] px-4 py-3 outline-none focus:border-[#8b5e3c] focus:ring-2 focus:ring-[#8b5e3c]/20"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Author
              <input
                type="text"
                value={editAuthor}
                onChange={(event) => setEditAuthor(event.target.value)}
                className="rounded-xl border border-[#d8cbbb] bg-[#fffaf3] px-4 py-3 outline-none focus:border-[#8b5e3c] focus:ring-2 focus:ring-[#8b5e3c]/20"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Genre
              <input
                type="text"
                value={editGenre}
                onChange={(event) => setEditGenre(event.target.value)}
                className="rounded-xl border border-[#d8cbbb] bg-[#fffaf3] px-4 py-3 outline-none focus:border-[#8b5e3c] focus:ring-2 focus:ring-[#8b5e3c]/20"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Published Year
              <input
                type="number"
                value={editPublishedYear}
                onChange={(event) =>
                  setEditPublishedYear(event.target.value)
                }
                className="rounded-xl border border-[#d8cbbb] bg-[#fffaf3] px-4 py-3 outline-none focus:border-[#8b5e3c] focus:ring-2 focus:ring-[#8b5e3c]/20"
              />
            </label>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleUpdate}
              className="rounded-xl bg-[#6f4e37] px-5 py-3 font-medium text-white transition hover:bg-[#593d2b]"
            >
              Update Book
            </button>

            <button
              onClick={() => setEditingBook(null)}
              className="rounded-xl border border-[#d8cbbb] bg-[#fffaf3] px-5 py-3 font-medium transition hover:bg-[#f0e7dc]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Book Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="flex flex-col justify-between rounded-2xl border border-[#d8cbbb] bg-[#fffaf3] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              {/* Book Icon */}
              {book.coverUrl ? (
               <img
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                className="h-64 w-full rounded-xl object-cover shadow-sm"
                 />
                 ) : (
                  <div className="flex h-64 w-full items-center justify-center rounded-xl bg-[#f0e7dc] text-6xl">
                      📖
                     </div>
                    )}
              <h3 className="font-serif text-2xl font-bold">
                {book.title}
              </h3>

              <p className="mt-2 text-[#6b5b50]">
                by {book.author}
              </p>

              <div className="mt-5 space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Genre:</span>{" "}
                  {book.genre}
                </p>

                <p>
                  <span className="font-semibold">Published:</span>{" "}
                  {book.publishedYear}
                </p>
              </div>

              {/* Status */}
              <div className="mt-5">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                    book.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {book.available ? "Available" : "Borrowed"}
                </span>
              </div>
            </div>

            {/* Buttons */}
           <div className="mt-6 flex gap-3">

  {book.available ? (
  <button
    onClick={() => handleBorrow(book._id)}
    className="flex-1 rounded-xl border border-green-600 px-4 py-2 font-medium text-green-700 transition hover:bg-green-50"
  >
    📚 Borrow
  </button>
) : (
  <button
    onClick={() => handleReturn(book._id)}
    className="flex-1 rounded-xl border border-blue-600 px-4 py-2 font-medium text-blue-700 transition hover:bg-blue-50"
  >
    ↩️ Return
  </button>
)}

  <button
    onClick={() => {
      setEditingBook(book);
      setEditTitle(book.title);
      setEditAuthor(book.author);
      setEditGenre(book.genre);
      setEditPublishedYear(String(book.publishedYear));
    }}
    className="flex-1 rounded-xl border border-[#8b5e3c] px-4 py-2 font-medium text-[#6f4e37] transition hover:bg-[#f0e7dc]"
  >
    ✏️ Edit
  </button>

  <button
    onClick={() => handleDelete(book._id)}
    className="flex-1 rounded-xl border border-red-300 px-4 py-2 font-medium text-red-700 transition hover:bg-red-50"
  >
    🗑️ Delete
  </button>

</div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredBooks.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[#d8cbbb] py-12 text-center">
          <p className="font-serif text-xl font-semibold">
            No books found
          </p>

          <p className="mt-2 text-sm text-[#6b5b50]">
            Try a different search.
          </p>
        </div>
      )}
    </div>
  );
}

export default BookList;