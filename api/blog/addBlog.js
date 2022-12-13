import db from "../../utils/db";
import R from '../../utils/res'
// 向数据库添加文章
export async function insertBlog(blog, res) {
    try {
        db.query(`
            insert into music.blogs (uid, content, title, cover, createday)
            values ('${blog.uid}',' ${blog.content}', '${blog.title}', '${blog.cover}',
                    DATE_FORMAT(now(), '%Y-%m-%d'));
        `)
    } catch {
        return R.ERR('添加文章失败',res)
    }
}
// 添加文章
export default async function addBlog(req, res) {
    if (!req || !req.body) {
        return R.ERR('请求参数错误', res)
    }
    const { uid, title, content, cover } = req.body
    let blog = {
        uid, title, content, cover
    }
    try {
        await insertBlog(blog, res)
        return R.OK('添加成功', res)
    } catch {
        return R.ERR('添加失败', res)
    }
}
