// import db from "../../utils/db";
const db = require('../../utils/db')
// import R from '../../utils/res'
const R = require('../../utils/res')
/** 向数据库删除文章(根据bid) */
export function delBlogByBid(bid, res) {
    if (!bid) {
        return
    }
    try {
        db.query(`
            delete from music.blogs
            where id='${bid}'
        `)
    } catch {
        return R.ERR('删除失败', res)
    }
}
/** 删除文章 */
export default async function uptBlog(req, res) {
    if (!req || !req.query) {
        return R.ERR('请求参数错误', res)
    }
    const { bid } = req.query
    try {
        await delBlogByBid(bid, res)
        return R.OK('删除成功', res)
    } catch {
        return R.ERR('删除失败', res)
    }
}