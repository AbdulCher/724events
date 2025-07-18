import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const getData = useCallback(async () => {
    try {
      const result = await api.loadData();
      setData(result);
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (!data) {
    getData();
    }
  }, [data, getData]); // Ajout de dependance eviter appel infini
  
  // 🔥 ici on récupère le dernier élément
  const last = data?.[data.length - 1];
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
