"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
var userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
});
var groupSchema = new mongoose_1.Schema({
    name: { type: String },
    number: { type: Number, required: true },
    user: { type: String }
});
var peliSchema = new mongoose_1.Schema({
    name: { type: String },
    category: { type: String },
    actor: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' }
});
// 3. Create a Model.
var User = mongoose_1.default.model('User', userSchema);
var Group = mongoose_1.default.model('Group', groupSchema);
var Peli = mongoose_1.default.model('Peli', peliSchema);
run().catch(function (err) { return console.log(err); });
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var allUsers, groupId, groupById, projection, peliById, usersgroupWithNameEA, userToUpdate, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // 4. Connect to MongoDB
                return [4 /*yield*/, (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/test')];
                case 1:
                    // 4. Connect to MongoDB
                    _a.sent();
                    return [4 /*yield*/, User.find()];
                case 2:
                    allUsers = _a.sent();
                    groupId = '650eb7f3f00b83cbc8318b4b';
                    return [4 /*yield*/, Group.findById(groupId)];
                case 3:
                    groupById = _a.sent();
                    projection = {
                        name: 1,
                        email: 1
                    };
                    return [4 /*yield*/, Peli.findById('650ece4e31d6a1da8f6f32be', projection)
                            .populate('actor')];
                case 4:
                    peliById = _a.sent();
                    console.log(peliById);
                    return [4 /*yield*/, Group.find({ name: 'EA' })];
                case 5:
                    usersgroupWithNameEA = _a.sent();
                    return [4 /*yield*/, Group.findById('650eb897650181037d01c3f3')];
                case 6:
                    userToUpdate = _a.sent();
                    if (!userToUpdate) return [3 /*break*/, 8];
                    userToUpdate.user = 'Pepito';
                    return [4 /*yield*/, userToUpdate.save()];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [4 /*yield*/, Group.deleteOne({ _id: '650eb9df0645af9c1222a053' })];
                case 9:
                    result = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
