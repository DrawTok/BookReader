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
                        epub: book.formats["application/epub+zip"],
                    },
                    download_count: book.download_count
                };
            }
            return null;
        })
        .filter((item) => item !== null);
}

module.exports = { filterAndMapBooks };