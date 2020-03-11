const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  },
  roles: String
});

userSchema.methods.addItemToCart = async function(itemId) {
  const userId = this._id;
  await this.model('User')
    .updateOne(
      { _id: ObjectId(this._id), 'cart.items.productId': itemId },
      {
        $inc: {
          'cart.items.$.quantity': 1
        }
      }
    )
    .then(async result => {
      if (result.n == 0) {
        await this.model('User').updateOne(
          { _id: ObjectId(userId) },
          {
            $push: {
              'cart.items': { productId: ObjectId(itemId), quantity: 1 }
            }
          }
        );
      }
    });
};

userSchema.methods.deleteItemFromCart = async function(itemId) {
  const userId = this._id;
  await this.model('User')
    .updateOne(
      { _id: ObjectId(this._id), 'cart.items.productId': itemId },
      {
        $inc: {
          'cart.items.$.quantity': -1
        }
      }
    )
    .then(console.log);
};

module.exports = mongoose.model('User', userSchema);
