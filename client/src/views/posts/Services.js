import Axios from 'axios';
import { DEV_URL } from "./Constant";

const PostServices = {
    getList(status, limit, offset) {
        return Axios.request({
            method: 'get',
            url: `${DEV_URL}/article/byStatus?status=${status}&limit=${limit}&offset=${offset}`,
        })
    },
    createData(data) {
        return Axios.request({
            method: 'post',
            url: `${DEV_URL}/article/create`,
            data,
        })
    },
    updateData(id, data) {
        return Axios.request({
            method: 'put',
            url: `${DEV_URL}/article/update?id=${id}`,
            data,
        })
    },
    getCount(status) {
        return Axios.request({
            method: 'get',
            url: `${DEV_URL}/article/getCount?status=${status}`,
        })
    },
}

export default PostServices;