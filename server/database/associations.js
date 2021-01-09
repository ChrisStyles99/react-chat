const User = require('./models/User');
const Message = require('./models/Message');
const Chat = require('./models/Chat');
const ChatUser = require('./models/ChatUser');

User.hasMany(Message, {foreignKey: 'user_id'});
Message.belongsTo(User, {foreignKey: 'user_id'});

User.belongsToMany(Chat, {through: ChatUser, timestamps: false});
Chat.belongsToMany(User, {through: ChatUser, timestamps: false});

Chat.hasMany(Message, {foreignKey: 'chat_id'});
Message.belongsTo(Chat, {foreignKey: 'chat_id'});