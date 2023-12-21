const axios = require('axios');
const linkBook = "https://gutendex.com/books/";
const Database = require("./Database");

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
                    }
                });

                const jsonData = response.data;

                fetchedData = fetchedData.concat(jsonData.results.map(book => ({
                    id: book.id,
                    title: book.title,
                    format: {
                        jpegImage: book.formats["image/jpeg"],
                    }
                })));

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
            console.error('Error fetching data:', error.message);
        }
    }

    async getDataCategoryId(categoryId) {
        try {
            const response = await axios.get(linkBook, {
                params: {
                    ids: categoryId,
                },
            });

            const jsonData = response.data;

            const fetchedData = jsonData.results.map(book => ({
                id: book.id,
                title: book.title,
                author: book.authors.map(author => ({
                    name: author.name,
                    birth_year: author.birth_year,
                    death_year: author.death_year,
                })),
                subject: book.subjects,
                format: {
                    jpegImage: book.formats["image/jpeg"],
                    plainText: book.formats["application/epub+zip"].replace(".images", ''),
                },
            }));

            return fetchedData;

        } catch (error) {
            console.error('Error fetching data:', error.message);
            throw error;
        }
    }

    async saveReading(idUser, idBook, lastPageReading) {
        try {
            const connection = await this.connect();

            const queryReadUID = "SELECT * FROM `reading` WHERE idUser = ?";
            const [resultReadUID] = await connection.query(queryReadUID, [idUser]);

            const UID = resultReadUID[0]?.idUser;
            const BID = resultReadUID[0]?.idBook;
            const lastPR = resultReadUID[0]?.lastPageReading;
            if (UID !== idUser && BID !== idBook && lastPR !== lastPageReading) {

                const query = "INSERT INTO `reading`(idUser, idBook, lastPageReading) VALUES (?, ?, ?)";
                const [results] = await connection.query(query, [idUser, idBook, lastPageReading]);
                if (results.affectedRows > 0) {
                    return {
                        success: true,
                        message: "Successful."
                    };
                } else {
                    return {
                        success: false,
                        message: "An error occurred."
                    };
                }


            } else if (UID === idUser && BID === idBook) {
                const query = "UPDATE `reading` SET lastPageReading = ? WHERE idUser = ? AND idBook = ?";
                const [results] = await connection.query(query,
                    [lastPageReading, UID, BID]);
                if (results.affectedRows > 0) {
                    return {
                        success: true,
                        message: "Successful."
                    };
                } else {
                    return {
                        success: false,
                        message: "An error occurred."
                    };
                }
            } else
                console.log("EXISTS...");
        } catch (error) {
            console.error("Error:", error.message);
            return {
                success: false,
                message: "An error occurred during save reading.",
            };
        }
    }

    async searchByNameAndCategory(nameBook, topic) {

        try {
            const response = await axios.get(`${linkBook}?search=${nameBook}&topic=${topic}`);

            const jsonData = response.data;

            const fetchedData = jsonData.results.map(book => ({
                id: book.id,
                title: book.title,
                author: book.authors.map(author => ({
                    name: author.name,
                    birth_year: author.birth_year,
                    death_year: author.death_year,
                })),
                subject: book.subjects,
                format: {
                    jpegImage: book.formats["image/jpeg"]
                },
            }));

            return fetchedData;

        } catch (error) {
            console.error('Error during API request:', error.message);
            throw error;
        }
    }

}


module.exports = new Book();
