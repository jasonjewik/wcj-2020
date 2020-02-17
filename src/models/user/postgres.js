const UserTable = (postgres) => {

    const SQL_createUserTable = `
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            first_name TEXT NOT NULL,
            middle_name TEXT,
            last_name TEXT NOT NULL,
            user_name TEXT NOT NULL,
            email_address TEXT NOT NULL,
            upvotes INT DEFAULT 0,
            created_at TIMESTAMPTZ DEFAULT NOW()
        )
    `;

    const setupTable = async() => {
        try {
            const client = await postgres.connect(); // Connect to our database
            await client.query(SQL_createUserTable); // Run the query on the database
            client.release(); // Remove the connection
            console.log('User table created!');
        }
        catch (err) { // Just in case we run into an error, our backend has to return something
            console.log(err);
        }
    }

    const SQL_createUser = `
        INSERT INTO users(first_name, middle_name, last_name, user_name, email_address)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
    `;
    // VALUES (...) means that we're going to pass in arguments to substitute for the variables in users(...)
    // RETURNING id means that this query will return the id of the user it created

    const createUser = async(first_name, middle_name, last_name, user_name, email_address) => {
        const values = [first_name, middle_name, last_name, user_name, email_address];
        try {
            const client = await postgres.connect();

            // Similar to the client.query method call above, just this time, we're passing
            // values in, which the client will use to substitute first_name, middle_name, ...
            const res = await client.query(SQL_createUser, values);
            client.release();
            return res.rows[0]; // Get our results back - try printing res to console to see the full return!
        }
        catch (err) {
            console.log(err);
            return null;
        }
    };

    const SQL_getUserByID = `
        SELECT * FROM users WHERE id = $1
    `;

    const getUser = async(id) => {
        const values = [id];
        try {
            const client = await postgres.connect();
            const res = await client.query(SQL_getUserByID, values);
            client.release();
            return res.rows[0];
        }
        catch (err) {
            console.log(err);
            return null;
        }
    };

    const SQL_updateUpvotes = `
        UPDATE users
        SET upvotes = $2
        WHERE id = $1
        RETURNING *;
    `;

    const updateUpvotes = async(id, upvotes) => {
        const values = [id, upvotes];
        try {
            const client = await postgres.connect();
            const res = await client.query(SQL_updateUpvotes, values);
            client.release();
            return res.rows[0];
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }

    return {
        setupTable, 
        createUser,
        getUser,
        updateUpvotes
    };
}

module.exports = {
    UserTable
}