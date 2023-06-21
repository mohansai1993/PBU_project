import axios from 'axios'

export const uploadImage = async (formData) => {
  let data = await axios.post('http://pballu.com:5000/upload', formData, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
  return data
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
  //   return null
  // })
}
