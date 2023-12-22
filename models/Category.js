const Database = require("./Database");
const axios = require("axios");
const linkBook = "https://gutendex.com/books/";
class Category extends Database {
    constructor() {
        super();
    }

    async addNewCategory(idCategory, name) {
        let connection;
        try {
            connection = await this.connect();

            const query = "INSERT INTO `categories`(idCategory, name) VALUES (?, ?)";
            const [result] = await connection.query(query, [idCategory, name]);

            if (result.affectedRows > 0) {
                return { success: true, message: "Successful" };
            } else {
                return { success: false, message: "Failed to insert category..." };
            }
        } catch (error) {
            console.error("Cannot insert category: ", error.message);
            throw error;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }

    async getUserInterestTopic(idUser) {
        try {
            const { success, result } = await this.getFavoriteCategory(idUser);

            if (success && result.length > 0) {
                const randomIndex = Math.floor(Math.random() * result.length);
                const randomCategory = result[randomIndex];

                const randomTopic = randomCategory.name;

                const response = await axios.get(`${linkBook}?${randomTopic}`);

                const jsonData = response.data;

                const fetchedData = jsonData.results.map((book) => ({
                    ...book,
                    cover: book.formats["image/jpeg"],
                }));
                return { success: true, result: fetchedData };
            } else {
                return { success: false, message: "Failed to retrieve user interests topic..." };
            }
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        }
    }

    async getCategory() {
        let connection;
        try {
            connection = await this.connect();

            const query = "SELECT * FROM `categories`";
            const [result] = await connection.query(query);

            if (result !== null) {
                const modifiedResult = result.map((categoryItem) => ({ ...categoryItem, active: false }));
                return { success: true, result: modifiedResult };
            } else {
                return { success: false, message: "Failed to insert category..." };
            }
        } catch (error) {
            console.error("Cannot insert category: ", error.message);
            throw error;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }

    async addCategoryFavorite(idUser, dataIdFavorite) {
        let connection;
        try {
            connection = await this.connect();

            const listFavCatId = dataIdFavorite.map((categoryId) => [idUser, categoryId]);

            const query = "INSERT INTO `favourites_cat`(idUser, idCategory) VALUES ?";
            const [result] = await connection.query(query, [listFavCatId]);

            if (result.affectedRows > 0) {
                return { success: true, message: "Successful" };
            } else {
                return { success: false, message: "Failed to insert favorite category..." };
            }
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }

    async getFavoriteCategory(idUser) {
        let connection;
        try {
            connection = await this.connect();

            const query =
                "SELECT fc.idCategory, name FROM `favourites_cat` fc inner join `categories` c on fc.idCategory = c.idCategory INNER JOIN `users` u on u.idUser = fc.idUser WHERE u.idUser = ?";
            const [result] = await connection.query(query, [idUser]);

            if (result.length > 0) {
                return { success: true, result };
            } else {
                return { success: false, message: "Failed to retrieve categories..." };
            }
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }

    async deleteCategoryFavorite(idUser, favCatIds) {
        let connection;
        try {
            connection = await this.connect();

            // Create an array of arrays for idUser and each favCatId
            const listFavCatId = favCatIds.map((favCatId) => [idUser, favCatId]);

            const query = "DELETE FROM `favourites_cat` WHERE (idUser, idCategory) IN (?)";
            const [result] = await connection.query(query, [listFavCatId]);

            if (result.affectedRows > 0) {
                return { success: true, message: "Deleted successfully!" };
            } else {
                return { success: false, message: "No records deleted. Check your input data." };
            }
        } catch (error) {
            console.error("Error: ", error.message);
            throw error;
        } finally {
            if (connection) {
                connection.end();
            }
        }
    }
}

module.exports = new Category();
