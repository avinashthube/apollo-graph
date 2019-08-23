import uuidv4 from "uuid/v4";

//const me = data[1];
const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      //console.log(me);
      return me;
    },

    user: (parent, { id }, { model }) => {
      return model.data[id];
    },

    users: (parent, args, { model }) => {
      return Object.values(model.data);
    },

    messages: (parent, args, { model }) => {
      return Object.values(model.messages);
    },

    message: (parent, { id }, { model }) => {
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
    createMessage: (parent, { text }, { me, model }) => {
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
    deleteMessage: (parent, { id }, { model }) => {
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
    user: (message, args, { model }) => {
      return model.data[message.userId];
    }
  },

  User: {
    messages: (user, args, { model }) => {
      return Object.values(model.messages).filter(
        message => message.userId === user.id
      );
    }
  }
};
export { resolvers };
