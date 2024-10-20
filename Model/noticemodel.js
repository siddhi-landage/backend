import mongoose from "mongoose"

const NoticeSchema = new mongoose.Schema({
    subject:{type:String , required :true},
    Date :{type:Date , required :true },
    pdf :{type:String , required :true},
})

const noticemodel = mongoose.model.notice|| mongoose.model("notice" , NoticeSchema)
export default noticemodel