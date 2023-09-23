import mongoose, { Schema, model, connect, Document } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

interface IGroup {
  name: string;
  number: number;
  user: string;
}

interface IPeli {
  name: string;
  category: string;
  actor: IUser;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});

const groupSchema = new Schema<IGroup>({
  name: { type: String },
  number: { type: Number, required: true },
  user: { type: String },
});

const peliSchema = new Schema<IPeli>({
  name: { type: String },
  category: { type: String },
  actor: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

// 3. Create a Model.
const User = mongoose.model<IUser>("User", userSchema);
const Group = mongoose.model<IGroup>("Group", groupSchema);
const Peli = mongoose.model<IPeli>("Peli", peliSchema);

run().catch((err) => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect("mongodb://127.0.0.1:27017/test");

  // CREATE
  const user = new User({
    name: 'Jose',
    email: 'Jose@gmail.com',
    avatar: 'aaaaaaaaaaaa'
  });
  await user.save();

  const group = new Group({
    name: 'EA',
    number: 2,
    user: 'Roc'
  });
  await group.save();

  const peli = new Peli({
    name: 'Cars',
    category: 'action Kachaw',
    actor: '650ece139a5ef2c5c1f787fa'
  });
  await peli.save();

  // READ
  // Obtener todos los usuarios
  const allUsers = await User.find();
  //console.log(allUsers);

  // Obtener un usuario por su ID
  const groupId = "650eb7f3f00b83cbc8318b4b";
  const groupById = await Group.findById(groupId);
  //console.log(groupById);

  const peliById = await Peli.findById(
    "650ece4e31d6a1da8f6f32be"
  ).populate("actor");
  console.log(peliById);

  // Obtener usuarios con un filtro (por ejemplo, por nombre)
  const usersgroupWithNameEA = await Group.find({ name: "EA" });
  //console.log(usersgroupWithNameEA);

  // UPDATE
  // Buscar el usuario por su ID
  const userToUpdate = await Group.findById("650eb897650181037d01c3f3");

  // Actualizar el nombre del usuario
  if (userToUpdate) {
    userToUpdate.user = "Pepito";
    await userToUpdate.save();
  }
  //console.log(userToUpdate);
  
  // DELETE
  const result = await Group.deleteOne({ _id: "650eb9df0645af9c1222a053" });

  // console.log(user.email); // 'bill@initech.com'
  // console.log(group.number);
}
