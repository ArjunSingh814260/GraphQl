const { findByIdAndUpdate } = require("../DataBase/userModels");
const user = require("../DataBase/userModels");
const tokenGenrator = require("../middlware/tokenGenrator");

const resolvers = {
  Query: {
    async getAllUsers() {
      const getUser = await user.find({});
      return getUser;
    },
  },

  Mutation: {
    async addUser(_, args, context) {
      const { fName, lName, age } = args.UserInput;

      const userChecker = await user.findOne({
        fName,
      });
      console.log(userChecker);
      if (userChecker) {
        throw new Error("user already Exist");
      }
      const userCreated = new user({
        fName,
        lName,
        age,
      });
      await userCreated.save();
      const token = await tokenGenrator(userCreated._id);

      return { token };
    },

    async updateUser(_, { fName }, { id }) {
      if (!id) {
        throw new Error("You must be loggin");
      } else {
        const userUpdated = await user.findByIdAndUpdate(
          { _id: id },
          { fName },
          { newly: true }
        );
        return userUpdated;
      }
    },
    async deleteUser(_, args, { id }) {
      const userDelete = await user.findByIdAndDelete({ _id: id });
      console.log(userDelete);
      return "Your profile Successfully Deleted";
    },
  },
};

module.exports = resolvers;
