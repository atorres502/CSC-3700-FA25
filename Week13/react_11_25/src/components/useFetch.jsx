import { useEffect, useState } from "react";

const useFetch = (URL, { initialData = null } = {}) => {
    const [data, setData] = useState(initialData);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);

        if (!URL) {
            setIsPending(false);
            return;
        }

        setIsPending(true);
        const abortCont = new AbortController();

        fetch(URL, { signal: abortCont.signal })
            .then((res) => {
                if (!res.ok) throw Error(`Could not get data for URL: ${URL}`);
                return res.json();
            })
            .then((json) => {
                setData(json);
                setIsPending(false);
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    setError(err.message);
                    setIsPending(false);
                }
            });
        return () => abortCont.abort();
    }, [URL]);
    return { data, isPending, error };
};

export default useFetch;
