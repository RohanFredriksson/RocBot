const fs = require('fs');

module.exports = {

    getUser(id) {

        const userFiles = fs.readdirSync('./data').filter(file => file.endsWith('.json'));
        for (const file of userFiles) {
            
            if (file == id + '.json') {
    
                try {
                    userData = JSON.parse(fs.readFileSync('./data/' + file, 'utf8'));
                    return userData;
                }
                
                catch (err) {
                    console.log(err);
                    continue;
                }
    
            }
            
        }
    
        fs.copyFileSync('./data/default.json','./data/' + id + '.json');
        userData = JSON.parse(fs.readFileSync('./data/' + id + '.json', 'utf8'));
        return userData;
    
    },

    updateUser(id, json) {
        fs.writeFileSync('./data/' + id + '.json', JSON.stringify(json));
    }

}