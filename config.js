module.exports={
    api:{
        port:process.env.PORT || 3001,
    },
    jwt:{
        // secret:process.env.JWT_SECRET || 'notasecret',
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql:{
        host:process.env.MYSQL_HOST || `bxd7wcqz7tk2gcmyu0us-mysql.services.clever-cloud.com`,
        user:process.env.MYSQL_USER || `uinjvf25mb80bngy`,
        password:process.env.MYSQL_PASS || `8ECNrCwQWxJ6fNKizZgB`,
        database:process.env.MYSQL_DB || `bxd7wcqz7tk2gcmyu0us`,
    }
}
