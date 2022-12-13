// import db from "../../utils/db";
const db = require('../../utils/db')
// import R from '../../utils/res'
const R = require('../../utils/res')
/** 向数据库更新文章 */
export async function updateBlog(blog) {
    try {
        db.query(`update music.blogs 
        set content = '${blog.content}',
            title= '${blog.title}',
            cover= '${blog.cover}'
        where id = '${blog.id}'`)
    } catch {
        return R.ERR('修改失败', res)
    }
}
/** 修改文章 */
export default async function uptBlog(req, res) {
    if (!req || !req.body) {
        return R.ERR('请求参数错误', res)
    }
    const { id, uid, title, content, cover } = req.body
    let blog = { id, uid, title, content, cover }
    try {
        await updateBlog(blog)
        return R.OK('修改成功', res)
    } catch {
        return R.ERR('修改失败', res)
    }
}