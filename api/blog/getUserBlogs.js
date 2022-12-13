import db from "../../utils/db";
import R from '../../utils/res';
/** 从数据库获取文章 */ 
export async function getBlogsByUid(uid, res) {
    try {
        return db.query(`
            select *
            from music.blogs
            where uid = '${uid}'`)
    } catch {
        return R.ERR("获取失败", res)
    }
}
/** 
 * 封装blog对象的方法
 * 传入rows[0][i],依次获取元素,封装为对象
    */
export async function toBlog(row) {
    if (row !== undefined || row !== null) {
        return {
            id: row[0],
            uid: row[1],
            content: row[2],
            title: row[3],
            cover: row[4],
            createday: row[5]
        }
    }
}
/** 获取文章 */ 
export default async function getUserBlogs(req, res) {
    if (!req || !req.query) {
        return R.ERR("请求参数错误", res)
    }
    // 获取用户id
    const { uid } = req.query
    try {
        console.log(uid);
        if (uid !== undefined && uid !== null && uid !== '') {
            let rows = await getBlogsByUid(uid)
            let arr = []// 返回的数组 
            // console.log(res[0].length > 0);
            // console.log(res[0] !== undefined);
            if (rows[0].length > 0 && rows[0] !== undefined) {
                for (let i = 0; i < rows[0].length; i++) {
                    // 封装为对象 
                    arr.push(await toBlog(rows[0][i]))
                }
            }
            return R.OK(arr, res)
        }
        return R.ERR("获取失败", res)
    } catch { 
        return R.ERR("获取失败", res)
    }
}
