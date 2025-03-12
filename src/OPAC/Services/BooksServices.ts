import api from "../../AxiosConfig";

const getColection = async (
    page: number,
    limit: number,
    title?: string,
    author?: string,
    year?: string,
    category?: string,
  ) => {
    try {
      const params: { [key: string]: string | number | undefined } = {
        page,
        limit,
      };
      if (title) params.Title = title;
      if (author) params.Author = author;
      if (year) params.PublishedYear = year;
      if (category) params.ShelfCategory = category;
  
      const response = await api.get("books", { params });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getBooks = async (
    page: number,
    limit: number,
    title?: string,
    author?: string,
    year?: number,
    category?: string,
  ) => {
    try {
      const params: { [key: string]: string | number | undefined } = {
        page,
        limit,
      };
  
      if (title) params.title = title;
      if (author) params.author = author;
      if (year) params.year = Number(year);
      if (category) params.category = category;
  
      const response = await api.get("/books/opac/opac-filtro", { params });
      return response.data;
    } catch (error) {
      console.error("Error al obtener los libros:", error);
      throw error;
    }
  };

  const getCategoriesNames =async()=>{
    try{
      const response = await api.get("/books/Categories");
      return response.data
    } catch(error){
      console.log(error)
      throw error
    }
  }

  export {getColection, getCategoriesNames,getBooks}