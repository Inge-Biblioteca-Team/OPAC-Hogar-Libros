

import { Catalog } from "../Types/BooksTypes";
import OPACBookCard from "./OPACBookCard";

const OPACGridFBooks = ({ colection }: { colection: Catalog }) => {
  return (
    <>
      <div className="grid grid-cols-5 gap-4 max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-sm:w-full items-center justify-center bg-gray-200 p-4">
        {colection.data.map((book) => (
          <OPACBookCard key={"Book" + book.BookCode} book={book} />
        ))}
      </div>
    </>
  );
};

export default OPACGridFBooks;
