const Database = require("./Database");

class Category extends Database {
    constructor() {
        super();
    }

    async createFavoriteCategory() {
        let connection;
        try {
            connection = await this.connect();

            const query = "INSERT INTO `favourites_cat` "

        } catch (error) {

        }
    }
}

