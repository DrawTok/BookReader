const Database = require("./Database");

class CategoryFavorite extends Database {
    constructor() {
        super();
    }

    async addCategoryFavorite(idUser, dataIdFavorite) {
        let connection;
        try {
            connection = await this.connect();

            const listFavCatId = dataIdFavorite.map(categoryId => [idUser, categoryId]);

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


    async getCategoryFavorite(idUser) {
        let connection;
        try {
            connection = await this.connect();

            const query = "SELECT fc.idCategory, name FROM `favourites_cat` fc inner join `categories` c on fc.idCategory = c.idCategory INNER JOIN `users` u on u.idUser = fc.idUser WHERE u.idUser = ?";
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
}

module.exports = new CategoryFavorite();