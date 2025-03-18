import { Book } from "../Types/BooksTypes";

const OPACBookCard = ({ book }: { book: Book }) => {
  return (
    <>
      <figure className=" hover:scale-105 max-sm:w-full ">
        <img
          src={book.Cover}
          alt={book.Title}
          className="object-fill hover:shadow-md hover:drop-shadow-lg hover:shadow-blue-950 rounded-t-md h-96 w-80 2xl:w-64
          max-sm:h-48 max-sm:rounded-md"
        />
        <figcaption className="relative bg-white w-52 h-32 pl-1 2xl:w-64 pt-2 rounded-b-md overflow-clip ">
          <p className=" cursor-default">
            <span className=" w-48 line-clamp-1">Autor: {book.Author}</span>
            <span className=" w-52  line-clamp-1">Titulo: {book.Title}</span>
            <span className=" w-52  2xl:w-64 line-clamp-1">
              Año de publicación: {book.PublishedYear || "N/A"}
            </span>
            <span className=" w-52  line-clamp-1">
              Disponibilidad: {book.Status ? "Disponible" : "En uso"}
            </span>
          </p>
        </figcaption>
      </figure>
    </>
  );
};

export default OPACBookCard;
