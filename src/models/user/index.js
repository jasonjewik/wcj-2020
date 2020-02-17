const UserModel = (table) => {
    // Q: 
    //  Is this method really necessary?
    // A: 
    //  Technically, no. You could just have your UserController
    //  access the UserTable methods directly. But, I like to do 
    //  it this way because it hides the implementation of the
    //  UserTable methods. 
    // 
    //  Why might that be useful? Well, when your front-end
    //  devs realize that they need to do a call to the back-end,
    //  they don't have to go hunting through models/user/postgres.js
    //  to find the method they need to call. Think about what that
    //  file might look like at a large company like Facebook or Google.
    //  The implementation of some methods might be hundreds of lines long!
    //  So having a interface like this that just shows what the function
    //  is, and what it requires as arguments is nice.

    // Creates a new User and returns the corresponding ID number
    const createUser = async(first_name, middle_name, last_name, user_name, email_address) => {
        return table.createUser(first_name, middle_name, last_name, user_name, email_address);
    }

    // Given an ID number, retrieve all information about the corresponding User
    const getUser = async(id) => {
        return table.getUser(id);
    }

    // Given an ID number and a number of upvotes, update the corresponding User's upvotes
    const updateUpvotes = async(id, upvotes) => {
        return table.updateUpvotes(id, upvotes);
    }

    // See how nice that was? With just a single line comment, someone who
    // only needs to use the method and not actually know how it's 
    // implemented can really quickly figure out what they need to know.

    return {
        createUser,
        getUser,
        updateUpvotes
    };
}

module.exports = {
    UserModel
}