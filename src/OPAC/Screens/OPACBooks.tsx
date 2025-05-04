/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  Button,
  Label,
  Pagination,
  Select,
  Sidebar,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { getCategoriesNames, getColection } from "../Services/BooksServices";
import OPACGridFBooks from "../Components/OPACGridFBooks";
import Loader from "../Assets/LoaderOPAC.gif";
import { Catalog } from "../Types/BooksTypes";
import { FaRemoveFormat } from "react-icons/fa";
import { PiMagnifyingGlassFill } from "react-icons/pi";

const OPACBooks = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [Author, setAuthor] = useState<string>("");
  const [publishYear, setPublishYear] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const { data: catalog, isLoading } = useQuery<Catalog>(
    ["OPACSearch", page, title, Author, publishYear, selectedCategory],
    () => getColection(page, 10, title, Author, publishYear, selectedCategory),
    {
      staleTime: 5000,
    }
  );

  const { data: categories, isLoading: loading } = useQuery<[], Error>(
    ["CategoriesName"],
    () => getCategoriesNames(),
    {
      staleTime: Infinity,
    }
  );

  const handleCategoryClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const value = event.currentTarget.getAttribute("data-value");
    if (value) {
      setSelectedCategory(value);
      setPage(1);
    }
  };

  const resetState = () => {
    setSelectedCategory("");
    setTitle("");
    setAuthor("");
    setPublishYear(0);
    setPage(1);
  };

  const onPageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const MaxPage = Math.ceil((catalog?.total ?? 0) / 40);

  return (
    <>
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <figure>
            <img width={400} src={Loader} alt="...Cargando" />
            <figcaption className="text-center">...Cargando</figcaption>
          </figure>
        </div>
      ) : (
        <main className=" flex w-full max-xl:flex-col">
          <div className=" hidden max-xl:flex items-end gap-2 justify-center pt-3">
            <div>
              <Label value="Categoria" />
              <Select className="custom-Select">
                <>
                  {categories &&
                    categories
                      .filter((category) => category !== "")
                      .map((category) => (
                        <option
                          key={category}
                          className={
                            selectedCategory === category
                              ? "bg-Body-light text-white hover:text-black hover:bg-Body-light cursor-pointer"
                              : " cursor-pointer hover:bg-slate-200"
                          }
                          data-value={category}
                        >
                          <span>{category}</span>
                        </option>
                      ))}
                </>
              </Select>
            </div>
            <div>
              <Label value="Título" />
              <TextInput
                onChange={(event) => {
                  setTitle(event?.target.value), setPage(1);
                }}
              />
            </div>
            <div>
              <Label value="Autor" />
              <TextInput
                onChange={(event) => {
                  setAuthor(event?.target.value), setPage(1);
                }}
              />
            </div>
            <div>
              <Label value="Año de publicación" />
              <TextInput
                onChange={(event) => {
                  setPublishYear(Number(event?.target.value)), setPage(1);
                }}
              />
            </div>
            <div>
              <Button color={"blue"} className=" w-full" onClick={resetState}>
                <span className=" max-lg:hidden">Borrar filtros</span>
                <FaRemoveFormat className="max-lg:block hidden" size={20} />
              </Button>
            </div>
          </div>
          <Sidebar
            className="
          max-xl:hidden
          2xl:!w-[45vh]
           h-[91vh]
          !w-[50vh]
          "
          >
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <details className="cursor-pointer">
                  <summary className="text-lg">Categoria</summary>
                  <>
                    {categories &&
                      categories
                        .filter((category) => category !== "")
                        .map((category) => (
                          <Sidebar.Item
                            key={category}
                            className={
                              selectedCategory === category
                                ? "bg-Body-light text-white hover:text-black hover:bg-Body-light cursor-pointer"
                                : " cursor-pointer hover:bg-slate-200"
                            }
                            onClick={handleCategoryClick}
                            data-value={category}
                          >
                            <span>{category}</span>
                          </Sidebar.Item>
                        ))}
                  </>
                </details>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                <Sidebar.Item>
                  <Label value="Título" />
                  <TextInput
                    onChange={(event) => {
                      setTitle(event?.target.value), setPage(1);
                    }}
                  />
                </Sidebar.Item>
                <Sidebar.Item>
                  <Label value="Autor" />
                  <TextInput
                    onChange={(event) => {
                      setAuthor(event?.target.value), setPage(1);
                    }}
                  />
                </Sidebar.Item>
                <Sidebar.Item>
                  <Label value="Año de publicación" />
                  <TextInput
                    onChange={(event) => {
                      setPublishYear(Number(event?.target.value)), setPage(1);
                    }}
                  />
                </Sidebar.Item>
                <Sidebar.Item>
                  <Button
                    color={"blue"}
                    className=" w-full"
                    onClick={resetState}
                  >
                    Borrar filtros
                  </Button>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
          <>
            {isLoading && (
              <div className=" w-full flex items-center justify-center">
                <figure>
                  <img width={400} src={Loader} alt="...Cargando" />
                  <figcaption className=" text-center">...Cargando</figcaption>
                </figure>
              </div>
            )}
            {!isLoading && (
              <div className="w-full flex flex-col gap-2 pt-3 2xl:pt-4">
                {!isLoading && catalog && catalog.total > 0 && (
                  <>
                    <OPACGridFBooks colection={catalog} />
                    <div className=" flex items-center max w-full justify-center ">
                      <Pagination
                        previousLabel="Anterior"
                        nextLabel="Siguiente"
                        currentPage={page}
                        totalPages={MaxPage}
                        onPageChange={onPageChange}
                      />
                    </div>
                  </>
                )}
                {!isLoading && (!catalog || catalog.total == 0) && (
                  <div className=" w-full flex items-center justify-center mt-40 flex-col">
                    <PiMagnifyingGlassFill className=" text-9xl text-red-800" />
                    <figcaption className=" text-center text-2xl">
                      Lo sentimos de momento no tenemos los libros que buscas.
                    </figcaption>
                  </div>
                )}
              </div>
            )}
          </>
        </main>
      )}
    </>
  );
};

export default OPACBooks;
