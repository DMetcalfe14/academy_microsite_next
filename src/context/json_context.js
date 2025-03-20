import { createContext, useContext, useState, useEffect } from 'react';

const JsonContext = createContext();

export const JsonProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJsonFiles = async () => {
      try {
        const files = [
          'articles.json',
          'courses.json',
          'discover.json',
          'featured.json',
          'links.json',
          'slides.json'
        ];

        const fetches = files.map(file =>
          fetch(`${file}`)
            .then(res => {
              if (!res.ok) {
                throw new Error(`Failed to fetch ${file}`);
              }
              return res.json();
            })
            .catch(err => {
              console.error(`Error fetching ${file}:`, err);
              throw err;
            })
        );

        const results = await Promise.all(fetches);

        const mergedData = files.reduce((acc, file, index) => {
          const key = file.replace('.json', '');
          acc[key] = results[index];
          return acc;
        }, {});

        setData(mergedData);
      } catch (err) {
        setError(err); // Set error if there is an issue with fetching
        console.error('Error fetching JSON files:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJsonFiles();
  }, []);

  return (
    <JsonContext.Provider value={{ data, isLoading, error }}>
      {children}
    </JsonContext.Provider>
  );
};

export const useJsonData = () => useContext(JsonContext);