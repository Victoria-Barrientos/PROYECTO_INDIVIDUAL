const { Videogame } = require('../db');

const deleteVideoGame = async (id) => {
    const uuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    try {
        if(typeof Number.isInteger(id) && id > 0) {
            throw new Error ("That videogame cant be deleted.")
        };
        if (typeof id === 'string' && uuidRegex.test(id)) {
            await Videogame.destroy({ where: { id: id } });
        } else {
            throw new Error("Invalid ID");
        }
    } catch(error) {
        throw new Error("An error occurred while deleting the resource.");
    }
}

module.exports = deleteVideoGame