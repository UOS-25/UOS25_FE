import axios from 'axios';

export const fetchData = async (apiUrl: string) => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

/*
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData(apiUrl);
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [apiUrl]);
  */
