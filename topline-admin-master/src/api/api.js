import request from '@/utils/request'

// 请求所有数据
export function getList () {
  return request({
    method: 'get',
    url: '/get'
  })
}
// 根据code选择，要请求的数据
export function getCode (postCode) {
  return request({
    method: 'post',
    url: '/postCode',
    data: postCode
  })
}
// 发送表单数据
export function postData (formData) {
  return request({
    method: 'post',
    url: '/post',
    data: formData
  })
}
// 根据id删除某一项
export function deleteId (id) {
  return request({
    method: 'post',
    url: '/delete',
    data: id
  })
}
