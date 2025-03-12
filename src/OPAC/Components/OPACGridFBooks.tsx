

import OPACBookCard from "./OPACBookCard";

const OPACGridFBooks = ({ colection }: { colection: any }) => {
  return (
    <>
      <div className=" flex flex-wrap gap-4 max-sm:gap-8 md:gap-16 lg:gap-4 xl:gap-4 2xl:gap-4 max-sm:w-full items-center justify-center">
        {colection.map((book:any) => (
          <OPACBookCard key={"Book" + book.BookCode} book={book} />
        ))}
      </div>
    </>
  );
};

export default OPACGridFBooks;
