const { AuthenticationError } = require("apollo-server-express");
const { User, Story } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("stories");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("stories");
    },
    stories: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Story.find(params).sort({ createdAt: -1 });
    },
    story: async (parent, { storyId }) => {
      return Story.findOne({ _id: storyId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("stories");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // server side validation
      if (!username) {
        throw new Error("Username is required!");
      }
      if (!email) {
        throw new Error("Email is required!");
      }
      if (!email.match(/.+@.+\..+/)) {
        throw new Error("Valid email is required");
      }
      if (!password) {
        throw new Error("Password is required!");
      }
      if (password.length < 5) {
        throw new Error("Password must be at least 5 characters long!");
      }

      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      // server side validation
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addStory: async (parent, { storyTitle, storyIntro, myStory }, context) => {
      // server side validation
      if (!storyTitle || !storyIntro || !myStory) {
        throw new Error("Have you completed title, introduction and story?");
      }

      if (context.user) {
        const story = await Story.create({
          storyTitle,
          storyIntro,
          myStory,
          storyAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { stories: story._id } }
        );

        return story;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { storyId, commentText }, context) => {
      if (context.user) {
        return Story.findOneAndUpdate(
          { _id: storyId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeStory: async (parent, { storyId }, context) => {
      if (context.user) {
        const story = await Story.findOneAndDelete({
          _id: storyId,
          storyAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { stories: story._id } }
        );

        return story;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { storyId, commentId }, context) => {
      if (context.user) {
        return Story.findOneAndUpdate(
          { _id: storyId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
