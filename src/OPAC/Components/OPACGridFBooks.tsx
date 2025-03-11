
import { Catalog } from "../Types/BooksTypes";
import OPACBookCard from "./OPACBookCard";

const OPACGridFBooks = ({ colection }: { colection: Catalog }) => {
  return (
    <>
      <div className=" flex flex-wrap gap-4 max-sm:gap-8 md:gap-16 lg:gap-4 xl:gap-4 2xl:gap-4 max-sm:w-full items-center justify-center">
        {colection.data.map((book) => (
          <OPACBookCard key={"Book" + book.BookCode} book={book} />
        ))}
      </div>
    </>
  );
};

export default OPACGridFBooks;
