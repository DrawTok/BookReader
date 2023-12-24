const axios = require("axios");
const linkBook = "https://gutendex.com/books/";
const Database = require("./Database");
const { filterAndMapBooks } = require('../utils/utilsFilterMapBook');
class Book extends Database {
    async fetchData(category, quantity) {
        try {
            let currentPage = 1;
            let fetchedData = [];

            do {
                const response = await axios.get(linkBook, {
                    params: {
                        page: currentPage,
                        topic: category,
                    },
                });

                const jsonData = response.data;

                fetchedData = fetchedData.concat(
                    jsonData.results.map((book) => ({
                        id: book.id,
                        title: book.title,
                        format: {
                            jpegImage: book.formats["image/jpeg"],
                        },
                    }))
                );

                if (quantity !== -1) {
                    if (fetchedData.length >= quantity) {
                        fetchedData = fetchedData.slice(0, quantity);
                        break;
                    }
                }

                if (jsonData.next) {
                    currentPage++;
                } else {
                    break;
                }
            } while (true);

            const extractedData = {
                count: fetchedData.length,
                results: fetchedData,
            };

            return extractedData;
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    async getBookDetailById(bookId) {
        try {
            const response = await axios.get(linkBook, {
                params: {
                    ids: bookId,
                },
            });

            const jsonData = response.data;

            const fetchedData = jsonData.results.map((book) => ({
                ...book,
                formats: {
                    jpegImage: book.formats["image/jpeg"],
                    plainText: book.formats["application/epub+zip"].replace(".images", ""),
                },
            }));

            return fetchedData;
        } catch (error) {
            console.error("Error fetching data:", error.message);
            throw error;
        }
    }

    async saveReading(idUser, idBook, lastPageReading) {
        const success = {
            success: true,
            message: "Successful.",
        };

        const fail = {
            success: false,
            message: "An error occurred.",
        };

        try {
            const connection = await this.connect();

            const queryReadUID = "SELECT * FROM `reading` WHERE idUser = ? AND idBook = ?";
            const [resultReadUID] = await connection.query(queryReadUID, [idUser, idBook]);

            if (!resultReadUID) {
                const query = "INSERT INTO `reading`(idUser, idBook, lastPageReading) VALUES (?, ?, ?)";
                const [results] = await connection.query(query, [idUser, idBook, lastPageReading]);
                return results.affectedRows > 0 ? success : fail;
            } else if (resultReadUID) {
                const query = "UPDATE `reading` SET lastPageReading = ? WHERE idUser = ? AND idBook = ?";
                const [results] = await connection.query(query, [lastPageReading, idUser, idBook]);
                return results.affectedRows > 0 ? success : fail;
            } else {
                console.log("EXISTS...");
            }
        } catch (error) {
            console.error("Error:", error.message);
            return {
                success: false,
                message: "An error occurred during save reading.",
            };
        }
    }

    async search(bookName, topic) {
        try {
            const params = topic === "all" ? `search=${bookName}` : `search=${bookName}&topic=${topic}`;
            const response = await axios.get(`${linkBook}?${params}`);

            const jsonData = response.data;

            const fetchedData = filterAndMapBooks(jsonData.results);

            return fetchedData;
        } catch (error) {
            console.error("Error during API request:", error.message);
            throw error;
        }
    }
}

module.exports = new Book();
