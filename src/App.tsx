import { useState } from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  available: boolean;
  coverUrl: string;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  const totalBooks = books.length;

  const availableBooks = books.filter(
    (book) => book.available
  ).length;

  const borrowedBooks = books.filter(
    (book) => !book.available
  ).length;

  return (
    <div className="min-h-screen bg-[#f7f1e8] text-[#3b2f2f]">

      {/* Header */}
      <header className="border-b border-[#d8cbbb] bg-[#fffaf3]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <h1 className="font-serif text-3xl font-bold">
            📚 My Library
          </h1>

          <nav className="flex gap-6 text-sm font-medium">
            <a
              href="#books"
              className="transition hover:text-[#8b5e3c]"
            >
              Books
            </a>

            <a
              href="#add-book"
              className="transition hover:text-[#8b5e3c]"
            >
              Add Book
            </a>
          </nav>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Hero */}
        <section className="mb-10 text-center">
          <h2 className="font-serif text-5xl font-bold tracking-tight">
            Welcome to your Library
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6b5b50]">
            Discover your next great read and manage your collection
            with ease.
          </p>
        </section>

        {/* Statistics */}
        <section className="mb-10 grid gap-5 sm:grid-cols-3">

  {/* Total */}
  <div className="group rounded-2xl border border-[#d8cbbb] bg-[#fffaf3] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#6b5b50]">
          Total Books
        </p>

        <p className="mt-2 font-serif text-4xl font-bold">
          {totalBooks}
        </p>
      </div>

      <div className="text-4xl">
        📚
      </div>
    </div>
  </div>

  {/* Available */}
  <div className="group rounded-2xl border border-[#d8cbbb] bg-[#fffaf3] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#6b5b50]">
          Available
        </p>

        <p className="mt-2 font-serif text-4xl font-bold">
          {availableBooks}
        </p>
      </div>

      <div className="text-4xl">
        📗
      </div>
    </div>
  </div>

  {/* Borrowed */}
  <div className="group rounded-2xl border border-[#d8cbbb] bg-[#fffaf3] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#6b5b50]">
          Borrowed
        </p>

        <p className="mt-2 font-serif text-4xl font-bold">
          {borrowedBooks}
        </p>
      </div>

      <div className="text-4xl">
        📕
      </div>
    </div>
  </div>

</section>

        {/* Books */}
        <section
          id="books"
          className="mb-12 rounded-2xl border border-[#d8cbbb] bg-[#fffaf3] p-6 shadow-sm"
        >
          <BookList
            books={books}
            setBooks={setBooks}
          />
        </section>

        {/* Add Book */}
        <section
          id="add-book"
          className="rounded-2xl border border-[#d8cbbb] bg-[#fffaf3] p-6 shadow-sm"
        >
          <AddBook setBooks={setBooks} />
        </section>

      </main>
      {/* Footer */}
<footer className="border-t border-[#d8cbbb] bg-[#fffaf3]">
  <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-[#6b5b50]">
    📚 My Library · Manage your collection with ease
  </div>
</footer>
    </div>
  );
}

export default App;