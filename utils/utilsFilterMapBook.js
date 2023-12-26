const axios = require("axios");
const linkBook = "https://gutendex.com/books/";
function filterAndMapBooks(results) {
    return results
        .map((book) => {
            const isEpub = book.formats["application/epub+zip"] !== undefined;
            const isImage = book.formats["image/jpeg"] !== undefined;

            if (isEpub && isImage) {
                return {
                    id: book.id,
                    title: book.title,
                    author: book.authors || "updating...",
                    subjects: book.subjects.map((item) => item.split(" -- ")[0]),
                    formats: {
                        image: book.formats["image/jpeg"],
                        epub: book.formats["application/epub+zip"].replace(".images", ""),
                    },
                    download_count: book.download_count
                };
            }
            return null;
        })
        .filter((item) => item !== null);
}
async function getBookDetailById(bookIds) {
    try {
        const bookIdsArray = Array.isArray(bookIds) ? bookIds : [bookIds];
        const bookIdsParam = bookIdsArray.length > 1 ? bookIdsArray.join(',') : bookIdsArray[0];
        const response = await axios.get(linkBook, {
            params: {
                ids: bookIdsParam,
            },
        });


        const jsonData = response.data;

        const fetchedData = jsonData.results.map((book) => {
            const epubFormat = book.formats["application/epub+zip"];
            const authors = book.authors || "updating...";

            return {
                ...book,
                authors,
                formats: {
                    jpegImage: book.formats["image/jpeg"],
                    plainText: epubFormat ? epubFormat.replace(".images", "") : null,
                },
            };
        });

        return fetchedData;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
}


module.exports = { getBookDetailById, filterAndMapBooks };