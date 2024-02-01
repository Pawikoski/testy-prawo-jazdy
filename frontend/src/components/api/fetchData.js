import promiseWrapper from "./promiseWrapper";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function useFetchQuestions(url, page, categories, searchPhrase) {
  const [resource, setResource] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  

  useEffect(() => {
    const params = {
      page: page,
      language: 'pl'
    }
    const queryParams = {
      strona: page,
    }
    if (searchPhrase) {
      setSearchParams({ ...searchParams, ...queryParams, q: searchPhrase })
      params.q = searchPhrase;
    }
    if (categories && categories.length > 0) {
      params.categories = categories.join(',');
    }
    const getData = async () => {
      const promise = axios.get(url, {params: params}).then((response) => response.data);
      setResource(promiseWrapper(promise));
    };

    getData();
  }, [url, page, categories, searchPhrase]);

  return resource;
}

export default useFetchQuestions;