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

  const getCategoriesNames =async()=>{
    try{
      const response = await api.get("/books/Categories");
      return response.data
    } catch(error){
      console.log(error)
      throw error
    }
  }

  export {getColection, getCategoriesNames}