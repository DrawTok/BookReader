const axios = require("axios");
const linkBook = "https://gutendex.com/books/";
const Database = require("./Database");
const { getBookDetailById, filterAndMapBooks } = require('../utils/utilsFilterMapBook');


const success = {
    success: true,
    message: "Successful.",
};

const fail = {
    success: false,
    message: "An error occurred.",
};
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
                        download_count: book.download_count
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
            const fetchedData = getBookDetailById(bookId);
            return fetchedData;
        } catch (error) {
            console.error("Error fetching data:", error.message);
            throw error;
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

    async updateStatus(idUser, idBook, status) {
        try {
            const connection = await this.connect();
            const queryUpdateStatus = "UPDATE `libraries` SET status = ? WHERE idUser = ? AND idBook = ?";
            const [results] = await connection.query(queryUpdateStatus, [status, idUser, idBook]);
            return results.affectedRows > 0 ? success : fail;
        } catch (error) {
            console.error("Error:", error.message);
            return {
                success: false,
                message: "An error occurred during save reading.",
            };
        }
    }

}

module.exports = new Book();
