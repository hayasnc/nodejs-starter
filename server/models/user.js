module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: ['^[a-z]+$', 'i'],
          len: [3, 10]
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Email address already in use!'
        },
        validate: {
          notEmpty: {
            msg: 'The field cannot be empty'
          },
          isEmail: {
            args: true,
            msg: 'Invalid Email address'
          }
        }
      }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
