import model from "./model";
import uuidv4 from "uuid/v4";

//const me = data[1];
const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      //console.log(me);
      return me;
    },

    user: (parent, { id }) => {
      return model.data[id];
    },

    users: () => {
      return Object.values(model.data);
    },

    messages: () => {
      return Object.values(model.messages);
    },

    message: (parent, { id }) => {
      return model.messages[id];
    }
  },
  // These are called default resolvers, because they work without explicit definitions
  //   User: {
  //     username: user => `${me.username} ${me.id}`
  //   }

  //   Message: {
  //     user: (parent, args, { me }) => {
  //       return me;
  //     }
  //   }

  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id
      };
      model.messages[id] = message;
      model.data[me.id].messageIds.push(id);
      return message;
    },
    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...otherMessages } = model.messages;
      console.log("t1: ", message);
      if (!message) {
        return false;
      }

      console.log("object");
      return true;
    }
  },

  Message: {
    user: message => {
      return model.data[message.userId];
    }
  },

  User: {
    messages: user => {
      return Object.values(model.messages).filter(
        message => model.message.userId === user.id
      );
    }
  }
};
export { resolvers };
