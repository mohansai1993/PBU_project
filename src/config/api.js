import axios from 'axios'

export const uploadImage = async (formData) => {
  return axios.post('http://192.168.1.49:5000/upload', formData, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
  // .then((res) => {
  //   if (res.data.status) {
  //     return res.data
  //   } else {
  //     console.log(res.data.error)
  //     return res.data
  //   }
  // })
  // .catch((err) => {
  //   console.log(err)
  // })
}
