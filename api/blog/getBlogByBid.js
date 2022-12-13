import db from "../../utils/db";
import R from '../../utils/res'
import { toBlog } from "./getUserBlogs";
/** 从数据库查询文章(根据bid) */
export async function getOneBlogByBid(bid, res) {
    try {
        return db.query(`
            select *
                from music.blogs
                where id = '${bid}'`)
    }
    catch {
        return R.ERR("获取失败", res)
    }
}
/** 根据uid获取用户信息 */
export async function getUserInfoById(uid) {
    try {
        return db.query(`
            select *
                from music.muser_info
                where id = '${uid}'`)
    }
    catch {
        return R.ERR("获取失败", res)
    }
}
/**
 * 把数据库查出的字段封装为userinfo对象
 * 传入数据row[0][i]
 */
export async function toUserInfo(row) {
    if (row !== undefined) {
        return {
            id: row[0],
            name: row[1],
            age: row[2],
            birth: row[3],
            createday: row[4],
            location: row[5],
            img: row[6],
            sex: row[7]
        }
    }
}
/** 根据bid获取文章 */
export default async function getBlogByBid(req, res) {
    if (!req || !req.query) {
        return R.ERR("请求参数错误", res)
    }
    const { bid } = req.query
    try {
        if (bid !== null && bid !== undefined && bid !== '') {
            // 返回的数据
            let obj = {}
            // 获取文章信息
            let rows = await getOneBlogByBid(bid, res)
            if (rows[0].length > 0 && rows[0] !== undefined) {
                let blog = await toBlog(rows[0][0])
                if (blog !== null && blog !== undefined) {
                    // 返回的数据添加文章信息
                    obj.bloginfo = blog
                    // 根据文章的作者id获取作者信息
                    let rows2 = await getUserInfoById(blog.uid)
                    if (rows2[0].length > 0 && rows2[0] !== undefined) {
                        // 返回的数据添加作者信息
                        obj.authorinfo = await toUserInfo(rows2[0][0])
                    }
                }
            }
            return R.OK(obj, res)
        }
        return R.ERR('获取失败', res)
    }
    catch {
        return R.ERR("获取失败", res)
    }
}