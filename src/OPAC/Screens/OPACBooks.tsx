/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Button, Label, Pagination, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { getCategoriesNames, getColection } from "../Services/BooksServices";
import OPACGridFBooks from "../Components/OPACGridFBooks";
import Loader from "../Assets/LoaderOPAC.gif";
import { Catalog } from "../Types/BooksTypes";

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
        <main className=" flex max-sm:flex-col md:flex-col xl:flex-row 2xl:flex-row lg:flex-row w-full">
          <Sidebar
            className="
           h-[91vh]
          !w-[45vh]
          max-sm:w-full md:w-full lg:h-auto xl:w-auto xl:p-0 2xl:w-auto 2xl:p-0 lg:p-0 md:pl-2 md:pr-2 max-sm:pl-2 max-sm:pr-2"
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
            {isLoading ? (
              <div className=" w-full flex items-center justify-center">
                <figure>
                  <img width={400} src={Loader} alt="...Cargando" />
                  <figcaption className=" text-center">...Cargando</figcaption>
                </figure>
              </div>
            ) : (
              <div className="w-full max-sm:pt-8 max-sm:pl-2 max-sm:pr-2 flex flex-col justify-between p-2 lg:w-auto xl:w-auto">
                {catalog && <OPACGridFBooks colection={catalog} />}
                <div className=" flex items-center max w-full justify-center p-2 lg:w-auto xl:w-auto">
                  <Pagination
                    previousLabel="Anterior"
                    nextLabel="Siguiente"
                    currentPage={page}
                    totalPages={MaxPage}
                    onPageChange={onPageChange}
                  />
                </div>
              </div>
            )}
          </>
        </main>
      )}
    </>
  );
};

export default OPACBooks;
