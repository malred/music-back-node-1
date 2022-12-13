// 返回结果类
export function OK(data, res) {
    res.send({ status: 200, data })
    return res.end()
}
export function ERR(msg, res) {
    res.send({ status: 500, msg })
    return res.end()
}
export default {
    OK, ERR
}

