import mongoose from "mongoose"

const NoticeSchema = new mongoose.Schema({
    subject:{type:String , required :true},
    Date :{type:Date , required :true },
    image :{type:String , required :true},
})

const noticemodel = mongoose.models.notice|| mongoose.model("notice" , NoticeSchema)
export default noticemodel