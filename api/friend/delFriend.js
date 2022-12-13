import db from "../../utils/db"
import R from '../../utils/res'
// 根据uid和mid从我喜欢的音乐里移除
export async function delFriendByUidAndFid(uid, fid, res) {
    try {
        db.query(
            `delete
                from music.friends
                where uid = '${uid}'
                and fid = '${fid}'`
        )
    } catch {
        return R.ERR('删除失败', res)
    }
}
// 删除好友
export default async function delFriend(req, res) {
    if (!req || !req.query) {
        return R.ERR('请求参数错误', res)
    }
    try {
        // query是因为我前端把参数放url里了
        const { uid, fid } = req.query
        if (undefined !== uid && undefined !== fid) {
            await delFriendByUidAndFid(uid, fid, res)
            return R.OK('删除成功', res)
        }
        return res.end()
    } catch {
        return R.ERR('删除失败', res)
    }
}
